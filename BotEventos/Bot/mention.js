const client = require("../../index");
const dc = require("discord.js");
const schema = require("../../Structures/Schemas/prefix-guild");

client.on(`messageCreate`, async(msg) => {
let prefix = await schema.findOne({GuildId: msg.guild.id})
if (!prefix) {
  prefix = "!!";
}else{
  prefix = prefix.Prefix;
}
  if(!msg.guild) return;
  if(msg.author.bot) return;
  
  if(msg.content.startsWith(`<@${client.user.id}>`) || msg.content.startsWith(`<@!${client.user.id}>`)) {

  const e = new dc.EmbedBuilder()
  .setDescription(`** Hai ${msg.author}**\n*Gunakan \`${prefix}help\` untuk bantuan lebih lanjut*`)
  .setColor("Random")

   msg.reply({ embeds: [e] })

}

});
