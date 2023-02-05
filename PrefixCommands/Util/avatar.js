const dc = require("discord.js");

module.exports = {
    name: "avatar",
    aliases: ['av'],
  
    run: async (client, message, args, app) => {

      const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

      const avatar = user.displayAvatarURL({ dynamic: true, format: "png", size: 4096 })

      const buttonav = new dc.ButtonBuilder()
      .setEmoji("🌐")
      .setLabel("Link")
      .setStyle(5)
      .setURL(avatar);

     const b = new dc.ActionRowBuilder().addComponents(buttonav);

      const e = new dc.EmbedBuilder()
      .setTitle(`🖼 Avatar`)
      .setDescription(`${user.username}`)
      .setColor(app.bot.color)
      .setImage(avatar)
      .setFooter({text: `Command : ${message.author.username}#${message.author.discriminator}`})

      message.reply({ embeds: [e], components: [b] })
      
}};