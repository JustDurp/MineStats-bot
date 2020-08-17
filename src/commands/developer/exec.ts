import { exec } from 'child_process';
/**
 * @file exec.ts
 */

// Library
import { Message, MessageEmbed } from 'discord.js';
import { now } from 'moment';
import { CleanText, ExtendBot } from '../../modules/Api';
import { Command } from '../../modules/Command';
import { ErrorBuilder } from '../../modules/ErrorBuilder';

// Exec
class Exec extends Command {

    constructor(client: ExtendBot) {
        super(client, {
            name: `exec`,
            description: `Execute a server command`,
            category: `developer`,
            aliases: ['execute'],
            usage: '<code>'
        });
    }

    async run(message: Message, args: Array<string>): Promise<void> {

        let code: string = args.join(' ');
        if (!code) return new ErrorBuilder(message, 'nocode').send();

        let t1: number = now();
        exec(code, (error: Error, stdout: string, stderr: string) => {
            let t2: number = now();
            if (error) {
                let failedEexec = new MessageEmbed()
                    .setColor(this.client.colors.fail)
                    .setThumbnail(this.client.user.displayAvatarURL())
                    .addFields([
                        {
                            name: `**Executing**`,
                            value: `\`\`\`${code}\`\`\``
                        },
                        {
                            name: `**Error**`,
                            value: `\`\`\`${CleanText(stderr)}\`\`\``
                        }
                    ])
                    .setTimestamp()
                    .setFooter(this.client.user.username)

                message.channel.send(failedEexec);            
            } else {
                if (stdout.length  > 1300) stdout = stdout.substr(stdout.length - 1299, stdout.length);
                let execEmbed = new MessageEmbed()
                    .setColor(this.client.colors.success)
                    .setThumbnail(this.client.user.displayAvatarURL())
                    .addFields([
                        {
                            name: `**Executing**`,
                            value: `\`\`\`${code}\`\`\``
                        },
                        {
                            name: `**Executed in ${t2 - t1}ms**`,
                            value: `\`\`\`${CleanText(stdout)}\`\`\``
                        }
                    ])
                    .setTimestamp()
                    .setFooter(this.client.user.username)

                message.channel.send(execEmbed);
            }
        });

        message.delete();
        
    }

}

// Module Exports
module.exports = Exec;