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
import { DatabaseConnection } from './modules/DatabaseConnection';


/**
 * Modules
 * @description Enable modules
 */

// Dotenv
config({ path: '.env' }).parsed;

// MySQL Database
export let con = new DatabaseConnection({ 
    host: process.env.dbhost,
    database: process.env.dbdatabase,
    user: process.env.dbuser,
    password: process.env.dbpassword
}).connect();

// Discord client
new Minestats().connect();