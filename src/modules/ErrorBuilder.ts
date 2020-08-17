/**
 * @file ErrorBuilder.ts
 */

// Library
import { Message, MessageEmbed } from 'discord.js';
const errors = require('../config/errors.json');

// ErrorBuilder
export class ErrorBuilder {

    private message: Message;
    private errmsg: string;
    constructor(message: Message, errmsg: string) {
        this.message = message;
        this.errmsg = errmsg;
    }

    async send(): Promise<void> {

        let filterError = errors.filter((a: any) => a.type === this.errmsg);

        let errorEmbed = new MessageEmbed()
            .setColor('#EC7373')
            .addField(`**${filterError[0].title}**`, filterError[0].message)
            .setTimestamp()
            .setFooter(`Minestats`)

        this.message.channel.send(errorEmbed);

    }

}