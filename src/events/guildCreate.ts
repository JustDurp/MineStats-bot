/**
 * @file guildCreate.ts
 */

// Library
import { Guild } from 'discord.js';
import { ExtendBot } from '../modules/Api';
import { SettingsHandler } from '../modules/SettingsHandler';

// Module Exports
module.exports = class {

    private client: ExtendBot;
    constructor(client: ExtendBot) {
        this.client = client;
    }

    async run(guild: Guild): Promise<void> {
        
        new SettingsHandler(guild.id).addPrefix();

    }

}