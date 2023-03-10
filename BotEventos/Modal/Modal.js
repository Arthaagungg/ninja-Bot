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
                let Time = interaction.fields.getTextInputValue("inputTime");
                let Satuan = interaction.fields.getTextInputValue("inputSatuan");
                let AutoDc = 0;
                if (Satuan === "jam" || Satuan === "Jam") {
                    AutoDc = Time * 60000 * 60;
                } else if (Satuan === "menit" || Satuan === "Menit") {
                    AutoDc = Time * 60000;
                } else {
                    await interaction.reply({ embeds: [Embed.setDescription(`❌ Format Tidak Sesuai. \n Contoh Format Yang benar :\n ⚫ 30 menit \n ⚫ 1 jam`).setColor("Red")], ephemeral: true });
                }
                if (AutoDc) {
                    await interaction.reply({ embeds: [Embed.setDescription(`<:autodc:1068276343646715924> | Berhasil Setting Otomatis Disconnect Dengan Waktu **${Time} ${Satuan}**.`).setColor("Green")], ephemeral: true });
                    setTimeout(() => {
                        if (member.voice.channel) {
                            member.voice.setChannel(null);
                        }
                    }, AutoDc);
                }
            }
            if (interaction.customId === "embed-modals") {
                let Title = interaction.fields.getTextInputValue("InputTitle");
                let Desc = interaction.fields.getTextInputValue("InputDesc");
                let Color = interaction.fields.getTextInputValue("InputColor");
                let Image = interaction.fields.getTextInputValue("InputImage") || null;
                let Thumnail = interaction.fields.getTextInputValue("InputThumnail");
                if (Image && !Image.startsWith('http') ) return await interaction.reply({ content: "Link Image Tidak Sesuai.", ephemeral: true });
                if (Thumnail && !Thumnail.startsWith('http') && !Thumnail === "guild") return await interaction.reply({ content: "Link Thumnail Tidak Sesuai.", ephemeral: true });
                if(!Color)
                {
                    Color = `ffffff`;
                }
                if(Thumnail === "guild" || Thumnail === "Guild")
                {
                    Thumnail = interaction.guild.iconURL({ format: "png", dynamic: true });
                }else if (Thumnail === ""){
                    Thumnail = null;
                }
                const embed = new EmbedBuilder()
                    .setTitle(Title)
                    .setDescription(Desc)
                    .setColor(`0x${Color}`)
                    .setImage(Image)
                    .setThumbnail(Thumnail)
                    .setFooter({text: `Copyright ©2023 - ${guild.name}`, iconURL: interaction.guild.iconURL({ format: "png", dynamic: true }) })
                    .setTimestamp(new Date());
                await interaction.reply({content: "Embed Berhasil Di Buat.", ephemeral:true });
                await channel.send({embeds: [embed]});
            }

        } catch (err) {
            console.error(err);
        }
    }
});