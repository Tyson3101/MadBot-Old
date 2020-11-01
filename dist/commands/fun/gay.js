"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
exports.command = {
    name: "gay",
    description: "Shows how gay someone is",
    usage: "ban (Member)",
    args: [],
    aliases: [],
    guildOnly: false,
    devOnly: false,
    run(message, client, args) {
        message.channel.send("You are gay.");
    },
};
//# sourceMappingURL=gay.js.map