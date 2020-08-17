/**
 * @file Command.ts
 */

// Library
import { ExtendBot, CommandPull } from "./Api";

// Command
export class Command {

    public client: ExtendBot;
    private pull: CommandPull;
    constructor(client: ExtendBot, pull: CommandPull = {
        name: null,
        aliases: [],
        category: 'general',
        description: 'No description provided',
        usage: '',
        permissions: 'SEND_MESSAGES'
    }) {
        this.client = client.client;
        this.pull = pull;
    }

}