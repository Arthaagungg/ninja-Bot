const { dc, ChannelType, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, PermissionFlagsBits, ButtonStyle } = require('discord.js');
const app = require("../../app.json");
const schema = require("../../Structures/Schemas/voice-channel");

module.exports = {
    name: "setup-voice-channel",
    description: "Setup Voice Channel",
    type: 1,

    run: async (client, interaction) => {

        const { guild, member, customID, channel } = interaction;
        const { ViewChannel, SendMessages, AddReactions, ReadMessageHistory, Connect, AttachFiles } = PermissionFlagsBits;
        const everyoneRole = guild.roles.cache.find(role => role.name === '@everyone');
        const Ready = new EmbedBuilder()
            .setDescription(`✔ Loading Create Voice Channel...`)
            .setColor("Green")
        interaction.reply({ embeds: [Ready] });
        let loadingEmbed = new EmbedBuilder()
            .setDescription(`✔ Berhasil membuat voice Channel.`)
            .setColor("Green");


        // Send the embed to the channel
        let loadingMessage = await channel.send({ embeds: [loadingEmbed] });

        // Start the loading animation
        for (let i = 0; i < 20; i++) {
            // Change the embed to show the next frame of the animation
            loadingEmbed.setDescription(`Loading${'.'.repeat(i % 4)}`);
            loadingEmbed.setColor('Random');
            // Edit the message to show the updated embed
            await loadingMessage.edit({ embeds: [loadingEmbed] });
            // Wait for 500 milliseconds before updating the embed again
            await new Promise(resolve => setTimeout(resolve, 500));
        }
        // Loading complete 
        loadingEmbed.setDescription('Loading complete!');
        loadingEmbed.setColor('Random');
        await loadingMessage.edit({ embeds: [loadingEmbed] });

        const exampleCategory = await client.guilds.cache.get(guild.id).channels.create({
            name: `│───── HANGOUT`,
            type: ChannelType.GuildCategory,
            permissionOverwrites: [
                {
                    id: guild.roles.cache.get(everyoneRole.id), //everyone
                    deny: [ViewChannel]
                },
                {
                    id: guild.roles.cache.get(app.role.role_default), //Default roleID
                    allow: [Connect, ViewChannel, ReadMessageHistory],
                    deny: [SendMessages, AddReactions]
                },
                {
                    id: guild.roles.cache.get(app.role.role_musik), //Role Bot Musik
                    allow: [Connect, ViewChannel, ReadMessageHistory, SendMessages, AddReactions],
                },
            ]
        });
        // Create a new voice channel
        const exampleVoiceChannel = await guild.channels.create({
            name: `➕ Join To Create`,
            type: ChannelType.GuildVoice,
            parent: exampleCategory,
        }).then(async (channel) => {
            schema.findOne({ GuildId: guild.id }, async (err, data) => {
                if (!data) {
                    const newVerif = await schema.create({
                        GuildId: guild.id,
                        Parent: channel.parent.id,
                        CreateVoice: channel.id,
                    });
                } else {
                    const NewVoiceGame = await schema.findOneAndUpdate({
                        GuildId: guild.id,
                        Parent: channel.parent.id,
                        CreateVoice: channel.id,
                    });
                }
            })
        });
        // Create a new text channel
        const SettingVoice = await guild.channels.create({
            name: `・🔧・room-setting`,
            type: ChannelType.GuildText,
            parent: exampleCategory,
        }).then(async (channel) => {
            const CreateGame = new EmbedBuilder()
                .setTitle(`Room Setting Voice - ${guild.name} Server !`)
                .setDescription(`Channel Ini berfungsi untuk mengatur/setting room voice !\nSilahkan Buat Room Terlebih dahulu untuk menggunakan fitur ini !\n\n Informasi Tombol :\n<:lock:1068276348436623370> -  Mengunci Voice Channel.\n<:unlock:1068276353092288563> -  Membuka Kunci Voice Channel.\n<:hide:1068276400752164884> - Menyembunyikan Voice Channel.\n<:unhide:1068276387280064592> -  Menampilkan Kembali Voice Channel.\n<:limit:1068276338894585876> -  Mengatur Limit Voice Channel.\n<:inforoom:1068276374210613382> -  Melihat Info Voice Channel.\n<:kick:1068276321106534450> -  Kick User Dari Voice Channel.\n<:rename:1068276330891841546> -  Mengganti Nama Voice Channel.\n<:bitrate:1068276406557102201> -  Mengatur Bitrate Voice Channel.\n<:region:1068276369542369330> -  Mengganti Region Voice Channel.\n<:transfer:1072024795086078042> -  Transfer Owner Voice Channel.\n<:invite:1068276357836046416> -  Mengundang User lain .\n<:autodc:1068276343646715924> -  Mengatur Otomatis Disconnect.`)
                .setColor("Green")
                .setThumbnail(guild.iconURL({ dynamic: true }))
                .setFooter({ text: `Copyright ©2023 - ${guild.name}`, iconURL: guild.iconURL() })
                .setTimestamp();

            const button1 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder().setCustomId('lock-voice').setStyle(ButtonStyle.Secondary).setEmoji('<:lock:1068276348436623370>'),
                    new ButtonBuilder().setCustomId('unlock-voice').setStyle(ButtonStyle.Secondary).setEmoji('<:unlock:1068276353092288563>'),
                    new ButtonBuilder().setCustomId('hide-voice').setStyle(ButtonStyle.Secondary).setEmoji('<:hide:1068276400752164884>'),
                    new ButtonBuilder().setCustomId('unhide-voice').setStyle(ButtonStyle.Secondary).setEmoji('<:unhide:1068276387280064592>'),
                    new ButtonBuilder().setCustomId('limit-voice').setStyle(ButtonStyle.Secondary).setEmoji('<:limit:1068276338894585876>'),
                );
            const button2 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder().setCustomId('invite-voice').setStyle(ButtonStyle.Secondary).setEmoji('<:invite:1068276357836046416>'),
                    new ButtonBuilder().setCustomId('kick-voice').setStyle(ButtonStyle.Secondary).setEmoji('<:kick:1068276321106534450>'),
                    new ButtonBuilder().setCustomId('rename-voice').setStyle(ButtonStyle.Secondary).setEmoji('<:rename:1068276330891841546>'),
                    new ButtonBuilder().setCustomId('bitrate-voice').setStyle(ButtonStyle.Secondary).setEmoji('<:bitrate:1068276406557102201>'),
                    new ButtonBuilder().setCustomId('region-voice').setStyle(ButtonStyle.Secondary).setEmoji('<:region:1068276369542369330>'),
                )
            const button3 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder().setCustomId('blank1').setStyle(ButtonStyle.Secondary).setEmoji('<:blank:1072019596615364728>').setDisabled(true),
                    new ButtonBuilder().setCustomId('transfer-voice').setStyle(ButtonStyle.Secondary).setEmoji('<:transfer:1072024795086078042>'),
                    new ButtonBuilder().setCustomId('info-voice').setStyle(ButtonStyle.Secondary).setEmoji('<:inforoom:1068276374210613382>'),
                    new ButtonBuilder().setCustomId('dc-voice').setStyle(ButtonStyle.Secondary).setEmoji('<:autodc:1068276343646715924>'),
                    new ButtonBuilder().setCustomId('blank2').setStyle(ButtonStyle.Secondary).setEmoji('<:blank:1072019596615364728>').setDisabled(true),
                )
            // Create a new text channel musik
            const SettingVoice = await guild.channels.create({
                name: `・🎵・music-req`,
                type: ChannelType.GuildText,
                parent: exampleCategory,
                permissionOverwrites: [
                    {
                        id: guild.roles.cache.get(everyoneRole.id), //everyone
                        deny: [ViewChannel]
                    },
                    {
                        id: guild.roles.cache.get(app.role.role_default), //Default roleID
                        allow: [Connect, ViewChannel, ReadMessageHistory, SendMessages, AddReactions],
                        deny: [AttachFiles]
                    },
                    {
                        id: guild.roles.cache.get(app.role.role_musik), //Role Bot Musik
                        allow: [Connect, ViewChannel, ReadMessageHistory, SendMessages, AddReactions],
                    },
                ],
            });
            channel.send({
                embeds: ([CreateGame]),
                components: [
                    button1, button2, button3
                ]
            })
        });

        const channels = exampleCategory.guild.channels.cache;
        const highestPosition = channels.sort((a, b) => b.position - a.position).first().position;
        await exampleCategory.setPosition(highestPosition + 1);


    },
};