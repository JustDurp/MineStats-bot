/**
 * @file minestats.ts
 */

// Library
import { Client } from 'discord.js';
import { ExtendBot } from '../modules/Api';
import { RegisterCommands, RegisterEvents } from '../modules/Handlers';

// Minestats
export class Minestats {

    private client: ExtendBot;
    constructor() {
        this.client = new Client();
    }

    connect() {
        
        this.client.colors = {
            primary: '#9cd7d9',
            fail: '#EC7373',
            pending: '#FDD365',
            success: '#A7E9AF'
        }

        new RegisterEvents(this.client, './events/').load();
        new RegisterCommands(this.client, './commands/').load();

        this.client.login(process.env.token);

    }

}