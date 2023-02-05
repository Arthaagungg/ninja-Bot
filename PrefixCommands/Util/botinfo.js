const dc = require('discord.js')

module.exports = {
    name: "botinfo",
    aliases: ['bot'],

    run: async (client, message, args, app) => {{


        const botcor = message.guild.members.cache.get(client.user.id)
        const up = Math.floor(client.uptime / 60000) % 60;


         const e = new dc.EmbedBuilder()
            .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL()})
            .setTitle(`🤖 Botinfo`)
            .setDescription(`*Informasi Bot !*`)
            .setColor(botcor.displayHexColor)
            .addFields(
                {name: `Developer:`, value: `Abdul#5201`, inline: true},
                {name: `Nama:`, value: `${client.user.username}`, inline: true},
                {name: `Id:`, value: `${client.user.id}`, inline: true},
                {name: `Tanggal Pembuatan:`, value: `20/01/2023`, inline: true},
                {name: `Servers:`, value: `${client.guilds.cache.size}`, inline: true },
                {name: `Users:`, value: `${client.guilds.cache.size}`, inline: true },
                {name: `Channels:`, value: `${client.channels.cache.size}`, inline: true},
                {name: `Ping:`, value: `${client.ws.ping}ms Ping.`, inline: true },
                {name: `Ram:`, value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + 'MB'}`, inline: true},
                {name: `Uptime:`, value: `${up} Menit`, inline: true })
             .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
             .setFooter({text: `Copyright ©2023 - ${message.guild.name}`, iconURL: message.guild.iconURL() })
             .setTimestamp(new Date())

            message.reply({ embeds: [e], content: `${message.author}`})
            }
}};