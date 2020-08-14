module.exports.run = async (bot, message, args) => {

    const { MessageEmbed } = require("discord.js")
    const { ServerStats } = require("minestats")
    const { footer, noArgs } = require("../../index.js")

    noArgs.setDescription("Give up a valid server.")

    if (!args[0]) return message.channel.send(noArgs)

    ServerStats(args[0]).then(info => {

        const embed = new MessageEmbed()
            .setTitle(`${args[0]} Server Stats`)
            .setColor("RANDOM")
            .addField(`MOTD `, info.motd)
            .addField("Players ", `${info.players.now}/${info.players.max}`)
            .addField("Version", info.server.name)
            .setFooter(footer)
            .setTimestamp();

        message.channel.send(embed);



    }).catch(err => {
        message.channel.send(noArgs);
    })
}

module.exports.help = {
    name: "serverinfo",
    aliases: ["server", "serveri"],
    description: "Shows the info of the server",
    usage: "serverinfo <ip>",
    category: "normal",
};
