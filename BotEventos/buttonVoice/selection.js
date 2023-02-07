const client = require("../../index");
const { dc, ChannelType, GuildVoice, Collection, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const { connect } = require('mongoose');
const schema = require("../../Structures/Schemas/voice-game");
const schemaInfoVoice = require("../../Structures/Schemas/InfoVoice");
let voiceManager = new Collection();

client.on(`interactionCreate`, async (interaction) => {
    const { guild, member, customID, channel } = interaction;
    const { ViewChannel, SendMessages, AddReactions, ReadMessageHistory, Connect } = PermissionFlagsBits;
    if (interaction.isStringSelectMenu()) {

        try {
            if (interaction.customId === "region") {
                let data = await schema.findOne({ GuildId: guild.id })
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
                    } else {
                        const Error = new EmbedBuilder()
                            .setDescription(`❌ Silahkan masuk terlebih dahulu ke dalam voice room <#${voiceChannelId}>`)
                            .setColor("Red")
                        await interaction.reply({ ephemeral: true, embeds: [Error] });
                    }


                }


            } else if (interaction.customId === "pilih-invite") {
                const target = interaction.guild.members.cache.get(interaction.values[0]);
                const voiceChannel = client.channels.cache.get(member.voice.channel.id);
                const Info = new EmbedBuilder()
                    .setTitle("Undangan Voice Channel !")
                    .setDescription(`${member.user} mengundang anda untuk join voice !`)
                    .setColor("Random");
                voiceChannel.send({ content: `${target}`, embeds: [Info] })
                const embed = new EmbedBuilder()
                    .setTitle(`Sukses.`)
                    .setColor("Green")
                    .setDescription(`<:invite:1068276357836046416> | Berhasil Mengrimkan Undang Voice kepada ${target}`)
                await interaction.update({ embeds: [embed], components: [] });
            }
            else if (interaction.customId === "target-kick") {
                const target = interaction.guild.members.cache.get(interaction.values[0]);
                target.voice.setChannel(null);
                const embed = new EmbedBuilder()
                    .setTitle(`Sukses.`)
                    .setColor("Green")
                    .setDescription(`<:kick:1068276321106534450> | Berhasil mengeluarkan ${target} dalam voice channel.`)
                await interaction.update({ embeds: [embed], components: [] });
            }
            else if (interaction.customId === "regionvoice") {
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
                member.voice.channel.setRTCRegion(category);
                const embed = new EmbedBuilder()
                    .setTitle(`Sukses.`)
                    .setColor("Green")
                    .setDescription(`<:region:1068276369542369330> | Berhasil merubah region menjadi **${Display}**.`)
                await interaction.update({ embeds: [embed], components: [] });
            }
            
            else if (interaction.customId === "target-transfer") {
                const target = interaction.guild.members.cache.get(interaction.values[0]);
                member.voice.channel.setName(`乂┊${target.user.username} Vc`).then(async (channel) => {
                    schemaInfoVoice.findOne({ ChannelId: member.voice.channel.id }, async (err, data) => {
                        const NewVoiceGame = await schema.findOneAndUpdate({
                            GuildId: guild.id,
                            ChannelId: member.voice.channel.id,
                            OwnerID: target,
                        });
                        
                    voiceManager.set(target.id, member.voice.channel.id)
                    })
                });
                const embed = new EmbedBuilder()
                    .setTitle(`Sukses.`)
                    .setColor("Green")
                    .setDescription(`<:transfer:1072024795086078042> | Berhasil Memindahkan Owner voice channel kepada ${target}.`)
                await interaction.update({ embeds: [embed], components: [] });
            }
        } catch (err) {
            console.error(err);
        }
    }
});