/**
 * @file serverinfo.ts
 */

// Library
import { Message, MessageAttachment, MessageEmbed } from 'discord.js';
import { ExtendBot, ServerStats } from '../../modules/Api';
import { Command } from '../../modules/Command';
import { ErrorBuilder } from '../../modules/ErrorBuilder';

// Serverinfo
class Serverinfo extends Command {

    constructor(client: ExtendBot) {
        super(client, {
            name: `serverinfo`,
            category: `general`,
            description: `Display some Minecraft server information`,
            aliases: ['si', 'pingserver', 'lookserver'],
            usage: '<minecraft ip>'
        });
    }

    async run(message: Message, args: Array<string>): Promise<void> {

        let inputServer: string = args[0];
        if (!inputServer) return new ErrorBuilder(message, 'noserver').send();

        try {

            let server: any = await ServerStats(inputServer);
            
            if (server.online) {
                
                let serverEmbed = new MessageEmbed()
                    .setColor(this.client.colors.primary)
                    .setThumbnail(`https://eu.mc-api.net/v3/server/favicon/${server.ip}`)
                    .setTitle(`**${inputServer.toLowerCase()}**`)
                    .addFields([
                        { name: '**IP-address**', value: `${server.ip}:${server.port}`, inline: true },
                        { name: `**Online players**`, value: `${server.players.online}/${server.players.max}`, inline: true },
                        { name: `**Version**`, value: server.version, inline: true },
                        { name: `**Protocol**`, value: server.protocol, inline: true },
                        { name: `**Server software**`, value: `${server.software ? server.software : 'secret o.o'}`, inline: true }, 
                        { name: `**Hostname**`, value: `${server.hostname ? server.hostname : 'Host what?! q.q'}`, inline: true }
                    ])
                    .setImage(`https://mcapi.us/server/image?ip=${server.ip}&port=${server.port}&theme=dark`)
                    .setTimestamp()
                    .setFooter(this.client.user.username)

                message.channel.send(serverEmbed);

            } else {
                new ErrorBuilder(message, 'offlineserver').send();
            }

        } catch {
            new ErrorBuilder(message, 'unknownserver').send();
        }

    }

}

// Module Exports
module.exports = Serverinfo;