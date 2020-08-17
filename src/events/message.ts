/**
 * @file message.ts
 */

// Library
import { Message } from 'discord.js';
import { ExtendBot, SQLsettings } from '../modules/Api';
import { SettingsHandler } from '../modules/SettingsHandler';
import * as config from '../config/config.json';
import { ErrorBuilder } from '../modules/ErrorBuilder';

// Module Exports
module.exports = class {

    private client: ExtendBot;
    constructor(client: ExtendBot) {
        this.client = client;
    }

    async run(message: Message): Promise<void> {

        if (!message.guild || message.author.bot) return;

        let dbPrefix: SQLsettings = await new SettingsHandler(message.guild.id).getPrefix();
        if (!dbPrefix) return new SettingsHandler(message.guild.id).addPrefix();

        let prefix: string = dbPrefix.value;
        let args: Array<string> = message.content.slice(prefix.length).trim().split(/ +/g);
        let cmd: string = args.shift().toLowerCase();
        let command;

        if (!message.content.startsWith(prefix)) return;

        if (cmd.length === 0) return;
        if (this.client.commands.has(cmd)) command = this.client.commands.get(cmd);
        else if (this.client.aliases.has(cmd)) command = this.client.commands.get(this.client.aliases.get(cmd));

        if (command) {
            if (!message.member.hasPermission(command.pull.permissions) && config.developers.includes(message.author.id)) return new ErrorBuilder(message, 'noperms').send();
            if (command.pull.category === 'developer' && !config.developers.includes(message.author.id)) return new ErrorBuilder(message, 'noperms').send();
            command.run(message, args); 
        }

    }

}