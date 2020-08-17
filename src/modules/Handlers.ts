import { Collection } from 'discord.js';
/**
 * @file handlers.ts
 */

// Library
import { readdirSync } from 'fs';
import { resolve, sep } from 'path';
import { ExtendBot } from './Api';

// RegisterEvents
class RegisterEvents {

    private client: ExtendBot;
    private dir: string;
    constructor(client: ExtendBot, dir: string) {
        this.client = client;
        this.dir = resolve(`./dist/${dir}`);
    }

    load() {
        readdirSync(this.dir).forEach((file: string) => {
            if (!file.endsWith('.js')) return;
            let event = new (require(resolve(this.dir, file)))(this.client);
            let eventName: string = file.split('.')[0];
            try {
                this.client.on(eventName, (...args: Array<object>) => event.run(...args));
                console.log(`- Events | ${eventName} has been loaded!`);
            } catch (e) {
                console.log(`- Events | Error while loading ${eventName}: ${e}`);
            }
        });
    }

}

// RegisterCommands
class RegisterCommands {

    private client: ExtendBot;
    private dir: string;
    constructor(client: ExtendBot, dir: string) {
        this.client = client;
        this.dir = resolve(`./dist/${dir}`);
    }

    load() {
        ['commands', 'aliases'].forEach(a => this.client[a] = new Collection());
        readdirSync(this.dir).forEach((dirs: string) => {
            let commands: Array<string> = readdirSync(`${this.dir}${sep}${dirs}${sep}`).filter(files => files.endsWith('.js'));
            for (let file of commands) {
                let command = new (require(resolve(this.dir, dirs, file)))(this);
                if (command.pull && typeof (command.pull.name) === 'string') {
                    if (this.client.commands.get(command.pull.name)) return console.log(`- Commands | Two or more commands have the same name!`);
                    try {
                        this.client.commands.set(command.pull.name, command);
                        console.log(`- Commands | ${command.pull.name} has been loaded!`);
                    } catch (e) {
                        console.log(`- Commands | Error while loading ${command.pull.name}: ${e}`);
                    }
                } else {
                    console.log(`- Commands | Error while loading commands in ${this.dir}${dirs}!`);
                    continue;
                }
                if (command.pull.aliases && typeof (command.pull.aliases) === 'object') {
                    command.pull.aliases.forEach((alias: string) => {
                        if (this.client.aliases.get(alias)) return console.log(`- Commands | Two or more commands have the same aliases!`);
                        this.client.aliases.set(alias, command.pull.name);
                    });
                }
            }
        });
    }

}

// Export
export { RegisterEvents, RegisterCommands };