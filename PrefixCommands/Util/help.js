const { EmbedBuilder } = require("discord.js");
const fs = require('fs');
const schema = require("../../Structures/Schemas/prefix-guild");
module.exports = {
    name: "help",
    aliases: ['h'],
  
  run: async (client, message, args) => {
    let prefix = await schema.findOne({ GuildId: message.guild.id });
    if (!prefix) {
      prefix = "!!";
    }else{
      prefix = prefix.Prefix;
    }
    const commands = client.commands.map(command => `${prefix}${command.name}`);

    return message.reply(
      {
        embeds: [
          new EmbedBuilder()
            .setAuthor(
              {
                name: client.user.tag,
                iconURL: client.user.displayAvatarURL(
                  {
                    dynamic: true
                  }
                )
              }
            )
            .setDescription(commands.join(', '))
            .setFooter(
              {
                text: `→ Use ${prefix}help for a command info.`
              }
            )
            .setColor('Blue')
        ]
      }
    );

  },
};