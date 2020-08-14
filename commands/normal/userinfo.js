module.exports.run = async (bot, message, args) => {

    const { MessageEmbed } = require("discord.js");
    const { UsernameToUUID } = require('minestats');
    const fetch = require('node-fetch');
    const {noPerms, footer, noArgs} = require("../../index")

    if (!args[0]) return message.channel.send(noArgs)

    UsernameToUUID(args[0]).then(info => {



        let userInfo = new MessageEmbed()
            .setTitle(`User Information ${args[0]}`)
            .setColor("ORANGE")
            .setDescription(`**Username:** ${args[0]}\n**UUID**: ${info.id}`)
            .setFooter(bot.user.username + " ©")
            .setTimestamp()
        message.channel.send(userInfo)


    }).catch(err => {
        message.channel.send(noArgs);
    })

}
module.exports.help = {
    name: "userinfo",
    aliases: ["uuid", "playerinfo"],
    description: "Userinfo for minecraft players",
    usage: "userinfo <player>",
    category: "normal",
};