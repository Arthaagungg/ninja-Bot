const client = require("../../index");
const { dc, ChannelType, GuildVoice, Collection, PermissionFlagsBits,InteractionType, EmbedBuilder } = require('discord.js');
const { connect } = require('mongoose');
const schema = require("../../Structures/Schemas/voice-game");
let voiceManager = new Collection();

client.on(`interactionCreate`, async (interaction) => {
    const { guild, member, customID, channel } = interaction;
    const { ViewChannel, SendMessages, AddReactions, ReadMessageHistory, Connect } = PermissionFlagsBits;

    if (interaction.type == InteractionType.ModalSubmit) {
        let bitrate = interaction.fields.getTextInputValue("inputBitrate");
        const { guild, member, customID, channel } = interaction;
        try {
            let data = await schema.findOne({ GuildId: guild.id })
            if (interaction.customId === "bitrate-modals") {
                if (data) {
                    const voiceChannelId = data.CreateVoice;
                    const textChannel = client.channels.cache.get(voiceChannelId);
                    const parentChannel = textChannel.parent;
                    
                    if (member.voice.channel && member.voice.channel.id !== voiceChannelId && member.voice.channel.parentId === parentChannel.id) {
                       if(bitrate < 8 || bitrate > 256 ){
                        const Error = new EmbedBuilder()
                        .setDescription(`❌ Silahkan Isi Bitrate Mulai dari 8 -256 kbps`)
                        .setColor("Red")
                        await interaction.reply({ ephemeral: true, embeds: [Error] });
                       }else{
                        member.voice.channel.setBitrate(bitrate * 1000)
                        const Ready = new EmbedBuilder()
                        .setDescription(`✔ Berhasil merubah bitrate menjadi **${bitrate}kbps**.`)
                        .setColor("Green")
                        await interaction.reply({ ephemeral: true, embeds: [Ready] });
                       }
                    }else{
                        const Error = new EmbedBuilder()
                        .setDescription(`❌ Gagal mengupdate bitrate ! silahkan untuk membuat voice game ter lebih dahulu dengan masuk ke voice chnanel <#${voiceChannelId}>`)
                        .setColor("Red")
                        await interaction.reply({ ephemeral: true, embeds: [Error] });
                    }
                    
                 
                }


            }
        } catch (err) {
            console.error(err);
        }
    }
});