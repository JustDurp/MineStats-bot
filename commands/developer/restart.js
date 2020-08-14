const { MessageEmbed } = require("discord.js");
module.exports.run = async (bot, message, args, owner) => {

    const { MessageEmbed } = require("discord.js")

    if (!message.author.id == "281348487340359681") return;


    else {

        const restartEmbed = new MessageEmbed()
            .setTitle("Restarting..")
            .setColor("ORANGE")

        message.channel.send(restartEmbed).then(async (restart) => {

            await restart.delete({ timeout: 7500 })

            restartEmbed.setTitle("Restarted!")
            restartEmbed.setColor("GREEN")
            message.channel.send(restartEmbed).then(async (msg) => {

                bot.destroy();
                bot.login("NzQyODQ0OTA0NjY0ODU4NzM2.XzMCOg.dB6Cjzm9NRN9QttPWRS-UHOVXs0")


            })
        })
    }
}

module.exports.help = {
	name: "restart",
	aliases: [],
	description: "Restarts the bot",
	usage: "+restart",
	category: "developer",
};