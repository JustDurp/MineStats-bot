
const { discord }  = require("discord.js")

module.exports = (bot, guild) => {

    console.log(`- Bot | Has left a server`)

    const { db } = require("../index.js")

    db.run(`DELETE FROM settings WHERE serverid = '${guild.id}'`, (err, row) => {
        if (err) return console.log(err)
  })

}