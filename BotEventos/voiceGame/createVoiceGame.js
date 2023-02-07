const client = require("../../index");
const { dc, ChannelType, GuildVoice, Collection, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const { connect } = require('mongoose');
const schema = require("../../Structures/Schemas/voice-game");
let voiceManager = new Collection();

client.on(`interactionCreate`, async (interaction) => {
    const { guild, member, customID, channel } = interaction;
    const { ViewChannel, SendMessages, AddReactions, ReadMessageHistory, Connect } = PermissionFlagsBits;
    if (interaction.isStringSelectMenu()) {
        const { guild, member, customID, channel } = interaction;

        try {
            let data = await schema.findOne({ GuildId: guild.id })
            if (interaction.customId === "select") {
                const category = (interaction.values[0]);
                let NameChannel = "";
                let LimitChannel = 0;
                if (category === "ml") {
                    NameChannel = "Mobile Lejend";
                    LimitChannel = 5;
                } else if (category === "among") {
                    NameChannel = "Among Us";
                    LimitChannel = 15;
                } else if (category === "pubg") {
                    NameChannel = "PUBG";
                    LimitChannel = 15;
                } else if (category === "valorant") {
                    NameChannel = "Valorant";
                    LimitChannel = 5;
                } else if (category === "pokemon") {
                    NameChannel = "Pokemon Unite";
                    LimitChannel = 5;
                }
                if (data) {
                    const voiceChannelId = data.CreateVoice;
                    const textChannel = client.channels.cache.get(voiceChannelId);
                    const parentChannel = textChannel.parent;
                    
                    if (member.voice.channel && member.voice.channel.id === voiceChannelId) {
                        const voiceChannel = await guild.channels.create({
                            name: `🎮┊${NameChannel}`,
                            type: ChannelType.GuildVoice,
                            parent: parentChannel,
                            userLimit: LimitChannel
                        });
                        voiceManager.set(member.id, voiceChannel.id);
                        member.voice.setChannel(voiceChannel)
                        const Ready = new EmbedBuilder()
                        .setDescription(`✔ Berhasil membuat Voice Game. <#${voiceChannel.id}>`)
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