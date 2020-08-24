/**
 * @file bot.ts
 */

// Library
import { Message, MessageEmbed } from 'discord.js';
import { ExtendBot } from '../../modules/Api';
import { Command } from '../../modules/Command';

// bot
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

        message.channel.send(new MessageEmbed()
            .setTitle("Bot Information")
            .setThumbnail(this.client.user.displayAvatarURL())
            .setColor("BLUE")
            .addFields(
                { name: `Github:`, value: `Click [here](https://github.com/JustDurp/MineStats-bot) to visit the Github repository`, inline: true },
                { name: `Authors:`, value: `HalloSouf#9342,\n vertx#0001,\n 𝕄𝕪𝕣𝔻𝕣𝕒𝕘𝕠𝕟#9912`, inline: true },
                { name: `Language:`, value: `TypeScript`, inline: true },
                { name: `Created at`, value: this.client.user.createdAt, inline: true }


            ))

    }

}

// Module Exports
module.exports = Bot;