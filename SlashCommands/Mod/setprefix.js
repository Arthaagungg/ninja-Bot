const dc = require('discord.js');
const schema = require("../../Structures/Schemas/prefix-guild");

module.exports = {
  name: "setprefix",
  description: "Setting Prefix Server.",
  type: 1,
  options: [{name: 'prefix', type: 3, description: 'Input Prefix', required: true}],
  

  run: async (client, interaction) => {
    const prefix = interaction.options.getString('prefix');

    const e1 = new dc.EmbedBuilder()
    .setDescription(`❌ Prefix terlalu panjang, maksimal \`5\` karakter.`)
    .setColor("Random")

    if(prefix.length > 5) return interaction.reply({ embeds: [e1] });

    const e2 = new dc.EmbedBuilder()
    .setTitle(`🔧 Setprefix`)
    .setDescription(`✔ Berhasil Merubah Prefix Menjai \`${prefix}\``)
    .setColor("Random")


    try {        
        schema.findOne({GuildId: interaction.guild.id}, async (err, data) => {
            if(!data) {
                const newVerif = await schema.create({
                    GuildId: interaction.guild.id,
                    Prefix: prefix
                });
                
        interaction.reply({ embeds: [e2] });
            }else{
                const newVerif = await schema.findOneAndUpdate({
                    GuildId: interaction.guild.id,
                    Prefix: prefix
                });
                interaction.reply({ embeds: [e2] });                
            }
            
        })

    } catch(err) {

        console.log(err)

        const e3 = new dc.EmbedBuilder()
        .setDescription(`❌ Tidak dapat menyimpan prefix ini, harap coba lagi.`)
        .setColor("Random")

        interaction.reply({ embeds: [e3] });
    }

}};