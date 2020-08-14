module.exports.run = async (bot, message, args) => {

    const discord = require("discord.js");

    const leaveembed = new discord.MessageEmbed()
        .setDescription("Are you sure?\nClick 👍 if you want the bot to leave.\nClick 👎 if you want to cancel this event.")
    message.channel.send(leaveembed).then(async (msg) => {
        var emoji = await promptMessage(msg, message.author, 30, ["👍", "👎"]);

        if (emoji === "👍") {

            msg.delete();

            const newEmbed = new discord.MessageEmbed()
                .setDescription("The bot has left the server")
                .setFooter("MineStats Bot ©")
                .setTimestamp()
            message.channel.send(newEmbed);

            bot.guilds.cache.get(message.guild.id).leave();

        } if (emoji === "👎") {

            msg.delete()
            const newEmbed1 = new discord.MessageEmbed()
                .setDescription("Cancelled action.")
                .setFooter("MineStats Bot ©")
                .setTimestamp()

            message.channel.send(newEmbed1);
        }

        async function promptMessage(message, author, time, reactions) {

            time *= 100000;

            for (const reaction of reactions) {
                await message.react(reaction);
            }

            const filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;

            return message.awaitReactions(filter, { max: 1, time: time }).then(collected => collected.first() && collected.first().emoji.name);
        }
    })
}
module.exports.help = {
    name: "leave",
    aliases: [],
    description: "Edit settings for the bot",
    usage: "leave",
    category: "admin",
};

