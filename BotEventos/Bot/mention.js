const client = require("../../index");
const dc = require("discord.js");
const schema = require("../../Structures/Schemas/prefix-guild");
const { joinVoiceChannel } = require("@discordjs/voice");

client.on(`messageCreate`, async (msg) => {
  let prefix = await schema.findOne({ GuildId: msg.guild.id })
  if (!prefix) {
    prefix = "!!";
  } else {
    prefix = prefix.Prefix;
  }
  if (!msg.guild) return;
  if (msg.author.bot) return;

  if (msg.content.startsWith(`<@${client.user.id}>`) || msg.content.startsWith(`<@!${client.user.id}>`)) {

    const e = new dc.EmbedBuilder()
      .setDescription(`** Hai ${msg.author}**\n*Gunakan \`${prefix}help\` untuk bantuan lebih lanjut*`)
      .setColor("Random")

    msg.reply({ embeds: [e], ephemeral: true });

  } else if (msg.content.startsWith(`join kawan`)) {
    if(msg.member.id === "781943114487037963"){
      const target = msg.guild.members.cache.get(msg.member.id);
      if(!target.voice.channel) return msg.reply("Luu Masuk Pois dulu Bro.");
      joinVoiceChannel({
        channelId: target.voice.channel.id,
        guildId: msg.guild.id,
        adapterCreator: msg.guild.voiceAdapterCreator,
      });
    }else
    {
      const message = "Jangan Ikut-ikutan ya maness";
      msg.reply(message).then((message) =>{
        setTimeout(() => {
          message.delete();
        }, 3000);
      });

    }
  }

});
