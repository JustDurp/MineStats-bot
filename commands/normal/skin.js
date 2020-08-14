module.exports.run = async (bot, message, args) => {

    const { MessageEmbed, DiscordAPIError } = require("discord.js");
    const { SkinRendered, UsernameToUUID } = require("minestats");
    const { footer, noArgs } = require("../../index.js")
    const fetch = require("node-fetch")


    if (!args[0]) return message.channel.send(noArgs);


    UsernameToUUID(args[0]).then(info => {


        SkinRendered(info.id).then(async (skin) => {

            const embed = new MessageEmbed()
                .setTitle(`Skin ${info.name}`)
                .setImage(skin)
                .setFooter(footer)
                .setTimestamp();

            message.channel.send(embed)

        })

    }).catch(err => {
        console.log(noArgs);
    })

}


module.exports.help = {
    name: "skin",
    aliases: ["s", "user"],
    description: "Edit settings for the bot",
    usage: "skin <player>",
    category: "normal",
};