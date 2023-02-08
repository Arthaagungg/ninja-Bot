const client = require("../../index");
const { dc, ChannelType, GuildVoice, Collection, PermissionFlagsBits, InteractionType, EmbedBuilder, Embed } = require('discord.js');
const { connect } = require('mongoose');
const schema = require("../../Structures/Schemas/voice-game");
let ValueLimitName = 0;

client.on(`interactionCreate`, async (interaction) => {
    const { guild, member, customID, channel } = interaction;
    const { ViewChannel, SendMessages, AddReactions, ReadMessageHistory, Connect } = PermissionFlagsBits;
    const voiceChannel = member.voice.channel;
    if (interaction.type == InteractionType.ModalSubmit) {
        const { guild, member, customID, channel } = interaction;
        const Embed = new EmbedBuilder().setColor("Green");
        try {
            if (interaction.customId === "bitrate-modals") {
                let data = await schema.findOne({ GuildId: guild.id })
                let bitrate = interaction.fields.getTextInputValue("inputBitrate");
                if (data) {
                    const voiceChannelId = data.CreateVoice;
                    const textChannel = client.channels.cache.get(voiceChannelId);
                    const parentChannel = textChannel.parent;

                    if (member.voice.channel && member.voice.channel.id !== voiceChannelId && member.voice.channel.parentId === parentChannel.id) {
                        if (bitrate < 8 || bitrate > 256) {
                            const Error = new EmbedBuilder()
                                .setDescription(`❌ Silahkan Isi Bitrate Mulai dari 8 -256 kbps`)
                                .setColor("Red")
                            await interaction.reply({ ephemeral: true, embeds: [Error] });
                        } else {
                            member.voice.channel.setBitrate(bitrate * 1000)
                            const Ready = new EmbedBuilder()
                                .setDescription(`✔ Berhasil merubah bitrate menjadi **${bitrate}kbps**.`)
                                .setColor("Green")
                            await interaction.reply({ ephemeral: true, embeds: [Ready] });
                        }
                    } else {
                        const Error = new EmbedBuilder()
                            .setDescription(`❌ Gagal mengupdate bitrate ! silahkan untuk membuat voice game ter lebih dahulu dengan masuk ke voice chnanel <#${voiceChannelId}>`)
                            .setColor("Red")
                        await interaction.reply({ ephemeral: true, embeds: [Error] });
                    }
                }
            }
            if (interaction.customId === "limit-modals") {
                let limit = interaction.fields.getTextInputValue("inputLimit");
                member.voice.channel.setUserLimit(limit)
                const Ready = new EmbedBuilder()
                    .setDescription(`<:limit:1068276338894585876> | Berhasil merubah Limit Voice Channel menjadi **${limit} users**.`)
                    .setColor("Green")
                await interaction.reply({ ephemeral: true, embeds: [Ready] });
            }

            if (interaction.customId === "rename-modals") {
                let name = interaction.fields.getTextInputValue("inputName");
                if (name.length > 22 || name.length < 1)
                    return interaction.reply({ embeds: [Embed.setDescription("Nama tidak bisa lebih dari 22 karakter.").setColor("Red")], ephemeral: true });
                if (ValueLimitName === 2)
                    return interaction.reply({ embeds: [Embed.setDescription("Sudah Masuk limit").setColor("Red")], ephemeral: true }).then(() => {
                        setTimeout(() => {
                            ValueLimitName = 0;
                        }, 600000);
                    })
                member.voice.channel.setName(name)
                await interaction.reply({ embeds: [Embed.setDescription(`<:rename:1068276330891841546> | Berhasil Merubah Nama Voice Channel Menjadi ${name}`).setColor("Green")], ephemeral: true });
                ValueLimitName += 1;
            }
            if (interaction.customId === "bitratevoice-modals") {
                let bitrate = interaction.fields.getTextInputValue("inputBitrate");
                if (bitrate < 8 || bitrate > 384) {
                    await interaction.reply({ embeds: [Embed.setDescription(`❌ Silahkan Isi Bitrate Mulai dari 8 - 384 kbps`).setColor("Red")], ephemeral: true });

                } else {
                    member.voice.channel.setBitrate(bitrate * 1000)
                    await interaction.reply({ embeds: [Embed.setDescription(`<:bitrate:1068276406557102201> | Berhasil merubah bitrate menjadi **${bitrate}kbps**.`).setColor("Green")], ephemeral: true });
                }
            }
            if (interaction.customId === "autodc-modals") {
                let time = interaction.fields.getTextInputValue("inputAutodc");
                if (time < 1 || time > 24) {
                    await interaction.reply({ embeds: [Embed.setDescription(`❌ Silahkan Isi Menit Mulai dari (1 - 24) Jam`).setColor("Red")], ephemeral: true });

                } else {
                    let TimeOut = time * 60000 * 60;
                    await interaction.reply({ embeds: [Embed.setDescription(`<:bitrate:1068276406557102201> | Berhasil Setting Otomatis Disconnect Setelah **${time}jam**.`).setColor("Green")], ephemeral: true });
                    setTimeout(() => {
                        if (member.voice.channel) {
                            member.voice.setChannel(null);
                        }
                    }, TimeOut);
                }
            }
        } catch (err) {
            console.error(err);
        }
    }
});