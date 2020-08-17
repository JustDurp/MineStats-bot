/**
 * @file guildCreate.ts
 */

// Library
import { Guild } from 'discord.js';
import { db } from '../app';
import { ExtendBot, SQLsettings } from '../modules/Api';

// Module Exports
module.exports = class {

    private client: ExtendBot;
    constructor(client: ExtendBot) {
        this.client = client;
    }

    async run(guild: Guild): Promise<void> {
        
        db.get(`SELECT * FROM settings WHERE guildID = '${guild.id}'`, (err: string, row: SQLsettings) => {
            if (!row) {
                db.run(`INSERT INTO settings(guildID, setting, value, updatedAt) VALUES('${guild.id}', 'prefix', '!', '${Date.now()}')`, (err: string, row: SQLsettings) => {
                    if (err) return console.log(`- SQLite | ${err}`);
                });
            }
        });

    }

}