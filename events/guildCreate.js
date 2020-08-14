
const { discord }  = require("discord.js")

module.exports = (bot, guild) => {

    console.log(`- Bot | Has joined a server`)

    const { db } = require("../index.js")

    db.run(`INSERT INTO settings(serverid, setting, value) VALUES('${guild.id}', 'prefix', '!')`, (err, row) => {
        if (err) return console.log(err);
    });

}