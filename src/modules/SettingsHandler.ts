/**
 * @file SettingsHandler.ts
 */

import { db } from "../app";
import { SQLsettings } from "./Api";

// Library

// Settings Handler
export class SettingsHandler {

    private guildID: string;
    constructor(guildID: string) {
        this.guildID = guildID;
    }

    async addPrefix(): Promise<void> {
        return new Promise((resolve: any, reject: any): void => {
            db.run(`INSERT INTO settings(guildID, setting, prefix, updatedAt) VALUES('${this.guildID}', 'prefix', '!', '${Date.now()}')`, (err: string, row: SQLsettings) => {
                if (err) reject(err);
                resolve(row);
            });
        });
    }

    async getPrefix(): Promise<SQLsettings> {
        return new Promise((resolve: any, reject: any): void => {
            db.get(`SELECT * FROM settings WHERE guildID = '${this.guildID}' AND setting = 'prefix'`, (err: string, row: SQLsettings) => {
                if (err) reject(err);
                resolve(row);
            });
        });
    }

}