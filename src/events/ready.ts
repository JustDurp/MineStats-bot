/**
 * @file ready.ts
 */

// Library
import { ExtendBot } from '../modules/Api';

// Module Exports
module.exports = class {

    private client: ExtendBot;
    constructor(client: ExtendBot) {
        this.client = client;
    }

    async run(): Promise<void> {

        console.log(`- Client | ${this.client.user.tag} is online!`);

    }

}