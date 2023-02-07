const client = require("../../index");
const { PermissionOverwrites, ChannelType, GuildVoice, Collection, PermissionFlagsBits, TextInputBuilder, TextInputStyle, InteractionType, ModalBuilder, EmbedBuilder, GuildMember, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const { connect } = require('mongoose');
const schemaVoiceChannel = require("../../Structures/Schemas/voice-channel");
const schemaInfoVoice = require("../../Structures/Schemas/InfoVoice");
const app = require("../../app.json");
let voiceManager = new Collection();

client.on(`interactionCreate`, async (interaction) => {
    const { guild, member, customID, channel } = interaction;
    const { ViewChannel, SendMessages, AddReactions, ReadMessageHistory, Connect } = PermissionFlagsBits;
    const voiceChannel = member.voice.channel;
    const Embed = new EmbedBuilder().setColor("Green");
    let Parent = await schemaVoiceChannel.findOne({ Parent: channel.parentId });
    if (!Parent) return;
    if (!voiceChannel) return interaction.reply({ embeds: [Embed.setTitle("Tidak Ada Dalam Voice Temporary").setDescription("Anda Tidak Berada Dala Voice Temporary untuk menggunakan ini silahkan untuk membuat Voice Temporary.").setColor("Red")], ephemeral: true });
    let dataRoom = await schemaInfoVoice.findOne({ ChannelId: voiceChannel.id })
    if (dataRoom.OwnerID !== member.id) return interaction.reply({ embeds: [Embed.setTitle("Anda Bukan Pemilik Voice Channel ini.").setDescription("Hanya Pemilik Voice Channel ini yang dapat melakukan setting voice.").setColor("Red")], ephemeral: true });
    if (interaction.isButton()) {
        if (interaction.customId === "lock-voice") {
            await voiceChannel.permissionOverwrites.edit(app.role.role_default, { Connect: false });
            await interaction.reply({ embeds: [Embed.setDescription("<:lock:1068276348436623370> | Berhasil Mengunci Voice Channel.")], ephemeral: true, expiresIn: "1s" });
        }
        if (interaction.customId === "unlock-voice") {
            await voiceChannel.permissionOverwrites.edit(app.role.role_default, { Connect: true });
            await interaction.reply({ embeds: [Embed.setDescription("<:unlock:1068276353092288563> | Berhasil membuka kunci Voice Channel.")], ephemeral: true, expiresIn: "1s" });
        }
        if (interaction.customId === "hide-voice") {
            await voiceChannel.permissionOverwrites.edit(app.role.role_default, { ViewChannel: false });
            await interaction.reply({ embeds: [Embed.setDescription("<:hide:1068276400752164884> | Berhasil Menyembunyikan Voice Channel.")], ephemeral: true, expiresIn: "1s" });
        }
        if (interaction.customId === "unhide-voice") {
            await voiceChannel.permissionOverwrites.edit(app.role.role_default, { ViewChannel: true });
            await interaction.reply({ embeds: [Embed.setDescription("<:unhide:1068276387280064592> | Berhasil Menampilkan Voice Channel.")], ephemeral: true, expiresIn: "1s" });
        }
        if (interaction.customId === "limit-voice") {
            const modal = new ModalBuilder()
                .setCustomId("limit-modals")
                .setTitle(`Pengaturan Limit Voice Channel !`);

            const vlimit = new TextInputBuilder()
                .setCustomId("inputLimit")
                .setLabel(`Isi dengan jummlah limit:`)
                .setPlaceholder(`*Masukan Jumlah Limit Disini (0 - 99)*`)
                .setRequired(true)
                .setMaxLength(2)
                .setStyle(TextInputStyle.Short);

            const Vlimit = new ActionRowBuilder().addComponents(vlimit);
            modal.addComponents(Vlimit);

            await interaction.showModal(modal);
        }
        if (interaction.customId === "invite-voice") {
            const embed = new EmbedBuilder()
                .setTitle(`List Member`)
                .setDescription(`Silahkan Pilih User Yang ingin anda Invite.`)


            const guildMembers = channel.guild.members.cache.map(member => ({
                label: member.user.username,
                description: `${member.user.username}#${member.user.discriminator}`,
                value: member.id,
                emoji: `<:user:1072360955964563587>`
            }));

            const row = new ActionRowBuilder()
                .addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('pilih-invite')
                        .setPlaceholder('Nothing selected')
                        .addOptions(guildMembers),
                );

            const info = await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
            setTimeout(() => {
                interaction.editReply({ embeds: [embed.setDescription("Anda membutuhkan waktu terlalu lama untuk menyelesaikan tindakan ini").setTitle("Waktu Habis.")], components: [] });
            }, 60000);
        }
        if (interaction.customId === "kick-voice") {

            const embed = new EmbedBuilder()
                .setTitle(`List Member Voice Channel !`)
                .setDescription(`Silahkan Pilih User Yang ingin anda Kick.`)
            const guildMembers = voiceChannel.members.filter(member => !member.user.bot && member.id !== interaction.user.id);

            const members = guildMembers.map(member => ({
                label: member.user.username,
                description: `${member.user.username}#${member.user.discriminator}`,
                value: member.id,
                emoji: `<:user:1072360955964563587>`
            }));
            if (members.length === 0) return interaction.reply({ embeds: [Embed.setDescription("Tidak dapat menemukan pengguna di Voice Channel Anda yang bukan bot").setTitle("Tidak dapat menemukan member.").setColor("Red")], ephemeral: true, expiresIn: "1s" });

            const row = new ActionRowBuilder()
                .addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('target-kick')
                        .setPlaceholder('Silahkan Pilih User !')
                        .addOptions(members),
                );

            const info = await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
            setTimeout(() => {
                interaction.editReply({ embeds: [embed.setDescription("Anda membutuhkan waktu terlalu lama untuk menyelesaikan tindakan ini").setTitle("Waktu Habis.")], components: [] });
            }, 60000);
        }
        if (interaction.customId === "rename-voice") {
            const modal = new ModalBuilder()
                .setCustomId("rename-modals")
                .setTitle(`Pengaturan Mengubah Nama Voice Channel !`);

            const vName = new TextInputBuilder()
                .setCustomId("inputName")
                .setLabel(`Isi Dengan Nama voice Channel:`)
                .setPlaceholder(`Maksimal 22 Huruf.`)
                .setRequired(true)
                .setMaxLength(222)
                .setStyle(TextInputStyle.Short);

            const VName = new ActionRowBuilder().addComponents(vName);
            modal.addComponents(VName);

            await interaction.showModal(modal);
        }
        if (interaction.customId === "bitrate-voice") {
            const modal = new ModalBuilder()
                .setCustomId("bitratevoice-modals")
                .setTitle(`Pengaturan Bitrate`);

            const vbitrate = new TextInputBuilder()
                .setCustomId("inputBitrate")
                .setLabel(`Isi dengan angka bitrate:`)
                .setPlaceholder("masukan angka bitrate disini (8 - 384)")
                .setRequired(true)
                .setMaxLength(3)
                .setStyle(TextInputStyle.Short);

            const Vbitrate = new ActionRowBuilder().addComponents(vbitrate);
            modal.addComponents(Vbitrate);

            await interaction.showModal(modal);
        }
        if (interaction.customId === "region-voice") {
            const Region = new EmbedBuilder()
                .setTitle(`List Bitrate`)
                .setDescription(`*Silahkan Pilih Region Untuk Mengganti Region Voice Channel Anda !*`)
                .setColor("Green");
            const row = new ActionRowBuilder()
                .addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('regionvoice')
                        .setPlaceholder('Silahkan Pilih Region !')
                        .setMaxValues(1)
                        .addOptions(
                            {
                                label: 'Brazil',
                                value: 'brazil',
                                display: 'Brazil',
                                emoji: '<:brazil:1072429786384838706>',
                            },
                            {
                                label: 'Hongkong',
                                value: 'hongkong',
                                emoji: ' <:hongkong:1072429793288667186>',
                            },
                            {
                                label: 'India',
                                value: 'india',
                                emoji: '<:indiaindia:1072429807809351770>',
                            },
                            {
                                label: 'Japan',
                                value: 'japan',
                                emoji: ' <:japan:1072429818542563338>',
                            },
                            {
                                label: 'Rotterdam',
                                value: 'rotterdam',
                                emoji: ' <:rotterdam:1072429824502665307>',
                            },
                            {
                                label: 'Russia',
                                value: 'russia',
                                emoji: '<:russia:1072429840285839401>',
                            },
                            {
                                label: 'Singapore',
                                value: 'singapore',
                                emoji: '<:singapore:1072429853997011035> ',
                            },
                            {
                                label: 'South Korea',
                                value: 'south-korea',
                                emoji: '<:southkorea:1072431020202278922>',
                            },
                            {
                                label: 'South Africa',
                                value: 'southafrica',
                                emoji: '<:southafrica:1072429866386997258>',
                            },
                            {
                                label: 'Sydney',
                                value: 'sydney',
                                emoji: '<:sydney:1072429878693072956>',
                            },
                            {
                                label: 'Us central',
                                value: 'us-central',
                                emoji: '<:us:1072429895285756024>',
                            },
                            {
                                label: 'Us East',
                                value: 'us-east',
                                emoji: '<:us:1072429895285756024>',
                            },

                            {
                                label: 'Us South',
                                value: 'us-south',
                                emoji: '<:us:1072429895285756024>',
                            },
                            {
                                label: 'US west',
                                value: 'us-west',
                                emoji: '<:us:1072429895285756024>',
                            },

                        ),
                );
            const info = await interaction.reply({ embeds: [Region], components: [row], ephemeral: true });
            setTimeout(() => {
                interaction.editReply({ embeds: [Region.setDescription("Anda membutuhkan waktu terlalu lama untuk menyelesaikan tindakan ini").setTitle("Waktu Habis.")], components: [] });
            }, 60000);
        }
        if(interaction.customId === "transfer-voice"){


            const embed = new EmbedBuilder()
                .setTitle(`List Member Voice Channel !`)
                .setDescription(`Silahkan Pilih User untuk transfer Owner Voice Channel.`)
            const guildMembers = voiceChannel.members.filter(member => !member.user.bot && member.id !== interaction.user.id);

            const members = guildMembers.map(member => ({
                label: member.user.username,
                description: `${member.user.username}#${member.user.discriminator}`,
                value: member.id,
                emoji: `<:user:1072360955964563587>`
            }));
            if (members.length === 0) return interaction.reply({ embeds: [Embed.setDescription("Tidak dapat menemukan pengguna di Voice Channel Anda yang bukan bot").setTitle("Tidak dapat menemukan member.").setColor("Red")], ephemeral: true, expiresIn: "1s" });

            const row = new ActionRowBuilder()
                .addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('target-transfer')
                        .setPlaceholder('Silahkan Pilih User !')
                        .addOptions(members),
                );

            const info = await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
            setTimeout(() => {
                interaction.editReply({ embeds: [embed.setDescription("Anda membutuhkan waktu terlalu lama untuk menyelesaikan tindakan ini").setTitle("Waktu Habis.")], components: [] });
            }, 60000);
        }
        if(interaction.customId === "info-voice"){

        }
        if(interaction.customId === "dc-voice"){
            
            const modal = new ModalBuilder()
                .setCustomId("autodc-modals")
                .setTitle(`Otomatis Disconnect !`);

            const vautodc = new TextInputBuilder()
                .setCustomId("inputAutodc")
                .setLabel(`Isi Dengan Satuan Jam :`)
                .setPlaceholder("Isi Sesuai waktu mulai dari (1 - 24) Jam")
                .setRequired(true)
                .setMaxLength(2)
                .setStyle(TextInputStyle.Short);

            const Vautodc = new ActionRowBuilder().addComponents(vautodc);
            modal.addComponents(Vautodc);

            await interaction.showModal(modal);
        }
        //Batas
    }

});