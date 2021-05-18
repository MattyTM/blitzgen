const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");
const prefix = config.prefix;
var fs = require("fs");
var lineReader = require("line-reader");
var async = require("async");
const firstline = require("firstline");
const generated = new Set();
var os = require("os");

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', function (request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function () {
    console.log('App is running, server is listening on port ', app.get('port'));
});
bot.on("ready", () => {
    console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on("message", message => {
    if (message.channel.id === config.botChannel) { 
        if (message.author.bot) return;
        var command = message.content
            .toLowerCase()
            .slice(prefix.length)
            .split(" ")[0];

        if (command === "gen") {
            if (generated.has(message.author.id)) {
                message.channel.send(
                    "Esperá 1 minuto pa " +
                    message.author
                );
            } else {
                let messageArray = message.content.split(" ");
                let args = messageArray.slice(1);
                if (!args[0])
                    return message.reply("Pone STEAM bruto");
                var fs = require("fs");
                const filePath = __dirname + "/" + args[0] + ".txt";
                //if(args[0] != __dirname + "txt") return message.reply("Couldnt found: " + args[0] + " in our Database!")

                const embed = {
                    title: "Out of Stock!",
                    description: "No hay stock",
                    color: 0xff033d,
                    timestamp: new Date(),
                    footer: {
                        icon_url:
                            "https://cdn.discordapp.com/attachments/841452190501830673/844306880927236127/maxresdefault.jpg",
                        text: "Joaking#0069"
                    },
                    thumbnail: {
                        url:
                            "https://cdn.discordapp.com/attachments/841452190501830673/844306880927236127/maxresdefault.jpg"
                    },
                    author: {
                        name: "Blitz Gen",
                        url: "https://discord.gg/ND5YQBYMwf",
                        icon_url: bot.displayAvatarURL
                    },
                    fields: []
                };

                fs.readFile(filePath, function (err, data) {
                    if (!err) {
                        data = data.toString();
                        var position = data.toString().indexOf("\n");
                        var firstLine = data.split("\n")[0];
                        if(position == -1)
                        return message.channel.send({ embed });
                        message.author.send("**Datos de la cuenta (User:Pass)**\n"+firstLine);
                        if (position != -1) {
                            data = data.substr(position + 1);
                            fs.writeFile(filePath, data, function (err) {
                                const embed = {
                                    title: "Account Generated!",
                                    description: "Ahi te manda la cuenta al MD",
                                    color: 0xff033d,
                                    timestamp: new Date(),
                                    footer: {
                                        icon_url:
                                            "https://cdn.discordapp.com/attachments/841452190501830673/844306880927236127/maxresdefault.jpg",
                                        text: "Joaking#0069"
                                    },
                                    thumbnail: {
                                        url:
                                            "https://cdn.discordapp.com/attachments/841452190501830673/844306880927236127/maxresdefault.jpg"
                                    },
                                    author: {
                                        name: "Blitz Gen",
                                        url: "https://discord.gg/ND5YQBYMwf",
                                        icon_url: bot.displayAvatarURL
                                    },
                                    fields: []
                                };
                                message.channel.send({ embed });
                                generated.add(message.author.id);
                                setTimeout(() => {
                                    generated.delete(message.author.id);
                                }, 60000); // 86400000 = 24 H , 150000 = 15 Min
                                if (err) {
                                    console.log(err);
                                }
                            });
                        } else {
                            message.channel.send("Out of Stock!");
                        }
                    } else {
                        const embed = {
                            title: "Service Not found!",
                            description: "No hay cuentas de eso",
                            color: 0xff033d,
                            timestamp: new Date(),
                            footer: {
                                icon_url:
                                    "https://cdn.discordapp.com/attachments/841452190501830673/844306880927236127/maxresdefault.jpg",
                                text: "Joaking#0069"
                            },
                            thumbnail: {
                                url:
                                    "https://cdn.discordapp.com/attachments/841452190501830673/844306880927236127/maxresdefault.jpg"
                            },
                            author: {
                                name: "Blitz Gen",
                                url: "https://discord.gg/ND5YQBYMwf",
                                icon_url: bot.displayAvatarURL
                            },
                            fields: []
                        };
                        message.channel.send({ embed });
                        return;
                    }
                });
            }
        }
        else
            if (command === "stats") {
                const embed = {
                    title: "Stats",
                    description: `Total Users: ${bot.users.size}`,
                    color: 0xff033d,
                    timestamp: new Date(),
                    footer: {
                        icon_url:
                            "https://cdn.discordapp.com/attachments/841452190501830673/844306880927236127/maxresdefault.jpg",
                        text: "Joaking#0069"
                    },
                    thumbnail: {
                        url:
                            "https://cdn.discordapp.com/attachments/841452190501830673/844306880927236127/maxresdefault.jpg"
                    },
                    author: {
                        name: "Blitz Gen",
                        url: "https://discord.gg/ND5YQBYMwf",
                        icon_url: bot.displayAvatarURL
                    },
                    fields: []
                };
                message.channel.send({ embed });
            }
        
            if (command === "ayuda") {

                const embed = {
                    color: 0xff033d,
                    title: 'Blitz Gen',
                    url: 'https://discord.gg/ND5YQBYMwf',
                    author: {
                        name: 'Command list',
                        //icon_url: 'https://cdn.discordapp.com/attachments/841452190501830673/844306880927236127/maxresdefault.jpg',
                        url: 'https://discord.gg/ND5YQBYMwf',
                    },
                    description: '**This is a List of all Commands**',
                    thumbnail: {
                        url: 'https://cdn.discordapp.com/attachments/841452190501830673/844306880927236127/maxresdefault.jpg',
                    },
                    fields: [
                        {
                            name: 'Genera cuentas',
                            value: 'Usage: /gen NOMBRE',
                        },
                        {
                            name: 'Cuentas Disponibles',
                            value: 'STEAM | MAIL |',
                        },
                    ],
                    timestamp: new Date(),
                    footer: {
                        text: 'Joaking#0069',
                        icon_url: 'https://cdn.discordapp.com/attachments/841452190501830673/844306880927236127/maxresdefault.jpg',
                    },
                };
                message.channel.send({ embed });
            }

        if (command === "add") {
            if (!message.member.hasPermission("ADMINISTRATOR"))
                return message.reply("You dont have Permissions to do that!");
            var fs = require("fs");
            let messageArray = message.content.split(" ");
            let args = messageArray.slice(1);
            var account = args[0]
            var service = args[1]
            if(!account) return message.reply("Provide a Formated Account String first!")
            if(!service) return message.reply("Provide a Service first!")
            const filePath = __dirname + "/" + args[1] + ".txt";
            fs.appendFile(filePath, os.EOL + args[0], function (err) {
                if (err) return console.log(err);
                const embed = {
                    title: "Account added!",
                    description: "Successfully added Account to " + service + "!",
                    color: 0xff033d,
                    timestamp: new Date(),
                    footer: {
                        icon_url:
                            "https://cdn.discordapp.com/attachments/841452190501830673/844306880927236127/maxresdefault.jpg",
                        text: "Joaking#0069"
                    },
                    thumbnail: {
                        url:
                            "https://cdn.discordapp.com/attachments/841452190501830673/844306880927236127/maxresdefault.jpg"
                    },
                    author: {
                        name: "Blitz Gen",
                        url: "https://discord.gg/ND5YQBYMwf",
                        icon_url: bot.displayAvatarURL
                    },
                    fields: []
                };
                message.channel.send({ embed });
            });


        }
        if (command === "create") {
            if (!message.member.hasPermission("ADMINISTRATOR"))
                return message.reply("You dont have Permissions to do that!");
            var fs = require("fs");
            let messageArray = message.content.split(" ");
            let args = messageArray.slice(1);
            const filePath = __dirname + "/" + args[0] + ".txt";
            fs.writeFile(filePath, 'AraCore:AraCore', function (err) {
                if (err) throw err;
                const embed = {
                    title: "Created Service!",
                    description: "Successfully created Service " + args[0] + "!",
                    color: 0xff033d,
                    timestamp: new Date(),
                    footer: {
                        icon_url:
                            "https://cdn.discordapp.com/attachments/841452190501830673/844306880927236127/maxresdefault.jpg",
                        text: "Joaking#0069"
                    },
                    thumbnail: {
                        url:
                            "https://cdn.discordapp.com/attachments/841452190501830673/844306880927236127/maxresdefault.jpg"
                    },
                    author: {
                        name: "Blitz Gen",
                        url: "https://discord.gg/ND5YQBYMwf",
                        icon_url: bot.displayAvatarURL
                    },
                    fields: []
                };
                message.channel.send({ embed });
            });
        }
        if (command === "restock") {
            const embed = {
                title: "Provide Service!",
                description: "Please Provide the Name of the Restocked Service!",
                color: 0xff033d,
                timestamp: new Date(),
                footer: {
                    icon_url:
                        "https://cdn.discordapp.com/attachments/841452190501830673/844306880927236127/maxresdefault.jpg",
                    text: "Joaking#0069"
                },
                thumbnail: {
                    url:
                        "https://cdn.discordapp.com/attachments/841452190501830673/844306880927236127/maxresdefault.jpg"
                },
                author: {
                    name: "Blitz Gen",
                    url: "https://discord.gg/ND5YQBYMwf",
                    icon_url: bot.displayAvatarURL
                },
                fields: []
            };
            let messageArray = message.content.split(" ");
            let args = messageArray.slice(1);
            if (!message.member.hasPermission("ADMINISTRATOR"))
                return message.reply("You dont have Permissions to do that!");
            if (!args[0])
            {
                return message.channel.send({ embed });
            }
            else {
            message.channel.send("@everyone Service " + args[0] + " has been restocked by " + "<@" + message.author.id +">");
            }
        }
    }
});

bot.login(config.token);