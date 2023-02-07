const dc = require('discord.js');
module.exports = {
    name: "botmusic",
    aliases: ['bm'],

    run: async (client, message, app) => {
        if(message.channel.id != "1062753347603550228" ) return;
        const roleId = "1064037181636751490";
        let botWithSpecificRole = client.guilds.cache.flatMap(guild => {
            return guild.members.cache.filter(m => m.user.bot && m.roles.cache.has(roleId))
        });
        let inVoice = botWithSpecificRole.filter(bot => bot.voice && bot.voice.channel)
            .map(bot => `${bot.nickname}`).length;
        let notInVoice = botWithSpecificRole.filter(bot => !bot.voice || !bot.voice.channel).map(bot => `${bot.nickname}`).length;

        bots = botWithSpecificRole.filter(bot => bot.voice.channel)
            .map(bot => `<a:silng:1067393556664303656> : ${bot.nickname}`)
            .concat(botWithSpecificRole.filter(bot => !bot.voice.channel)
                .map(bot => `<a:ckls:1067393551446577152> : ${bot.nickname}`));

        let sendembed = new dc.EmbedBuilder()
            .setTitle("List Bot Musik Yang Tersedia & Tidak Tersedia !")
            .setColor("Random")
            .setDescription(bots.join('\n'))
            .addFields(
                { name: '***Note :***', value: '<a:ckls:1067393551446577152> Bot dapat di gunakan.\n<a:silng:1067393556664303656> Bot tidak dapat di gunakan.' },
                { name: 'Bot Yang Sedang Di Gunakan :', value: `**${inVoice}**`, inline: true },
                { name: 'Bot Yang Dapat Di Gunakan :', value: `**${notInVoice}**`, inline: true },
            )
            .setFooter({text: `Copyright ©2023 - ${message.guild.name}`, iconURL: message.guild.iconURL() })

        message.reply({ embeds: [sendembed] });
    }
};
