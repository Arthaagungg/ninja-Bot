const dc = require('discord.js');
module.exports = {
  name: "ping",
  aliases: ['p'],

  run: async (client, message, args, app) => {

  const e = new dc.EmbedBuilder()
  .setTitle(`🌐 Ping`)
  .setDescription(`Ping Saat Ini: \`${client.ws.ping}\` ms\nWaktu: <t:${parseInt((Date.now() - client.uptime) / 1000)}:R>`)
  .setColor(app.bot.color)
  .setThumbnail(message.guild.iconURL({ dynamic: true }))
  .setFooter({text: `Copyright ©2023 - ${message.guild.name}`, iconURL: message.guild.iconURL() })
  .setTimestamp(new Date())

  message.reply({ embeds: [e] });
}};