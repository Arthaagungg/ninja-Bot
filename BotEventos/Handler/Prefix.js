const client = require("../../index");
const dc = require("discord.js");
const app = require('../../app.json');
const schema = require("../../Structures/Schemas/prefix-guild");

client.on(`messageCreate`, async (message) => { 

    if(!message.guild) return;
    if(message.author.bot) return;

    let prefix = await schema.findOne({GuildId: message.guild.id})
    if (!prefix) {
      prefix = "!!";
    }else{
      prefix = prefix.Prefix;
    }

    if(message.author.bot) return;
    if(message.channel.type === 1) return;
    if(!message.content.startsWith(prefix)) return;
    if(!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;
    if(message.content === prefix) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
  
    let cmd = args.shift().toLowerCase()

    if(cmd.length === 0) return;

    let Pcomando = client.commands.get(cmd)

    if(!Pcomando) Pcomando = client.commands.get(client.aliases.get(cmd)) 
    
  try {

      Pcomando.run(client, message, args, app);

  } catch (e) { 
  }

});
