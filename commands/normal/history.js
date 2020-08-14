module.exports.run = async (bot, message, args) => {

    const {success} = require("log-symbols");
    const { MessageEmbed } = require("discord.js");
    const { UsernameToUUID } = require('minestats');
    const fetch = require('node-fetch');
    const { footer, noArgs } = require("../../index")
    const ms = require('ms');
    if (!args[0]) return message.channel.send(noArgs)


    UsernameToUUID(args[0]).then((info) => {

        fetch(`https://api.mojang.com/user/profiles/${info.id}/names`)
            .then(res => res.json())
            .then(json => {

            const haakjes = "``" 
            const mapNames = json.map(v => v.name);
            const mapDates = json.map(v => {
                return `${v.changedToAt ? ms(Date.now() - v.changedToAt) + ' ago' : 'First'}`;
            });
        
//${names.join('\n')}
                    let embed = new MessageEmbed()
                        .setTitle(`Name History ${info.name}`)
                        .addField(`**Names (${mapDates.length})**`, haakjes + mapNames.join("\n") + haakjes, true)
                        .setColor("GREEN")
                        .addField(`**Days**`, `${mapDates.join('\n')}`, true)
                        .setFooter(footer)
                        .setTimestamp()

                    message.channel.send(embed);
                });

            }).catch(err => {

                console.log(noArgs);

    });
}

module.exports.help = {
    name: "history",
    aliases: ["playerhistory", "h"],
    description: "Userinfo for minecraft players",
    usage: "history <player>",
    category: "normal",
};