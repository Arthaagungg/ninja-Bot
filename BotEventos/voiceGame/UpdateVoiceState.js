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
    let data = await schemaVoiceGame.findOne({ GuildId: guild.id })
    if (!data) return;
    if (data) {
        const voiceChannelId = data.CreateVoice;
        const textChannel = client.channels.cache.get(voiceChannelId);
        const parentChannel = data.Parent;

        if (oldChannel !== newChannel && newChannel && newChannel.id !== voiceChannelId && newChannel.parentId === parentChannel) {
            voiceManager.set(member.id, newChannel.id);
        }
    }
    const jointocreate = voiceManager.get(member.id);
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
                let randomID = members[Math.floor(Math.random() * members.length)];
                let randomMember = guild.members.cache.get(randomID);
                randomMember.voice.setChannel(oldChannel).then((v) => {
                    oldChannel.setName(`乂┊${randomMember.user.username} Vc`).catch((e) => null);
                })

                voiceManager.set(member.id, null)
                voiceManager.set(randomMember.id, oldChannel.id)

                const UpdateInfoChannel = await schemaInfoVoice.findOneAndUpdate({
                    GuildId: guild.id,
                    ChannelId: oldChannel.id,
                    OwnerID: randomMember,
                });
            } else {
                voiceManager.set(member.id, null)
                oldChannel.delete().catch((e) => null)

                let InfoChannel = await schemaInfoVoice.findOneAndDelete({ ChannelId: oldChannel.id });

            }

        }
    }

    let GetVoiceChannel = await schemaVoiceChannel.findOne({ GuildId: guild.id })
    if (!GetVoiceChannel) return;
    if (oldChannel !== newChannel && newChannel && newChannel.id === GetVoiceChannel.CreateVoice) {
        const { ViewChannel, SendMessages, Speak, ReadMessageHistory, Connect, ManageChannels } = PermissionFlagsBits;
        if (!GetVoiceChannel) return;
        if (GetVoiceChannel) {
            const voiceChannelId = GetVoiceChannel.CreateVoice;
            if (newChannel && newChannel.id === voiceChannelId) {
                const voiceChannel = await guild.channels.create({
                    name: `乂┊${member.user.username} Vc`,
                    type: ChannelType.GuildVoice,
                    parent: newChannel.parent,
                    permissionOverwrites: [
                        {
                            id: guild.id, //everyone
                            deny: [ViewChannel]
                        },
                        {
                            id: guild.roles.cache.get(app.role.role_default), //Default roleID
                            allow: [ViewChannel, Connect, Speak, ReadMessageHistory, SendMessages,],
                        },
                        {
                            id: client.user.id, //Bot ID
                            allow: [ManageChannels],
                        }
                    ],
                });
                voiceManager.set(member.id, voiceChannel.id);
                member.voice.setChannel(voiceChannel)
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


});