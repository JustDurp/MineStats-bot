/**
 * @file SettingsHandler.ts
 */

import { con } from "../app";
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
            con.query(`INSERT INTO settings(guildID, setting, value, updatedAt) VALUES('${this.guildID}', 'prefix', '!', '${Date.now()}')`, (err: string, row: SQLsettings) => {
                if (err) reject(err);
                resolve(row);
            });
        });
    }

    async removePrefix(): Promise<void> {
        return new Promise((resolve: any, reject: any): void => {
            con.query(`DELETE FROM settings WHERE guildID = '${this.guildID}' AND setting = 'prefix'`, (err: string, row: SQLsettings) => {
                if (err) reject(err);
                resolve(row);
            });
        });
    }

    async getPrefix(): Promise<SQLsettings[]> {
        return new Promise((resolve: any, reject: any): void => {
            con.query(`SELECT * FROM settings WHERE guildID = '${this.guildID}' AND setting = 'prefix'`, (err: string, row: SQLsettings) => {
                if (err) reject(err);
                resolve(row);
            });
        });
    }

    async updatePrefix(prefix: string): Promise<void> {
        return new Promise((resolve: any, reject: any): void => {
            con.query(`UPDATE settings SET value = '${prefix}', updatedAt = '${Date.now()}' WHERE guildID = '${this.guildID}' AND setting = 'prefix'`, (err: string, row: SQLsettings) => {
                if (err) reject(err);
                resolve(row);
            });
        });
    }

}