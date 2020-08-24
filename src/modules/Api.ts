/**
 * @file Api.ts
 */

// Library
import fetch from 'node-fetch';

// ExtendBot
export interface ExtendBot {
    [k: string]: any;
}

// SQLsettings
export interface SQLsettings {
    guildID: string;
    setting: string;
    value: string;
    updatedAt?: number;
}

// CommandPull
export interface CommandPull {
    name: string;
    description: string;
    category: string;
    usage?: string;
    aliases?: Array<string>;
    permissions?: string;
}

// MyLogin 
export interface MyLogin {
    host: string;
    user: string;
    password: string;
    database: string;
}

// UTU
export interface UTU {
    name: string;
    changedToAt?: number;
}

// UsernameToUUID
export async function UsernameToUUID(username: string) {
    return new Promise((resolve, reject) => {
        fetch(`https://api.mojang.com/users/profiles/minecraft/${username.toLowerCase()}`)
            .then(res => res.json())
            .then(json => resolve(json))
            .catch((): void => reject(`Username has not been found!`));
    });
}

// HeadAvatar
export async function HeadAvatar(uuid: string) {
    return new Promise((resolve, reject) => {
        fetch(`https://crafatar.com/avatars/${uuid.toLowerCase()}?overlay`)
            .then(res => {
                if (res.status !== 200) reject(`UUID has not been found!`);
                resolve(res.url);
            })
            .catch((): void => reject(`UUID has not been found!`));
    });
}

// UUIDToUsername
export async function UUIDToUsername(uuid: string) {
    return new Promise((resolve, reject) => {
        fetch(`https://api.mojang.com/user/profiles/${uuid.toLowerCase()}/names`)
            .then(res => res.json())
            .then(json => resolve(json.pop()))
            .catch((): void => reject(`UUID has not been found!`));
    });
}

// UserHistory
export async function UserHistory(uuid: string) {
    return new Promise((resolve, reject) => {
        fetch(`https://api.mojang.com/user/profiles/${uuid.toLowerCase()}/names`)
            .then(res => res.json())
            .then(json => resolve(json))
            .catch((): void => reject(`UUID has not been found!`));
    });
}

// SkinRendered
export async function SkinRendered(uuid: string) {
    return new Promise((resolve, reject) => {
        fetch(`https://crafatar.com/renders/body/${uuid.toLowerCase()}?overlay`)
            .then(res => {
                if (res.status !== 200) reject(`UUID has not been found!`);
                resolve(res.url);
            })
            .catch((): void => reject(`UUID has not been found!`));
    });
}

// ServerStats
export async function ServerStats(serverIP: string) {
    return new Promise((resolve, reject) => {
        fetch(`https://api.mcsrvstat.us/2/${serverIP}`)
            .then(res => res.json())
            .then(json => {
                if (json.status === 'error') reject(`Server has not been found!`);
                resolve(json);  
            })
            .catch((): void => reject(`Server has not been found!`));
    });
}

// CleanText
export function CleanText(text: string) {
    if (typeof (text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}