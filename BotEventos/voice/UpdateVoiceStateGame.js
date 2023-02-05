const client = require("../../index");
const { dc, ChannelType, GuildVoice, Collection, PermissionFlagsBits, VoiceChannel } = require('discord.js');
const { connect } = require('mongoose');
const schema = require("../../Structures/Schemas/voice-game");
let voiceManager = new Collection();

client.on(`voiceStateUpdate`, async (oldState, newState) => {
    const { member, guild } = oldState;
    const newChannel = newState.channel;
    const oldChannel = oldState.channel;

    let data = await schema.findOne({ GuildId: guild.id })
    if (!data) return;
    if (data) {
        const voiceChannelId = data.CreateVoice;
        const textChannel = client.channels.cache.get(voiceChannelId);
        const parentChannel = data.Parent;

        if (oldChannel !== newChannel && newChannel && newChannel.id !== textChannel.id && newChannel.parentId === parentChannel) {
            voiceManager.set(member.id, newChannel.id);
        }
    }
    if(oldChannel){
    const jointocreate = voiceManager.get(member.id);
        const members = oldChannel?.members
            .filter((m) => !m.user.bot)
            .map((m) => m.id)
        if (
            jointocreate &&
            oldChannel.id === jointocreate &&
            (!newChannel || newChannel.id !== jointocreate)
        ) {
            if (members.length === 0)
            {
                voiceManager.set(member.id, null)
                oldChannel.delete().catch((e) => null)
            }

        }
    }
});