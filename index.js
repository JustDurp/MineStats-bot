const Discord = require("discord.js");

const { readFileSync, readdirSync, readdir } = require("fs");

const { success, error, warning } = require("log-symbols")

const Enmap = require("enmap")

const { Database } = require('sqlite3').verbose();

const chalk = require("chalk")

const bot = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
bot.commands = new Discord.Collection();
bot.login("NjcxMDc0MTIwNzY2NTg2OTAx.Xi3oeg.3lBZQwFjUutVFWaozGYMk6WlAIU")

readdirSync(`./events/`).forEach(file => {
    if (!file.endsWith('.js')) return;
    let event = require(`./events/${file}`);
    let eventName = file.split('.')[0];
    try {
        bot.on(eventName, event.bind(null, bot));
        console.log(chalk.redBright(`- Event | ${file} has been loaded!`));
    } catch (e) {
        console.log(e);
    }
});

["commands", "aliases"].forEach(x => bot[x] = new Discord.Collection());


const load = (dir = "./commands/") => {

    readdirSync(dir).forEach(dirs => {
        const commands = readdirSync(`${dir}${dirs}`).filter(files => files.endsWith(".js"));

        for (const file of commands) {
            const pull = require(`${dir}/${dirs}/${file}`);
            if (pull.help && typeof (pull.help.name) === "string" && typeof (pull.help.category) === "string") {
                if (bot.commands.get(pull.help.name)) return console.warn(`${warning} Two or more commands have the same name ${pull.help.name}.`);
                bot.commands.set(pull.help.name, pull);
                console.log(`${success} Loaded command ${pull.help.name}.`);

            }
            else {
                console.log(`${error} Error loading command in ${dir}${dirs}. you have a missing help.name or help.name is not a string. or you have a missing help.category or help.category is not a string`);
                continue;
            }
            if (pull.help.aliases && typeof (pull.help.aliases) === "object") {
                pull.help.aliases.forEach(alias => {
                    if (bot.aliases.get(alias)) return console.warn(`${warning} Two commands or more commands have the same aliases ${alias}`);
                    bot.aliases.set(alias, pull.help.name);

                });
            }
        }

    });
};

load()
let db = new Database('./storage/sqlite.db', (err) => {
    if (err) return console.log(err);
    console.log(`- Data | sqlite has been loaded!`);

    module.exports.db = db

});

const footer = "MineStats Bot ©";
module.exports.footer = footer

const noPerms = new Discord.MessageEmbed()
    .setDescription("🚫 You don't have permission to execute this command!")
    .setColor("RED")

    module.exports.noPerms = noPerms;

const noArgs = new Discord.MessageEmbed()
    .setDescription("🚫 Please give up an user")
    .setColor("ORANGE")

    module.exports.noArgs = noArgs;