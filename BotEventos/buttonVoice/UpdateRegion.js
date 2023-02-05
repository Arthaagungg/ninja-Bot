const client = require("../../index");
const { dc, ChannelType, GuildVoice, Collection, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const { connect } = require('mongoose');
const schema = require("../../Structures/Schemas/voice-game");
let voiceManager = new Collection();

client.on(`interactionCreate`, async (interaction) => {
    const { guild, member, customID, channel } = interaction;
    const { ViewChannel, SendMessages, AddReactions, ReadMessageHistory, Connect } = PermissionFlagsBits;
    if (interaction.isStringSelectMenu()) {

        try {
            let data = await schema.findOne({ GuildId: guild.id })
            if (interaction.customId === "region") {
                const category = (interaction.values[0]);
                let Display = "";
                if (category === "brazil") {
                    Display = "Brazil";
                } else if (category === "hongkong") {
                    Display = "Hongkong";
                } else if (category === "india") {
                    Display = "India";
                } else if (category === "japan") {
                    Display = "Japan";
                } else if (category === "rotterdam") {
                    Display = "Rotterdam";
                 } else if (category === "russia") {
                    Display = "Russia";
                } else if (category === "Singapore") {
                    Display = "Singapore";
                } else if (category === "south-korea") {
                    Display = "South Korea";
                } else if (category === "southafrica") {
                    Display = "South Africa";
                } else if (category === "sydney") {
                    Display = "Sydney";
                } else if (category === "us-east") {
                    Display = "Us East";
                } else if (category === "us-south") {
                    Display = "Us South";
                } else if (category === "us-west") {
                    Display = "Us West";
                }
                if (data) {
                    const voiceChannelId = data.CreateVoice;
                    const textChannel = client.channels.cache.get(voiceChannelId);
                    const parentChannel = textChannel.parent;
                    if (member.voice.channel && member.voice.channel.id !== voiceChannelId && member.voice.channel.parentId === parentChannel.id) {
                        member.voice.channel.setRTCRegion(category);
                        const Ready = new EmbedBuilder()
                        .setDescription(`✔ Berhasil merubah region menjadi **${Display}**.`)
                        .setColor("Green")
                        await interaction.reply({ ephemeral: true, embeds: [Ready] });
                    }else{
                        const Error = new EmbedBuilder()
                        .setDescription(`❌ Silahkan masuk terlebih dahulu ke dalam voice room <#${voiceChannelId}>`)
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