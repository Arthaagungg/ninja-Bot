const dc = require('discord.js');
const schema = require("../../Structures/Schemas/voiceMBA");
const cooldown = require("../../Structures/Schemas/cdMBA");
const client = require("../../index");
let responded = false;

cooldownTime = 1 * 10000;
client.on(`messageCreate`, async (msg) => {
    message = msg;
    let embed = await schema.findOne({ channelID: message.channel.id })
    if (!embed) return;
    const channel = message.guild.channels.cache.get(embed.channelID);
    const DeleteMessage = await message.channel.messages.fetch(embed.messageID);
    if (message.channel.id === embed.channelID) {
        if (message.member.id === client.user.id) return;
        if (!responded) {
            responded = true;

            setTimeout(() => {
                responded = false;
            }, 10000);

            let cooldownSend = setInterval(async () => {
                clearInterval(cooldownSend);
                const roleId = "1064037181636751490";
                let botWithSpecificRole = client.guilds.cache.flatMap(guild => {
                    return guild.members.cache.filter(m => m.user.bot && m.roles.cache.has(roleId))
                });
                bots = botWithSpecificRole.filter(bot => bot.voice.channel)
                    .map(bot => `<a:silng:1067394455516225616> : ${bot.nickname}`)
                    .concat(botWithSpecificRole.filter(bot => !bot.voice.channel)
                        .map(bot => `<a:ckls:1067394449472245770> : ${bot.nickname}`));
                let sendembed = new dc.EmbedBuilder()
                    .setTitle("List Bot Musik Yang Tersedia & Tidak !")
                    .setColor("Random")
                    .setDescription(bots.join('\n') + "\n***Note :***\n <a:ckls:1067394449472245770> Bot dapat di gunakan.\n <a:silng:1067394455516225616> Bot tidak dapat di gunakan.\n\n***Bot Avalible Update 3 Menit Seklai !***")
                if (channel) {
                    channel.send({ embeds: [sendembed] })
                        .then(msg => {
                            message = msg;
                            schema.findOne({ GuildId: message.guild.id }, async (err, data) => {
                                if (data) {
                                    const newVerif = await schema.findOneAndUpdate({
                                        GuildId: message.guild.id,
                                        messageID: message.id,
                                        channelID: message.channel.id,
                                    });

                                    if (DeleteMessage) {
                                        DeleteMessage.delete();
                                    }
                                    CdcooldownSend = false;
                                }
                            });

                        });
                }
            }, cooldownTime);
        }


    }
    let CdRefresh = setInterval(async () => {
        if (!responded) {
            const roleId = "1064037181636751490";
            let botWithSpecificRole = client.guilds.cache.flatMap(guild => {
                return guild.members.cache.filter(m => m.user.bot && m.roles.cache.has(roleId))
            });
            bots = botWithSpecificRole.filter(bot => bot.voice.channel)
                .map(bot => `<a:silng:1067394455516225616> : ${bot.nickname}`)
                .concat(botWithSpecificRole.filter(bot => !bot.voice.channel)
                    .map(bot => `<a:ckls:1067394449472245770> : ${bot.nickname}`));
            let sendembed = new dc.EmbedBuilder()
                .setTitle("List Bot Musik Yang Tersedia & Tidak !")
                .setColor("Random")
                .setDescription(bots.join('\n') + "\n***Note :***\n <a:ckls:1067394449472245770> Bot dapat di gunakan.\n <a:silng:1067394455516225616> Bot tidak dapat di gunakan.\n\n***Bot Avalible Update 3 Menit Seklai !***")
            if (channel) {
                channel.edit({ embeds: [sendembed] })
                    .then(msg => {
                        message = msg;
                        schema.findOne({ GuildId: message.guild.id }, async (err, data) => {
                            if (data) {
                                const newVerif = await schema.findOneAndUpdate({
                                    GuildId: message.guild.id,
                                    messageID: message.id,
                                    channelID: message.channel.id,
                                });

                                if (DeleteMessage) {
                                    DeleteMessage.delete();
                                }
                                CdcooldownSend = false;
                            }
                        });

                    });
            }
        }
    }, 3 * 60 * 1000);

});

