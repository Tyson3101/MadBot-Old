"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const embeds_1 = require("../../structures/embeds");
exports.command = {
    name: "info",
    description: "Shows info of MadBot",
    usage: ["info"],
    args: [],
    aliases: [],
    guildOnly: false,
    devOnly: false,
    run(message, client) {
        message.channel.send(embeds_1.clientInfo(client, message.author));
    },
};
