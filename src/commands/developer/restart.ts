/**
 * @file restartts
 */

// Library
import { Message, MessageEmbed } from 'discord.js';
import { now } from 'moment';
import { ExtendBot } from '../../modules/Api';
import { Command } from '../../modules/Command';

// Restart
class Restart extends Command {

    constructor(client: ExtendBot) {
        super(client, {
            name: `restart`,
            category: `developer`,
            description: `Restart the Discord bot`
        });
    }

    async run(message: Message, args: Array<string>): Promise<void> {

        let closeEmbed = new MessageEmbed()
            .setColor(this.client.colors.pending)
            .setDescription(`**Pfffff I'm exhausted... I think Im going to take a nap!**`)
            .setTimestamp()
            .setFooter(this.client.user.username)

        message.channel.send(closeEmbed).then((m: Message) => {

            let t1: number = now();
            this.client.destroy();
            this.client.login(process.env.token);
            let t2: number = now();

            let startedClient = new MessageEmbed()
                .setColor(this.client.colors.success)
                .setDescription(`**Euhhh hey! I can't find my clothes man...**`)
                .setTimestamp()
                .setFooter(`Restarted in ${t2 - t1}ms`)

            m.edit(startedClient);

        });

        message.delete();

    }
    
}

// Module Exports
module.exports = Restart;
