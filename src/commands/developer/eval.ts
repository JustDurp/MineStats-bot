/**
 * @file eval.ts
 */

// Library
import { Message, MessageEmbed } from 'discord.js';
import { ExtendBot, CleanText } from '../../modules/Api';
import { Command } from '../../modules/Command';
import { ErrorBuilder } from '../../modules/ErrorBuilder';
import { now } from 'moment';

// Eval
class Eval extends Command {

    constructor(client: ExtendBot) {
        super(client, {
            name: `eval`,
            description: `Evaluate some juicy code`,
            category: `developer`,
            aliases: ['evaluate'],
            usage: '<code>'
        });
    }

    async run(message: Message, args: Array<string>): Promise<void> {

        let code: string = args.join(' ');
        if (!code) return new ErrorBuilder(message, 'nocode').send();

        try {
            
            let t1: number = now();
            let evaluated = eval(code);
            if (code.includes('process.env')) evaluated = 'Lmao wtf? Do you think am so stupid...'
            let t2: number= now();

            let evalEmbed = new MessageEmbed()
                .setColor(this.client.colors.success)
                .setThumbnail(this.client.user.displayAvatarURL())
                .addFields([
                    { name: `**Evaluate from**`, value: `\`\`\`${code}\`\`\`` },
                    { name: `**Evaluated in ${t2 - t1}ms**`, value: `\`\`\`${CleanText(evaluated)}\`\`\`` }
                ])
                .setTimestamp()
                .setFooter(this.client.user.username)

            message.channel.send(evalEmbed);

        } catch (e) {

            let failedEval = new MessageEmbed()
                .setColor(this.client.colors.fail)
                .setThumbnail(this.client.user.displayAvatarURL())  
                .addFields([
                    { name: `**Evaluate from**`, value: `\`\`\`${code}\`\`\`` },
                    { name: `**Error**`, value: `\`\`\`${CleanText(e)}\`\`\`` }
                ])
                .setTimestamp()
                .setFooter(this.client.user.username)

            message.channel.send(failedEval);

        }

    }

}

// Module Exports
module.exports = Eval;