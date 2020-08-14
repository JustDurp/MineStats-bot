module.exports = (bot, guild) => {

    setInterval(() => {

        bot.user.setActivity(`MineStats | ${bot.guilds.cache.size} guilds`)

    }, 10000);


    console.log(`- Online | ${bot.user.username}\n- Guilds | ${bot.guilds.cache.size}`);



}
