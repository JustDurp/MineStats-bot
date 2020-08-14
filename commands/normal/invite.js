module.exports.run = async (bot, message, args) => {

    const {MessageEmbed} = require("discord.js")

    let invite = "https://discord.com/api/oauth2/authorize?client_id=742844904664858736&permissions=64512&scope=bot"

    let embed = new MessageEmbed()
    .setTitle("Click here to invite the bot!")
    .setURL(invite)
    .setFooter(`Currently in ${bot.guilds.cache.size} servers`)
    .setTimestamp()

    message.channel.send(embed);

}
module.exports.help = {
    name: "invite",
    aliases: ["inv"],
    description: "Invite the bot to your own server!",
    usage: "invite",
    category: "normal",
};