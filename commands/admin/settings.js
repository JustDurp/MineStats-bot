const discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
    const { db } = require("../../index.js")
    if (!message.member.hasPermission('MANAGE_SERVER')) return message.channel.send("You don't have permissions to use this command!")
    db.get(`SELECT * FROM settings WHERE serverid = '${message.guild.id}' AND setting = 'prefix'`, (err, row) => {
        if (err) return console.log(err);
        var prefix1 = row.value;
        if (!args[0]) return message.channel.send(`${prefix1}settings <setprefix>`)
        if (args[0] == "setprefix" || (args[0] == "prefix" || args[0] == "p")) {
            if (!args[1]) return message.channel.send(`${prefix1}settings ${args[0]} <prefix>`);
            if (args[1]) {
                var prefix2 = args[1]
                message.channel.send(`The prefix has been changed to ${prefix2}`)
                db.run(`UPDATE settings SET value = '${prefix2}' WHERE serverid = '${message.guild.id}' AND setting = 'prefix'`, (err, row) => {
                    if (err) {
                        console.log(err)
                        message.channel.send(`Something went wrong`)
                    }
                })
            }
        }
    })


}
module.exports.help = {
    name: "settings",
    aliases: [],
    description: "Edit settings for the bot",
    usage: "",
    category: "admin",
};

