/**
 * @file userinfo.ts
 */

// Library
import { Message, MessageEmbed } from 'discord.js';
import { ExtendBot, HeadAvatar, UsernameToUUID, UUIDToUsername } from '../../modules/Api';
import { Command } from '../../modules/Command';
import ms from 'ms';
import { ErrorBuilder } from '../../modules/ErrorBuilder';

// Userinfo
class Userinfo extends Command {

    constructor(client: ExtendBot) {
        super(client, {
            name: `userinfo`,
            category: `general`,
            description: `Displays some juicy Minecraft userinfo`,
            aliases: [`ui`, `playerinfo`, `pi`],
            usage: `<username | UUID>`
        });      
    }

    async run(message: Message, args: Array<string>): Promise<void> {

        let inputUser: string = args[0];
        if (!inputUser) return new ErrorBuilder(message, 'nouser').send();
        let typeCheck: unknown;
        if (inputUser.length <= 16) typeCheck = 'username';

        if (typeCheck === 'username') {

            UsernameToUUID(inputUser).then(async (info: any) => {

                let skin: any = await HeadAvatar(info.id);
                let bInfo: any = await UUIDToUsername(info.id);
                
                let userEmbed = new MessageEmbed()
                    .setColor(this.client.colors.primary)
                    .setThumbnail(skin)
                    .setTitle(`**${info.name}'s information**`)
                    .addFields([
                        { name: `**Username**`, value: info.name, inline: true },
                        { name: `**UUID**`, value: info.id, inline: true },
                        { name: `**Last namechange**`, value: `${bInfo.changedToAt ? ms(Date.now() - bInfo.changedToAt) + ' ago' : 'Never changed'}`}
                    ])
                    .setTimestamp()
                    .setFooter(this.client.user.username)
    
                message.channel.send(userEmbed);

            }).catch((): void => {
                new ErrorBuilder(message, 'unknownuser').send();
            });

        } else {

            UUIDToUsername(inputUser).then(async (info: any) => {

                let skin: any = await HeadAvatar(inputUser);
            
                let userEmbed = new MessageEmbed()
                    .setColor(this.client.colors.primary)
                    .setThumbnail(skin)
                    .setTitle(`**${info.name}'s information**`)
                    .addFields([
                        { name: `**Username**`, value: info.name, inline: true },
                        { name: `**UUID**`, value: inputUser, inline: true },
                        { name: `**Last namechange**`, value: `${info.changedToAt ? ms(Date.now() - info.changedToAt) + ' ago' : 'Never changed'}`, inline: true }
                    ])
                    .setTimestamp()
                    .setFooter(this.client.user.username)
            
                message.channel.send(userEmbed);

            }).catch((): void => {
                new ErrorBuilder(message, 'unknownuser').send();
            });

        }

    }

}

// Module Exports
module.exports = Userinfo;