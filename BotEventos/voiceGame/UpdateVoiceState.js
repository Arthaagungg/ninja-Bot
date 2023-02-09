const client = require("../../index");
const { dc, ChannelType, GuildVoice, Collection, PermissionFlagsBits, VoiceChannel } = require('discord.js');
const { connect } = require('mongoose');
const schemaVoiceGame = require("../../Structures/Schemas/voice-game");
const schemaVoiceChannel = require("../../Structures/Schemas/voice-channel");
const schemaInfoVoice = require("../../Structures/Schemas/InfoVoice");
const app = require("../../app.json");
let voiceManager = new Collection();

client.on(`voiceStateUpdate`, async (oldState, newState) => {
    const { member, guild } = oldState;
    const newChannel = newState.channel;
    const oldChannel = oldState.channel;
    let AutoNameChannel = newState.member.nickname;
    if (!AutoNameChannel) {
        AutoNameChannel = member.user.username;
    }
    const { ViewChannel, SendMessages, Speak, ReadMessageHistory, Connect, ManageChannels } = PermissionFlagsBits;
    let GetVoiceGame = await schemaVoiceGame.findOne({ GuildId: guild.id })
    let GetVoiceChannel = await schemaVoiceChannel.findOne({ GuildId: guild.id })
    if (newChannel) {
        if (!GetVoiceGame || !GetVoiceChannel) return;
        if (GetVoiceGame) {
            const JointoCreateGame = GetVoiceGame.CreateVoice;
            const ParentGame = GetVoiceGame.Parent;
            if (oldChannel !== newChannel && newChannel && newChannel.id !== JointoCreateGame && newChannel.parent.id === ParentGame) {
                voiceManager.set(member.id, newChannel.id);
                newChannel.permissionOverwrites.edit(member.id, { ReadMessageHistory: true, SendMessages: true });
            }
        }
        if (GetVoiceChannel) {
            const JointoCreateChannel = GetVoiceChannel.CreateVoice;
            const ParentChannel = GetVoiceChannel.Parent;
            if (oldChannel !== newChannel && newChannel && newChannel.id !== JointoCreateChannel && newChannel.parent.id === ParentChannel) {

                voiceManager.set(member.id, newChannel.id);
                newChannel.permissionOverwrites.edit(member.id, { ReadMessageHistory: true, SendMessages: true });
            } else if (oldChannel !== newChannel && newChannel && newChannel.id === JointoCreateChannel) {
                const voiceChannel = await guild.channels.create({
                    name: `ℵ┊${AutoNameChannel} Vc`,
                    type: ChannelType.GuildVoice,
                    parent: newChannel.parent,
                    permissionOverwrites: [
                        {
                            id: guild.id, //everyone
                            deny: [ViewChannel]
                        },
                        {
                            id: guild.roles.cache.get(app.role.role_default), //Default roleID
                            allow: [ViewChannel, Connect, Speak,],
                            deny: [ReadMessageHistory, SendMessages]
                        },
                        {
                            id: client.user.id, //Bot ID
                            allow: [ManageChannels],
                        }
                    ],
                });
                voiceManager.set(member.id, voiceChannel.id);
                member.voice.setChannel(voiceChannel.id)
                schemaInfoVoice.findOne({ ChannelId: voiceChannel.id }, async (err, data) => {
                    if (!data) {
                        const newVerif = await schemaInfoVoice.create({
                            GuildId: guild.id,
                            ChannelId: voiceChannel.id,
                            OwnerID: member.id,
                        });
                    } else {
                        const NewVoiceChannel = await schemaInfoVoice.findOneAndUpdate({
                            GuildId: guild.id,
                            ChannelId: voiceChannel.id,
                            OwnerID: member.id,
                        });
                    }
                })
            }
        }
    }

    // left voice
    const jointocreate = voiceManager.get(member.id);
    if (!oldChannel) return;
    if (jointocreate && oldChannel.id === jointocreate && (!newChannel || newChannel.id !== jointocreate)) {
        const members = oldChannel?.members
            .filter((m) => !m.user.bot)
            .map((m) => m.id)
        if (
            jointocreate &&
            oldChannel.id === jointocreate &&
            (!newChannel || newChannel.id !== jointocreate)
        ) {
            if (members.length !== 0) {
                oldChannel.permissionOverwrites.edit(member.id, { ReadMessageHistory: false, SendMessages: false });
                if (oldChannel.parent.id === GetVoiceChannel.Parent) {
                    let getInfoVoice = await schemaInfoVoice.findOne({ ChannelId: oldChannel.id })
                    if (getInfoVoice.OwnerID === member.id) {
                        let randomID = members[Math.floor(Math.random() * members.length)];
                        let randomMember = guild.members.cache.get(randomID);
                        randomMember.voice.setChannel(oldChannel).then((v) => {
                            oldChannel.setName(`ℵ┊${randomMember.user.nickname || randomMember.user.username} Vc`).catch((e) => null);
                        });
                        voiceManager.set(member.id, null)
                        voiceManager.set(randomMember.id, oldChannel.id)

                        const UpdateInfoChannel = await schemaInfoVoice.findOneAndUpdate({
                            GuildId: guild.id,
                            ChannelId: oldChannel.id,
                            OwnerID: randomMember,
                        });
                    }
                }
            } else {
                voiceManager.set(member.id, null)
                oldChannel.delete().catch((e) => null)

                let InfoChannel = await schemaInfoVoice.findOneAndDelete({ ChannelId: oldChannel.id });

            }

        }
    }


});