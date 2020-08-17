/**
 * @file skin.ts
 */

// Library
import { Message, MessageEmbed } from 'discord.js';
import { ExtendBot, UsernameToUUID, SkinRendered, UUIDToUsername } from '../../modules/Api';
import { Command } from '../../modules/Command';
import { ErrorBuilder } from '../../modules/ErrorBuilder';

// Skin
class Skin extends Command {

    constructor(client: ExtendBot) {
        super(client, {
            name: `skin`,
            category: `general`,
            description: `Displays the player skin`,
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

                let skin: any = await SkinRendered(info.id);

                let skinEmbed = new MessageEmbed()
                    .setColor(this.client.colors.primary)
                    .setTitle(`**${info.name}'s skin**`)
                    .setURL(`https://crafatar.com/skins/${info.id}`)
                    .setImage(skin)
                    .setTimestamp()
                    .setFooter(this.client.user.username)

                message.channel.send(skinEmbed);

            }).catch((e: string): void => {
                console.log(e);
                new ErrorBuilder(message, 'unknownuser').send();
            });

        } else {

            UUIDToUsername(inputUser).then(async (info: any) => {

                let skin: any = await SkinRendered(inputUser);

                let skinEmbed = new MessageEmbed()
                    .setColor(this.client.colors.primary)
                    .setTitle(`**${info.name}'s skin**`)
                    .setURL(`https://crafatar.com/skins/${inputUser}`)
                    .setImage(skin)
                    .setTimestamp()
                    .setFooter(this.client.user.username)

                message.channel.send(skinEmbed);

            }).catch((e: string): void => {
                console.log(e);
                new ErrorBuilder(message, 'unknownuser').send();
            });

        }

    }

}

// Module Exports
module.exports = Skin;