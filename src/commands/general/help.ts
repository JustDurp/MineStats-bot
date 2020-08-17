/**
 * @file help.ts
 */

// Library
import { Message, MessageEmbed } from 'discord.js';
import { join } from 'path';
import { ExtendBot } from '../../modules/Api';
import { Command } from '../../modules/Command';
import { SettingsHandler } from '../../modules/SettingsHandler';

// Help
class Help extends Command {

    constructor(client: ExtendBot) {
        super(client, {
            name: `help`,
            category: `general`,
            description: `Help incoming!`,
            usage: '(command)'
        });
    } 

    async run(message: Message, args: Array<string>): Promise<void> {

        if (args[0]) {
        
            let command = this.client.commands.find((a: any) => a.pull.name === args[0]);
            
            let commandEmbed = new MessageEmbed()
                .setColor(this.client.colors.primary)
                .setThumbnail(this.client.user.displayAvatarURL())
                .setTitle(`**Minestats help**`)
                .addFields([
                    { name: `**Command**`, value: command.pull.name, inline: true },
                    { name: `**Description**`, value: command.pull.description, inline: true },
                    { name: `**Category**`, value: command.pull.category, inline: true },
                    { name: `**Usage**`, value: `${command.pull.usage ? command.pull.usage : 'No usage provided'}`, inline: true },
                    { name: `**Permission**`, value: `${command.pull.permission ? command.pull.permission : 'No permission needed'}`, inline: true },
                    { name: `**Aliases**`, value: `${command.pull.aliases ? command.pull.aliases.join(', ') : 'No aliases'}`, inline: true }
                ])
                .setTimestamp()
                .setFooter(this.client.user.username)

            message.channel.send(commandEmbed);

            return;
        }

        let generalCat = this.client.commands.filter((a: any) => a.pull.category === 'general');
        let developerCat = this.client.commands.filter((a: any) => a.pull.category === 'developer');
        let adminCat = this.client.commands.filter((a: any) => a.pull.category === 'admin');
        
        let prefix: any = await new SettingsHandler(message.guild.id).getPrefix();

        let AllHelp = new MessageEmbed()
            .setColor(this.client.colors.primary)
            .setThumbnail(this.client.user.displayAvatarURL())
            .setTitle(`**MineStats help**`)
            .setDescription(`Euhh you asked for some help? My prefix is now **${prefix.value}**`)
            .addFields([
                { name: `**📘 General category**`, value: generalCat.map((a: any) => { return `\`${a.pull.name}\`` }).join(', '), inline: true },
                { name: `**🚧 Admin category**`, value: adminCat.map((a: any) => { return `\`${a.pull.name}\`` }).join(', '), inline: true },
                { name: `**💻 Developer category**`, value: developerCat.map((a: any) => { return `\`${a.pull.name}\`` }).join(', '), inline: true }
            ])
            .setTimestamp()
            .setFooter(this.client.user.username)

        message.channel.send(AllHelp);

    }

}

// Module Exports
module.exports = Help;