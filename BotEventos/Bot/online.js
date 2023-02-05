const client = require("../../index");
const dc = require('discord.js');
const chalk = require('chalk');
const os = require('os');

client.on(`ready`, async() => {

  //Atividade & Status.
	const atividade = [
	{name: `Lagi Main mobile lejend sama poke-poke`, type: 0}, 
	{name: `Created by Abdul#5201`, type: 3},
	{name: `Sedang Menggalau`, type: 2}];
	const status = [`dnd`, `dnd`, `dnd`]; 

	let random1 = 0;

	setInterval(() => {
		if(random1 >= atividade.length) random1 = 0

		client.user.setActivity(atividade[random1])

		random1++ }, 10000) //Tempo em MS

	let random2 = 0;

	setInterval(() => {
		if(random2 >= atividade.length) random2 = 0

		client.user.setStatus(status[random2])

		random2++ }, 25000) //tempo em MS

    //Bot online.

	console.log(os.totalmem());
	console.log(os.freemem());
	console.log(os.cpus().length);
    console.log(chalk.hex(`#07ff03`).bold(`(Bot) > Bot Terhubung ke ${client.user.tag}.`))
    console.log(chalk.hex(`#0c02cc`).bold(`(Bot Status)\n> ${client.guilds.cache.size} Server.\n> ${client.channels.cache.size} Saluran.\n> ${client.users.cache.size} Members.`))

});