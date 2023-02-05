const client = require("../../index");
const dc = require("discord.js");
const app = require('../../app.json');

client.on(`interactionCreate`, async(interaction) =>{
  if(!interaction.member.permissions.has(dc.PermissionsBitField.Flags.Administrator)) return interaction.reply({ content: `Tidak ada akses untuk menggunakan command ini.`, ephemeral: true})
  const Scomando = client.slashCommands.get(interaction.commandName);

  if (interaction.type === 4) {
    if(Scomando.autocomplete) {
      const choices = [];
      await Scomando.autocomplete(interaction, choices)
    }
  }

  if (!interaction.type === 2) return;

  if(interaction.channel.type === 1) return interaction.reply({ content: `${app.emoji.nao} Perintah saya tidak berfungsi di server.`, ephemeral: true})

  if(!Scomando) return client.slashCommands.delete(interaction.commandName);

  try {
    
    interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);
    
      Scomando.run(client, interaction, app);

} catch(e) {

  const e1 = new dc.EmbedBuilder()
    .setDescription(`${app.emoji.nao} Tidak dapat menjalankan perintah ini.`)
    .setColor(app.bot.color)

    interaction.reply({ embeds: [e1] })

}

});