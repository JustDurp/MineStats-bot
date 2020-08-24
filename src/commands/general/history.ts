/**
 * @file history.ts
 */

// Library
import { Message, MessageEmbed } from 'discord.js';
import ms from 'ms';
import { ExtendBot, HeadAvatar, UserHistory, UsernameToUUID, UTU, UUIDToUsername } from '../../modules/Api';
import { Command } from '../../modules/Command';
import { ErrorBuilder } from '../../modules/ErrorBuilder';

// History
class History extends Command {

    constructor(client: ExtendBot) {
        super(client, {
            name: `history`,
            category: `general`,
            description: `Get an overview of all past usernames`,
            aliases: ['h'],
            usage: '<username | UUID>'
        });
    }

    async run(message: Message, args: Array<string>): Promise<void> {

        let inputUser: string = args[0];
        if (!inputUser) return new ErrorBuilder(message, 'nouser').send();
        let typeCheck: unknown;
        if (inputUser.length <= 16) typeCheck = 'username';

        if (typeCheck === 'username') {

            UsernameToUUID(inputUser).then(async (info: any) => {

                let history: any = await UserHistory(info.id);
                let skin: any = await HeadAvatar(info.id);

                let mappedHistory = history.map((v: UTU) => {
                    return `**${v.name}** (${v.changedToAt ? ms(Date.now() - v.changedToAt) + ' ago' : 'first'})`;
                });

                let HistoryEmbed = new MessageEmbed()
                    .setColor(this.client.colors.primary)
                    .setThumbnail(skin)
                    .setTitle(`**${info.name}'s history**`)
                    .setDescription(mappedHistory.reverse().join(', '))
                    .setTimestamp()
                    .setFooter(this.client.user.username)

                message.channel.send(HistoryEmbed);

            }).catch((): void => {
                new ErrorBuilder(message, 'unknownuser').send();
            });

        } else {

            UUIDToUsername(inputUser).then(async (info: any) => {

                let history: any = await UserHistory(inputUser.toLowerCase());
                let skin: any = await HeadAvatar(inputUser.toLowerCase());

                let mappedHistory = history.map((v: UTU) => {
                    return `**${v.name}** (${v.changedToAt ? ms(Date.now() - v.changedToAt) + ' ago' : 'first'})`;
                }); 

                let HistoryEmbed = new MessageEmbed()
                    .setColor(this.client.colors.primary)
                    .setThumbnail(skin)
                    .setTitle(`**${info.name}'s history**`)
                    .setDescription(mappedHistory.reverse().join(', '))
                    .setTimestamp()
                    .setFooter(this.client.user.username)

                message.channel.send(HistoryEmbed);

            }).catch((): void =>{ 
                new ErrorBuilder(message, 'unknownuser').send();
            });

        }

    }

}

// Module Exports
module.exports = History;