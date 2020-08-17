/**
 * @file app.ts
 * @version 1.0.0
 */

/**
 * Library
 * @description All needed files and packages
 */

// Packages
import { Minestats } from './domain/minestats';
import { config } from 'dotenv';
import { Database } from 'sqlite3';


/**
 * Modules
 * @description Enable modules
 */

// Dotenv
config({ path: '.env' }).parsed;

// SQLite database
export let db = new Database('./minestats.db', (err: unknown): void => {
    if (err) {
        console.log(`- SQLite | ${err}`);
    } else {
        console.log(`- SQLite | Database has been connected!`);
    }
});

// Discord client
new Minestats().connect();