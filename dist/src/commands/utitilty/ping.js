"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const Embeds_1 = require("../../structures/Embeds");
exports.command = {
    name: "ping",
    description: "Shows the API Latency.",
    example: ["ping"],
    aliases: ["latency"],
    guildOnly: false,
    devOnly: false,
    async run(message) {
        let latency = Date.now() - message.createdTimestamp + "ms";
        let ping = this.client.ws.ping + "ms";
        message.say({
            embed: Embeds_1.pingEmbed(this.client, message.author, {
                latency: latency,
                ping: ping,
            }),
        });
    },
};
