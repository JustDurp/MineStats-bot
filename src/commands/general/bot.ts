/**
 * @file bot.ts
 */

// Library
import { Message, MessageEmbed } from 'discord.js';
import { ExtendBot } from '../../modules/Api';
import { Command } from '../../modules/Command';
import moment from 'moment';
const config = require('../../config/config.json');

// Bot
class Bot extends Command {

    constructor(client: ExtendBot) {
        super(client, {
            name: `bot`,
            description: `Shows some information of the bot.`,
            category: `general`,
            aliases: ['botinfo']
        });
    }

    async run(message: Message, args: Array<string>): Promise<void> {

        let developers: Array<string> = [];
        for (let a: number = 0; a < config.developers.length; a++) {
            developers.push(this.client.users.cache.get(config.developers[a]).tag);
        }

        let botEmbed = new MessageEmbed()
            .setColor(this.client.colors.primary)
            .setThumbnail(this.client.user.displayAvatarURL())
            .addFields([
                { name: `**Github repository**`, value: `Click [here](https://github.com/JustDurp/MineStats-bot)`, inline: true },
                { name: `**Library**`, value: `discord.js`, inline: true },
                { name: `**NodeJS**`, value: process.version, inline: true },
                { name: `**Created at**`, value: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'), inline: true },
                { name: `**Authors**`, value: developers.join(', '), inline: true },
            ])
            .setTimestamp()
            .setFooter(this.client.user.tag)

        message.channel.send(botEmbed);

    }

}

// Module Exports
module.exports = Bot;