/**
 * @file invite.ts
 */

// Library
import { Message, MessageEmbed } from 'discord.js';
import { ExtendBot } from '../../modules/Api';
import { Command } from '../../modules/Command';

// Invite
class Invite extends Command {

    constructor(client: ExtendBot) {
        super(client, {
            name: `invite`,
            description: `Invite MineStats Discord bot into your server!`,
            category: `general`
        });
    }

    async run(message: Message, args: Array<string>): Promise<void> {

        let inviteEmbed = new MessageEmbed()
            .setColor(this.client.colors.primary)
            .setDescription(`Niceee! Click **[here](https://discord.com/api/oauth2/authorize?client_id=742844904664858736&permissions=379969&scope=bot)** to invite the Minestats Discord bot in your server p.p`)
            .setTimestamp()
            .setFooter(`Already listening to ${this.client.guilds.cache.size} servers`)

        message.channel.send(inviteEmbed);

    }

}

// Module Exports
module.exports = Invite;