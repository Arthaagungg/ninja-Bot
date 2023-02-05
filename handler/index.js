const fs = require("fs");
const app = require('../app.json');
const chalk = require('chalk');

module.exports = async (client) => {

//Puxando os comandos em slash!
const ArgsScommands = [];

fs.readdir(`././SlashCommands/`, (err, fol) => {

fol.forEach(subfol => {

fs.readdir(`././SlashCommands/${subfol}/`, (er, files) => {

files.forEach(command => {  

if(!command?.endsWith('.js')) return;

command = require(`../SlashCommands/${subfol}/${command}`);

if(!command?.name) return;

client.slashCommands.set(command?.name, command);

  ArgsScommands.push(command)

})

})

})

});

//Carregando os slash.
client.on("ready", async() => {

  //Carregando em 1 servidor.
  if(app.slash.guild_id) {

    var server = client.guilds.cache.get(app.slash.guild_id);

    if(!server) {console.log(chalk.red(`(Slash) > Servidor de carregamento inválido.`));
    process.exit();}

    try {

    server.commands.set(ArgsScommands);

    console.log(chalk.hex(`#78807f`).bold(`(Slash) > Perintah-perintah dimuat ke ${server.name}.`))
    } catch(e) {
      console.log(chalk.hex(`#c72230`).bold(`(Slash) > Tidak dapat memuat perintah di ${server.name}.`));
      process.exit();
    }
  
  } else {
  //Carregando no global.

    try {

    client.application.commands.set(ArgsScommands);

    console.log(chalk.hex(`#78807f`).bold(`(Slash) > Perintah dimuat secara global.`))
    } catch(e) {
      console.log(chalk.hex(`#c72230`).bold(`(Slash) > Tidak dapat memuat perintah secara global.`));
      process.exit();
    }

  }

});

//Carregando prefixo.
fs.readdirSync('././PrefixCommands/').forEach(subfol => {
  const comandos = fs.readdirSync(`././PrefixCommands/${subfol}`).filter(arqv => arqv.endsWith(`.js`))

  for(let command of comandos) {
      let puxar = require(`../PrefixCommands/${subfol}/${command}`)

      if(puxar.name) {
          client.commands.set(puxar.name, puxar)
      }

      if(puxar.aliases && Array.isArray(puxar.aliases))

      puxar.aliases.forEach(ali => client.aliases.set(ali, puxar.name))
  }

});

//Carregando os eventos.
fs.readdir(`././BotEventos/`, (err, fol) => {

fol.forEach(subfol => {

fs.readdir(`././BotEventos/${subfol}/`, (er, files) => {

  files.forEach(evnt =>{

  if(!evnt.endsWith('.js')) return;
  
  const e = require(`../BotEventos/${subfol}/${evnt}`);

  if (e.once) {
    client.once(e.name, (...args) => 
    e.execute(client, ...args))
  } else {
    client.on(e.name, (...args) =>
      e.execute(client, ...args))
  }

})

})

})

  console.log(chalk.hex(`#17750b`).bold(`(Eventos) > Eventos carregados.`))
  
});

}
