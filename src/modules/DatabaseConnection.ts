/**
 * @file DatabaseConnection.ts
 */

// Library
import { Connection, createConnection } from 'mysql';
import { MyLogin } from './Api';

// DatabaseConnection
export class DatabaseConnection {

    private host: string;
    private user: string;
    private password: string;
    private database: string;
    constructor(cred: MyLogin) {
        this.host = cred.host;
        this.user = cred.user;
        this.password = cred.password;
        this.database = cred.database;
    }

    connect(): Connection {
        let connection = createConnection({
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database
        });

        connection.connect((err: string) => {
            if (err) {
                console.log(`- MySQL Error | ${err}`);
            } else {
                console.log(`- MySQL | ${connection.config.database} is connected!`);
            }
        });

        return connection;
    }

}