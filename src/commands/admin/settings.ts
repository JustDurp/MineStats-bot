/**
 * @file settings.ts
 */

// Library
import { Message, MessageEmbed } from 'discord.js';
import { ExtendBot, SQLsettings } from '../../modules/Api';
import { Command } from '../../modules/Command';
import { ErrorBuilder } from '../../modules/ErrorBuilder';
import { SettingsHandler } from '../../modules/SettingsHandler';

// Settings
class Settings extends Command {

    constructor(client: ExtendBot) {
        super(client, {
            name: `settings`,
            category: `admin`,
            description: `Change some decent settings p.p`,
            aliases: ['setting', 'set'],
            permissions: 'MANAGE_GUILD',
            usage: '(setting) (new value)'
        });
    }

    async run(message: Message, args: Array<string>): Promise<void> {

        switch(args[0]) {

            case 'prefix':

                let newPrefix = args[1];
                if (!newPrefix) return new ErrorBuilder(message, 'noprefix').send();

                let pendingPrefix = new MessageEmbed()
                    .setColor(this.client.colors.pending)
                    .setDescription(`Updating prefix...`)
                    .setTimestamp()
                    .setFooter(this.client.user.username)
                
                let msg = await message.channel.send(pendingPrefix);

                try {

                    new SettingsHandler(message.guild.id).updatePrefix(newPrefix);

                    let updatedPrefix = new MessageEmbed()
                        .setColor(this.client.colors.success)
                        .setDescription(`Prefix has been updated to **${newPrefix}**`)
                        .setTimestamp()
                        .setFooter(this.client.user.username)

                    msg.edit(updatedPrefix);


                } catch (e) {   
                    new ErrorBuilder(message, 'failedprefix').send();
                    message.channel.send(`**Error:** \n\`\`\`${e}\`\`\``);
                }   

                break;

            default:

                let prefix: Array<SQLsettings> = await new SettingsHandler(message.guild.id).getPrefix();

                let settingsEmbed = new MessageEmbed()
                    .setColor(this.client.colors.primary)
                    .setThumbnail(message.guild.iconURL())
                    .setTitle(`**Minestats settings**`)
                    .addFields([
                        { name: `\u200b`, value: `**Prefix:**`, inline: true },
                        { name: `\u200b`, value: `${prefix[0].value}`, inline: true },
                        { name: `\u200b`, value: '`prefix`', inline: true }
                    ])
                    .setTimestamp()
                    .setFooter(this.client.user.username)

                message.channel.send(settingsEmbed);

        }

    }

}

// Module Exports
module.exports = Settings;