const { dc, ChannelType, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, PermissionFlagsBits, ButtonStyle } = require('discord.js');
const app = require("../../app.json");
const schema = require("../../Structures/Schemas/voice-game");

    module.exports = {
        name: "setup-voice-game",
        description: "Setup Voice Game",
        type: 1,

        run: async (client, interaction) => {

            const { guild, member, customID, channel } = interaction;
            const { ViewChannel, SendMessages, AddReactions, ReadMessageHistory, Connect } = PermissionFlagsBits;
            const everyoneRole = guild.roles.cache.find(role => role.name === '@everyone');
            const Ready = new EmbedBuilder()
                .setDescription(`✔ Loading Create Voice Game...`)
                .setColor("Green")
            interaction.reply({ embeds: [Ready] });
            let loadingEmbed = new EmbedBuilder()
                .setDescription(`✔ Berhasil membuat voice game.`)
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
                name: `│───── GAMING VOICE`,
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
                    }
                ]
            });
            // Create a new voice channel
            const exampleVoiceChannel = await guild.channels.create({
                name: `➕ Create VG`,
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
                name: `・🔧・room-setting-gaming`,
                type: ChannelType.GuildText,
                parent: exampleCategory,
            }).then(async (channel) => {
                const CreateGame = new EmbedBuilder()
                    .setTitle(`Room Setting Voice - ${guild.name} Server !`)
                    .setDescription(`Room Untuk Setting Voice Game Mengenai Bitrate & Region. \n Untuk Menggunakannya Silahkan Reaction Emoji Di Bawah ! \n\n <:example:1068054923394158643> - Berfungsi Untuk Mengganti **Region Room** Voice Game. \n <:example:1068054923394158643> - Berfungsi Untuk Mengganti **Bitrate** Voice Gaming. `)
                    .setColor("Green")
                    .setThumbnail(guild.iconURL({ dynamic: true }))
                    .setFooter({ text: `Copyright ©2023 - ${guild.name}`, iconURL: guild.iconURL() })
                    .setTimestamp();

                const button = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder().setCustomId('region').setLabel("Ganti Region").setStyle(ButtonStyle.Secondary).setEmoji('<:example:1068054923394158643>'),
                        new ButtonBuilder().setCustomId('bitrate').setLabel("Ganti Bitrate").setStyle(ButtonStyle.Secondary).setEmoji('<:example:1068054923394158643>')
                    )
                channel.send({
                    embeds: ([CreateGame]),
                    components: [
                        button
                    ]
                })
            });

            // Create a new text channel
            const CreateVoice = await guild.channels.create({
                name: `・🎮・Create-Game`,
                type: ChannelType.GuildText,
                parent: exampleCategory,

            }).then(async (channel) => {
                const CreateGame = new EmbedBuilder()
                    .setTitle(`Room Create Game - ${guild.name} Server !`)
                    .setDescription(`Silahkan Pilih category game di bawah\nUntuk Membuat Voice Channel Game.\n**Membuat Voice :**\n\n1. *Silahkan masuk terlebih dahulu ke channel voice <#1053884778132291587>*\n2. *Setelah berada di dalam voice tersebut, silahkan pilih di menu bawah sesuai category game yang akan di mainkan.*\n\n**TERIMAKASIH**  `)
                    .setColor("Green")
                    .setThumbnail(guild.iconURL({ dynamic: true }))
                    .setFooter({ text: `Copyright ©2023 - ${guild.name}`, iconURL: guild.iconURL() })
                    .setTimestamp();
                const row = new ActionRowBuilder()
                    .addComponents(
                        new StringSelectMenuBuilder()
                            .setCustomId('select')
                            .setPlaceholder('Pilih salah satu !')
                            .setMaxValues(1)
                            .addOptions(
                                {
                                    label: 'Mobile Legends: Bang Bang',
                                    description: 'Room Limit : 5 User.',
                                    value: 'ml',
                                    emoji: '<:example:1068054923394158643>/',
                                },
                                {
                                    label: 'Among Us',
                                    description: 'Room Limit : 15 User.',
                                    value: 'among',
                                    emoji: '<:example:1068054923394158643>',
                                },
                                {
                                    label: 'PUBG Mobile',
                                    description: 'Room Limit : 4 User.',
                                    value: 'pubg',
                                    emoji: '<:example:1068054923394158643>',
                                },
                                {
                                    label: 'Valorant',
                                    description: 'Room Limit : 5 User.',
                                    value: 'valorant',
                                    emoji: '<:example:1068054923394158643>',
                                },
                                {
                                    label: 'Pokemon Unite',
                                    description: 'Room Limit : 5 User.',
                                    value: 'pokemon',
                                    emoji: '<:example:1068054923394158643>',
                                },
                            ),
                    );
                channel.send({
                    embeds: ([CreateGame]),
                    components: [
                        row
                    ]
                })
            });
            const channels = exampleCategory.guild.channels.cache;
            const highestPosition = channels.sort((a, b) => b.position - a.position).first().position;
            await exampleCategory.setPosition(highestPosition + 1);


        },
    };