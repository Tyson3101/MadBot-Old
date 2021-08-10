"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const Embeds_1 = require("../../structures/Embeds");
exports.command = {
    name: "info",
    description: "Shows info of MadBot",
    aliases: ["stats"],
    async run(message) {
        message.say({
            embed: Embeds_1.clientInfo(this.client, message.author, message.prefix),
        });
    },
};
