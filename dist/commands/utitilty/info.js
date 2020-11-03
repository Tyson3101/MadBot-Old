"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const Embeds_1 = require("../../structures/Embeds");
exports.command = {
    name: "info",
    description: "Shows info of MadBot",
    usage: ["info"],
    args: [],
    aliases: [],
    guildOnly: false,
    devOnly: false,
    run(client, message) {
        message.channel.send(Embeds_1.clientInfo(client, message.author));
    },
};
