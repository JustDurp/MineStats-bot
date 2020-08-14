module.exports = async (bot, message) => {

    const { db } = require("../index.js")

    db.get(`SELECT * FROM settings WHERE serverid = '${message.guild.id}' AND setting = 'prefix'`, (err, row) => {
        if (err) return console.log(err);
        
        
        const prefix = row.value;
        module.exports.prefix = prefix;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();

	let command;

	if (message.author.bot || !message.guild) return;


	if (!message.member) message.member = message.guild.fetchMember(message.author);

	if (!message.content.startsWith(prefix)) return;

	if (cmd.length === 0) return;
	if (bot.commands.has(cmd)) command = bot.commands.get(cmd);
	else if (bot.aliases.has(cmd)) command = bot.commands.get(bot.aliases.get(cmd));

    if (command) command.run(bot, message, args);
    });
}

