const client = require("../../index");
const { dc, ChannelType, GuildVoice, Collection, PermissionFlagsBits, TextInputBuilder, TextInputStyle, InteractionType, ModalBuilder, EmbedBuilder, GuildMember, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const { connect } = require('mongoose');
const schema = require("../../Structures/Schemas/voice-game");
const { voiceGenerator } = require("../../index");
const { Modal, TextInputComponent, ShowModal } = require("discord-modals");
let voiceManager = new Collection();

client.on(`interactionCreate`, async (interaction) => {
    const { guild, member, customID, channel } = interaction;
    const { ViewChannel, SendMessages, AddReactions, ReadMessageHistory, Connect } = PermissionFlagsBits;

    if (interaction.isButton()) {
        const { guild, member, customID, channel } = interaction;
        let data = await schema.findOne({ GuildId: guild.id })
        if (!data) return;
        if (data) {
            const voiceChannelId = data.CreateVoice;
            const textChannel = client.channels.cache.get(voiceChannelId);
            const parentChannel = data.Parent;

            if (interaction.customId === "region") {

                try {
                        if (member.voice.channel && member.voice.channel.id !== voiceChannelId && member.voice.channel.parentId === parentChannel) {

                            voiceManager.set(member.id, member.voice.channel.id);

                            const CreateGame = new EmbedBuilder()
                                .setTitle(`Ganti Bitrate - ${guild.name} Server !`)
                                .setDescription(`*Silahkan Pilih Region Untuk Mengganti Region Voice Game !*`)
                                .setColor("Green")
                                .setThumbnail(guild.iconURL({ dynamic: true }))
                                .setFooter({ text: `Copyright ©2023 - ${guild.name}`, iconURL: guild.iconURL() })
                                .setTimestamp();
                            const row = new ActionRowBuilder()
                                .addComponents(
                                    new StringSelectMenuBuilder()
                                        .setCustomId('region')
                                        .setPlaceholder('Pilih salah satu !')
                                        .setMaxValues(1)
                                        .addOptions(
                                            {
                                                label: 'Brazil',
                                                value: 'brazil',
                                                display: 'Brazil',
                                                emoji: '<:example:1068054923394158643>',
                                            },
                                            {
                                                label: 'Hongkong',
                                                value: 'hongkong',
                                                emoji: '<:example:1068054923394158643>',
                                            },
                                            {
                                                label: 'India',
                                                value: 'india',
                                                emoji: '<:example:1068054923394158643>',
                                            },
                                            {
                                                label: 'Japan',
                                                value: 'japan',
                                                emoji: '<:example:1068054923394158643>',
                                            },
                                            {
                                                label: 'Rotterdam',
                                                value: 'rotterdam',
                                                emoji: '<:example:1068054923394158643>',
                                            },
                                            {
                                                label: 'Russia',
                                                value: 'russia',
                                                emoji: '<:example:1068054923394158643>',
                                            },
                                            {
                                                label: 'Singapore',
                                                value: 'singapore',
                                                emoji: '<:example:1068054923394158643>',
                                            },
                                            {
                                                label: 'South Korea',
                                                value: 'south-korea',
                                                emoji: '<:example:1068054923394158643>',
                                            },
                                            {
                                                label: 'South Africa',
                                                value: 'southafrica',
                                                emoji: '<:example:1068054923394158643>',
                                            },
                                            {
                                                label: 'Sydney',
                                                value: 'sydney',
                                                emoji: '<:example:1068054923394158643>',
                                            },
                                            {
                                                label: 'Us central',
                                                value: 'us-central',
                                                emoji: '<:example:1068054923394158643>',
                                            },
                                            {
                                                label: 'Us East',
                                                value: 'us-east',
                                                emoji: '<:example:1068054923394158643>',
                                            },

                                            {
                                                label: 'Us South',
                                                value: 'us-south',
                                                emoji: '<:example:1068054923394158643>',
                                            },
                                            {
                                                label: 'US west',
                                                value: 'us-west',
                                                emoji: '<:example:1068054923394158643>',
                                            },

                                        ),
                                );
                            await interaction.reply({
                                ephemeral: true,
                                embeds: ([CreateGame]),
                                components: [
                                    row
                                ]
                            });
                        } else {
                            const Error = new EmbedBuilder()
                                .setDescription(`❌ Silahkan buat voice game terlebih dahulu untuk mengubah region voice. !`)
                                .setColor("Red")
                            await interaction.reply({ ephemeral: true, embeds: [Error] });
                        }
                } catch (err) {
                    console.error(err);
                }
            } else if (interaction.customId === "bitrate") {
                const modal = new ModalBuilder()
                    .setCustomId("bitrate-modals")
                    .setTitle(`Pengaturan Bitrate`);

                const vbitrate = new TextInputBuilder()
                    .setCustomId("inputBitrate")
                    .setLabel(`Isi dengan angka bitrate:`)
                    .setPlaceholder("masukan angka bitrate disini (8 - 256)")
                    .setRequired(true)
                    .setMaxLength(3)
                    .setStyle(TextInputStyle.Short);

                const Vbitrate = new ActionRowBuilder().addComponents(vbitrate);
                modal.addComponents(Vbitrate);

                await interaction.showModal(modal);



            }

        }
    }
});