/**
 * @file ping.ts
 */

// Library
import { Message, MessageEmbed } from 'discord.js';
import { ExtendBot } from '../../modules/Api';
import { Command } from '../../modules/Command';

// Ping
class Ping extends Command {

    constructor(client: ExtendBot) {
        super(client, {
            name: `ping`,
            description: `Pong!`,
            category: `general`
        });
    }

    async run(message: Message, args: Array<string>): Promise<void> {

        let pendingEmbed = new MessageEmbed()
            .setColor(this.client.colors.pending)
            .setDescription(`🏓 Pinging...`)
            .setTimestamp()
            .setFooter(this.client.user.username)

        let msg: Message = await message.channel.send(pendingEmbed);

        let embed = new MessageEmbed()
            .setColor(this.client.colors.primary)
            .addField(`**Pong!**`, `🌍 Roundtrip took **${msg.createdTimestamp - message.createdTimestamp}ms** while my heartbeat ❤ is **${this.client.ws.ping}**ms`)
            .setTimestamp()
            .setFooter(this.client.user.username)

        msg.edit(embed);

    }

}

// Module Exports
module.exports = Ping;