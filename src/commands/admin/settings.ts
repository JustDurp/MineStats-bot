/**
 * @file settings.ts
 */

// Library
import { Message } from 'discord.js';
import { ExtendBot } from '../../modules/Api';
import { Command } from '../../modules/Command';

// Settings
class Settings extends Command {

    constructor(client: ExtendBot) {
        super(client, {
            name: `settings`,
            category: `admin`,
            description: `Change some decent settings p.p`,
            aliases: ['setting', 'set'],
            permissions: 'MANAGE_GUILD',
            usage: '(setting) (new value)'
        });
    }

    async run(message: Message, args: Array<string>): Promise<void> {

        switch(args[0]) {

            case 'prefix':

                let newPrefix = args[1];
                if (!newPrefix) {

                    

                } else {



                }

                break;

            default:

        }

    }

}

// Module Exports
module.exports = Settings;