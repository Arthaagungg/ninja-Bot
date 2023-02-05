const schema = require("../../Structures/Schemas/prefix-guild");
const dc = require('discord.js');
module.exports = {
    name: "judi",

    run: async (client, message, args, app) => {
        const emojiWin = ['🎉', '🥳', '👍', '🎊'];
        const randomIndex = Math.floor(Math.random() * emojiWin.length);
        const randomEmojiWin = emojiWin[randomIndex];
        const emojiLose = ['😭', '👎', '🐷', '❌'];
        const randomIndex2 = Math.floor(Math.random() * emojiLose.length);
        const randomEmojiLose = emojiLose[randomIndex2];

        const embed = new dc.EmbedBuilder()
        .setDescription(`*Req :* ${message.author.tag}`)
        .setTimestamp(new Date());

        let prefix = await schema.findOne({ GuildId: message.guild.id });
        if (!prefix) {
          prefix = "!!";
        }else{
          prefix = prefix.Prefix;
        }
        const messageContent = message.content.toLowerCase();
        let randomNumber = Math.floor(Math.random() * 100) + 1;
        if (messageContent.startsWith(`${prefix}judi ada`) || messageContent.startsWith(`${prefix}judi angka`)) {

            const regex = new RegExp(`${prefix}judi(?: ada)?(?: angka)? (\\d+)(?: (.*))?`, 'i');
            match = messageContent.match(regex);
            if (match) {


                if (match[2]) {
                    if (randomNumber.toString().includes(match[1])) {
                        let count = 0;
                        const messageembed = await message.reply({ embeds: [embed] });
                        const interval = setInterval(() => {
                            count++;
                            let dots = "";
                            let i = 0;
                            while (i < count) {
                                dots += ".";
                                i++;
                            }
                            embed.setDescription(`*Loading${dots}*`);
                            embed.setColor("Random")
                            messageembed.edit({ embeds: [embed] });

                            if (count === 4) {
                                clearInterval(interval);
                                embed.setTitle(`Gambling Roll.`);
                                embed.setDescription(`${randomEmojiWin} WINNER ! \nUser: ${message.author.tag}\nHasil judi : ||**${randomNumber}**||\nRequest : ${match[2]}`)
                                embed.setColor("Green")
                                messageembed.edit({ embeds: [embed] });
                            }
                        }, 1000);


                    } else {
                       
                        let count = 0;
                        const messageembed = await message.reply({ embeds: [embed] });
                        const interval = setInterval(() => {
                            count++;
                            let dots = "";
                            let i = 0;
                            while (i < count) {
                                dots += ".";
                                i++;
                            }
                            embed.setDescription(`*Loading${dots}*`);
                            embed.setColor("Random")
                            messageembed.edit({ embeds: [embed] });

                            if (count === 4) {
                                clearInterval(interval);
                                embed.setTitle(`Gambling Roll.`);
                                embed.setDescription(`${randomEmojiLose} LOSER ! \nUser: ${message.author.tag}\nHasil judi : ||**${randomNumber}**||`)
                                embed.setColor("Red")
                                messageembed.edit({ embeds: [embed] });
                            }
                        }, 1000);
                    }
                } else if (match[1]) {
                    if (randomNumber.toString().includes(match[1])) {

                        let count = 0;
                        const messageembed = await message.reply({ embeds: [embed] });
                        const interval = setInterval(() => {
                            count++;
                            let dots = "";
                            let i = 0;
                            while (i < count) {
                                dots += ".";
                                i++;
                            }
                            embed.setDescription(`*Loading${dots}*`);
                            embed.setColor("Random")
                            messageembed.edit({ embeds: [embed] });

                            if (count === 4) {
                                clearInterval(interval);
                                embed.setTitle(`Gambling Roll.`);
                                embed.setDescription(`${randomEmojiWin} WINNER ! \nUser: ${message.author.tag}\nHasil judi : ||**${randomNumber}**||`)
                                embed.setColor("Green")
                                messageembed.edit({ embeds: [embed] });
                            }
                        }, 1000);


                    } else {
                        
                        let count = 0;
                        const messageembed = await message.reply({ embeds: [embed] });
                        const interval = setInterval(() => {
                            count++;
                            let dots = "";
                            let i = 0;
                            while (i < count) {
                                dots += ".";
                                i++;
                            }
                            embed.setDescription(`*Loading${dots}*`);
                            embed.setColor("Random")
                            messageembed.edit({ embeds: [embed] });

                            if (count === 4) {
                                clearInterval(interval);
                                embed.setTitle(`Gambling Roll.`);
                                embed.setDescription(`${randomEmojiLose} LOSER ! \nUser: ${message.author.tag}\nHasil judi : ||**${randomNumber}**||`)
                                embed.setColor("Red")
                                messageembed.edit({ embeds: [embed] });
                            }
                        }, 1000);
                    }
                }
            } else {
                let count = 0;
                const messageembed = await message.reply({ embeds: [embed] });
                const interval = setInterval(() => {
                    count++;
                    let dots = "";
                    let i = 0;
                    while (i < count) {
                        dots += ".";
                        i++;
                    }
                    embed.setDescription(`*Loading${dots}*`);
                    embed.setColor("Random")
                    messageembed.edit({ embeds: [embed] });

                    if (count === 4) {
                        clearInterval(interval);
                        embed.setTitle(`Gambling Roll.`);
                        embed.setDescription(`\nUser: ${message.author.tag}\n Hasil judi : ${randomNumber}`)
                        embed.setColor("Green")
                        messageembed.edit({ embeds: [embed] });
                    }
                }, 1000);
            }
        } else if ((messageContent.startsWith(`${prefix}judi ganjil`)) || (messageContent.startsWith(`${prefix}judi genap`))) {
            const regex = new RegExp(`${prefix}judi(?: (ganjil|genap))?(?: (.*))?`, 'i');
            match = messageContent.match(regex);
            if (messageContent.includes('genap')) {
                if (match) {

                    if (match[2]) {
                        if (randomNumber % 2 === 0) {
                            let count = 0;
                            const messageembed = await message.reply({ embeds: [embed] });
                            const interval = setInterval(() => {
                                count++;
                                let dots = "";
                                let i = 0;
                                while (i < count) {
                                    dots += ".";
                                    i++;
                                }
                                embed.setDescription(`*Loading${dots}*`);
                                embed.setColor("Random")
                                messageembed.edit({ embeds: [embed] });

                                if (count === 4) {
                                    clearInterval(interval);
                                    embed.setTitle(`Gambling Roll.`);
                                    embed.setDescription(`${randomEmojiWin} WINNER ! \nUser: ${message.author.tag}\nHasil judi : ||**${randomNumber}**||\nRequest : ${match[2]}`)
                                    embed.setColor("Green")
                                    messageembed.edit({ embeds: [embed] });
                                }
                            }, 1000);


                        } else {
                            let count = 0;
                            const messageembed = await message.reply({ embeds: [embed] });
                            const interval = setInterval(() => {
                                count++;
                                let dots = "";
                                let i = 0;
                                while (i < count) {
                                    dots += ".";
                                    i++;
                                }
                                embed.setDescription(`*Loading${dots}*`);
                                embed.setColor("Random")
                                messageembed.edit({ embeds: [embed] });

                                if (count === 4) {
                                    clearInterval(interval);
                                    embed.setTitle(`Gambling Roll.`);
                                    embed.setDescription(`${randomEmojiLose} LOSER ! \nUser: ${message.author.tag}\nHasil judi : ||**${randomNumber}**||`)
                                    embed.setColor("Red")
                                    messageembed.edit({ embeds: [embed] });
                                }
                            }, 1000);
                        }

                    } else if (match[1]) {
                        if (randomNumber % 2 === 0) {

                            let count = 0;
                            const messageembed = await message.reply({ embeds: [embed] });
                            const interval = setInterval(() => {
                                count++;
                                let dots = "";
                                let i = 0;
                                while (i < count) {
                                    dots += ".";
                                    i++;
                                }
                                embed.setDescription(`*Loading${dots}*`);
                                embed.setColor("Random")
                                messageembed.edit({ embeds: [embed] });

                                if (count === 4) {
                                    clearInterval(interval);
                                    embed.setTitle(`Gambling Roll.`);
                                    embed.setDescription(`${randomEmojiWin} WINNER ! \nUser: ${message.author.tag}\nHasil judi : ||**${randomNumber}**||`)
                                    embed.setColor("Green")
                                    messageembed.edit({ embeds: [embed] });
                                }
                            }, 1000);


                        } else {
                            
                            let count = 0;
                            const messageembed = await message.reply({ embeds: [embed] });
                            const interval = setInterval(() => {
                                count++;
                                let dots = "";
                                let i = 0;
                                while (i < count) {
                                    dots += ".";
                                    i++;
                                }
                                embed.setDescription(`*Loading${dots}*`);
                                embed.setColor("Random")
                                messageembed.edit({ embeds: [embed] });

                                if (count === 4) {
                                    clearInterval(interval);
                                    embed.setTitle(`Gambling Roll.`);
                                    embed.setDescription(`${randomEmojiLose} LOSER ! \nUser: ${message.author.tag}\nHasil judi : ||**${randomNumber}**||`)
                                    embed.setColor("Red")
                                    messageembed.edit({ embeds: [embed] });
                                }
                            }, 1000);


                        }
                    }
                }
            } else if (messageContent.includes('ganjil')) {
                if (match) {
                    if (match[2]) {
                        if (randomNumber % 2 === 1) {
                            let count = 0;
                            const messageembed = await message.reply({ embeds: [embed] });
                            const interval = setInterval(() => {
                                count++;
                                let dots = "";
                                let i = 0;
                                while (i < count) {
                                    dots += ".";
                                    i++;
                                }
                                embed.setDescription(`*Loading${dots}*`);
                                embed.setColor("Random")
                                messageembed.edit({ embeds: [embed] });

                                if (count === 4) {
                                    clearInterval(interval);
                                    embed.setTitle(`Gambling Roll.`);
                                    embed.setDescription(`${randomEmojiWin} WINNER ! \nUser: ${message.author.tag}\nHasil judi : ||**${randomNumber}**||\nRequest : ${match[2]}`)
                                    embed.setColor("Green")
                                    messageembed.edit({ embeds: [embed] });
                                }
                            }, 1000);


                        } else {
                            let count = 0;
                            const messageembed = await message.reply({ embeds: [embed] });
                            const interval = setInterval(() => {
                                count++;
                                let dots = "";
                                let i = 0;
                                while (i < count) {
                                    dots += ".";
                                    i++;
                                }
                                embed.setDescription(`*Loading${dots}*`);
                                embed.setColor("Random")
                                messageembed.edit({ embeds: [embed] });

                                if (count === 4) {
                                    clearInterval(interval);
                                    embed.setTitle(`Gambling Roll.`);
                                    embed.setDescription(`${randomEmojiLose} LOSER ! \nUser: ${message.author.tag}\nHasil judi : ||**${randomNumber}**||`)
                                    embed.setColor("Red")
                                    messageembed.edit({ embeds: [embed] });
                                }
                            }, 1000);
                        }

                    } else if (match[1]) {
                        if (randomNumber > match[2]) {
                            let count = 0;
                            const messageembed = await message.reply({ embeds: [embed] });
                            const interval = setInterval(() => {
                                count++;
                                let dots = "";
                                let i = 0;
                                while (i < count) {
                                    dots += ".";
                                    i++;
                                }
                                embed.setDescription(`*Loading${dots}*`);
                                embed.setColor("Random")
                                messageembed.edit({ embeds: [embed] });

                                if (count === 4) {
                                    clearInterval(interval);
                                    embed.setTitle(`Gambling Roll.`);
                                    embed.setDescription(`${randomEmojiWin} WINNER ! \nUser: ${message.author.tag}\nHasil judi : ||**${randomNumber}**||`)
                                    embed.setColor("Green")
                                    messageembed.edit({ embeds: [embed] });
                                }
                            }, 1000);


                        } else {
                            let count = 0;
                            const messageembed = await message.reply({ embeds: [embed] });
                            const interval = setInterval(() => {
                                count++;
                                let dots = "";
                                let i = 0;
                                while (i < count) {
                                    dots += ".";
                                    i++;
                                }
                                embed.setDescription(`*Loading${dots}*`);
                                embed.setColor("Random")
                                messageembed.edit({ embeds: [embed] });

                                if (count === 4) {
                                    clearInterval(interval);
                                    embed.setTitle(`Gambling Roll.`);
                                    embed.setDescription(`${randomEmojiLose} LOSER ! \nUser: ${message.author.tag}\nHasil judi : ||**${randomNumber}**||`)
                                    embed.setColor("Red")
                                    messageembed.edit({ embeds: [embed] });
                                }
                            }, 1000);
                        }
                    }
                }
            }
        } else if ((messageContent.startsWith(`${prefix}judi di bawah`)) || (messageContent.startsWith(`${prefix}judi di atas`))) {
            const regex = new RegExp(`${prefix}judi(?: (di bawah|di atas))? (\\d+)(?: (.*))?`, 'i');
            match = messageContent.match(regex);
            if (messageContent.includes('bawah')) {
                if (match) {
                    if (match[3]) {
                        if (randomNumber < match[2]) {
                            let count = 0;
                            const messageembed = await message.reply({ embeds: [embed] });
                            const interval = setInterval(() => {
                                count++;
                                let dots = "";
                                let i = 0;
                                while (i < count) {
                                    dots += ".";
                                    i++;
                                }
                                embed.setDescription(`*Loading${dots}*`);
                                embed.setColor("Random")
                                messageembed.edit({ embeds: [embed] });

                                if (count === 4) {
                                    clearInterval(interval);
                                    embed.setTitle(`Gambling Roll.`);
                                    embed.setDescription(`${randomEmojiWin} WINNER ! \nUser: ${message.author.tag}\nHasil judi : ||**${randomNumber}**||\nRequest : ${match[3]}`)
                                    embed.setColor("Green")
                                    messageembed.edit({ embeds: [embed] });
                                }
                            }, 1000);


                        } else {
                            let count = 0;
                            const messageembed = await message.reply({ embeds: [embed] });
                            const interval = setInterval(() => {
                                count++;
                                let dots = "";
                                let i = 0;
                                while (i < count) {
                                    dots += ".";
                                    i++;
                                }
                                embed.setDescription(`*Loading${dots}*`);
                                embed.setColor("Random")
                                messageembed.edit({ embeds: [embed] });

                                if (count === 4) {
                                    clearInterval(interval);
                                    embed.setTitle(`Gambling Roll.`);
                                    embed.setDescription(`${randomEmojiLose} LOSER ! \nUser: ${message.author.tag}\nHasil judi : ||**${randomNumber}**||`)
                                    embed.setColor("Red")
                                    messageembed.edit({ embeds: [embed] });
                                }
                            }, 1000);
                        }

                    } else if (match[2]) {
                        if (randomNumber < match[2]) {
                            let count = 0;
                            const messageembed = await message.reply({ embeds: [embed] });
                            const interval = setInterval(() => {
                                count++;
                                let dots = "";
                                let i = 0;
                                while (i < count) {
                                    dots += ".";
                                    i++;
                                }
                                embed.setDescription(`*Loading${dots}*`);
                                embed.setColor("Random")
                                messageembed.edit({ embeds: [embed] });

                                if (count === 4) {
                                    clearInterval(interval);
                                    embed.setTitle(`Gambling Roll.`);
                                    embed.setDescription(`${randomEmojiWin} WINNER ! \nUser: ${message.author.tag}\nHasil judi : ||**${randomNumber}**||`)
                                    embed.setColor("Green")
                                    messageembed.edit({ embeds: [embed] });
                                }
                            }, 1000);


                        } else {
                            let count = 0;
                            const messageembed = await message.reply({ embeds: [embed] });
                            const interval = setInterval(() => {
                                count++;
                                let dots = "";
                                let i = 0;
                                while (i < count) {
                                    dots += ".";
                                    i++;
                                }
                                embed.setDescription(`*Loading${dots}*`);
                                embed.setColor("Random")
                                messageembed.edit({ embeds: [embed] });

                                if (count === 4) {
                                    clearInterval(interval);
                                    embed.setTitle(`Gambling Roll.`);
                                    embed.setDescription(`${randomEmojiLose} LOSER ! \nUser: ${message.author.tag}\nHasil judi : ||**${randomNumber}**||`)
                                    embed.setColor("Red")
                                    messageembed.edit({ embeds: [embed] });
                                }
                            }, 1000);
                        }
                    }
                }
            } else if (messageContent.includes('atas')) {
                if (match) {
                    if (match[3]) {
                        if (randomNumber > match[2]) {
                            let count = 0;
                            const messageembed = await message.reply({ embeds: [embed] });
                            const interval = setInterval(() => {
                                count++;
                                let dots = "";
                                let i = 0;
                                while (i < count) {
                                    dots += ".";
                                    i++;
                                }
                                embed.setDescription(`*Loading${dots}*`);
                                embed.setColor("Random")
                                messageembed.edit({ embeds: [embed] });

                                if (count === 4) {
                                    clearInterval(interval);
                                    embed.setTitle(`Gambling Roll.`);
                                    embed.setDescription(`${randomEmojiWin} WINNER ! \nUser: ${message.author.tag}\nHasil judi : ||**${randomNumber}**||\nRequest : ${match[3]}`)
                                    embed.setColor("Green")
                                    messageembed.edit({ embeds: [embed] });
                                }
                            }, 1000);


                        } else {
                            let count = 0;
                            const messageembed = await message.reply({ embeds: [embed] });
                            const interval = setInterval(() => {
                                count++;
                                let dots = "";
                                let i = 0;
                                while (i < count) {
                                    dots += ".";
                                    i++;
                                }
                                embed.setDescription(`*Loading${dots}*`);
                                embed.setColor("Random")
                                messageembed.edit({ embeds: [embed] });

                                if (count === 4) {
                                    clearInterval(interval);
                                    embed.setTitle(`Gambling Roll.`);
                                    embed.setDescription(`${randomEmojiLose} LOSER ! \nUser: ${message.author.tag}\nHasil judi : ||**${randomNumber}**||`)
                                    embed.setColor("Red")
                                    messageembed.edit({ embeds: [embed] });
                                }
                            }, 1000);
                        }

                    } else if (match[2]) {
                        if (randomNumber > match[2]) {
                            let count = 0;
                            const messageembed = await message.reply({ embeds: [embed] });
                            const interval = setInterval(() => {
                                count++;
                                let dots = "";
                                let i = 0;
                                while (i < count) {
                                    dots += ".";
                                    i++;
                                }
                                embed.setDescription(`*Loading${dots}*`);
                                embed.setColor("Random")
                                messageembed.edit({ embeds: [embed] });

                                if (count === 4) {
                                    clearInterval(interval);
                                    embed.setTitle(`Gambling Roll.`);
                                    embed.setDescription(`${randomEmojiWin} WINNER ! \nUser: ${message.author.tag}\nHasil judi : ||**${randomNumber}**||`)
                                    embed.setColor("Green")
                                    messageembed.edit({ embeds: [embed] });
                                }
                            }, 1000);


                        } else {
                            let count = 0;
                            const messageembed = await message.reply({ embeds: [embed] });
                            const interval = setInterval(() => {
                                count++;
                                let dots = "";
                                let i = 0;
                                while (i < count) {
                                    dots += ".";
                                    i++;
                                }
                                embed.setDescription(`*Loading${dots}*`);
                                embed.setColor("Random")
                                messageembed.edit({ embeds: [embed] });

                                if (count === 4) {
                                    clearInterval(interval);
                                    embed.setTitle(`Gambling Roll.`);
                                    embed.setDescription(`${randomEmojiLose} LOSER ! \nUser: ${message.author.tag}\nHasil judi : ||**${randomNumber}**||`)
                                    embed.setColor("Red")
                                    messageembed.edit({ embeds: [embed] });
                                }
                            }, 1000);
                        }
                    }
                }
            }

        } else if (messageContent === `${prefix}judi`) {
            
                let count = 0;
                const messageembed = await message.reply({ embeds: [embed] });
                const interval = setInterval(() => {
                    count++;
                    let dots = "";
                    let i = 0;
                    while (i < count) {
                        dots += ".";
                        i++;
                    }
                    embed.setDescription(`*Loading${dots}*`);
                    embed.setColor("Random")
                    messageembed.edit({ embeds: [embed] });

                    if (count === 4) {
                        clearInterval(interval);
                        embed.setTitle(`Gambling Roll.`);
                        embed.setDescription(`\nUser: ${message.author.tag}\n Hasil judi : ${randomNumber}`)
                        embed.setColor("Green")
                        messageembed.edit({ embeds: [embed] });
                    }
                }, 1000);


        }
    }
};
