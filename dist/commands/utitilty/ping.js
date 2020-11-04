"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const Embeds_1 = require("../../structures/Embeds");
exports.command = {
    name: "ping",
    description: "Shows the API Latency.",
    usage: ["ping"],
    example: ["ping"],
    args: [],
    aliases: ["latency"],
    guildOnly: false,
    devOnly: false,
    async run(client, message, args) {
        let latency = Date.now() - message.createdTimestamp + "ms";
        let ping = client.ws.ping + "ms";
        message.channel.send({
            embed: Embeds_1.pingEmbed(client, message.author, {
                latency: latency,
                ping: ping,
            }),
        });
    },
};
