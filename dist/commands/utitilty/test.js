"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
exports.command = {
    name: "test",
    devOnly: true,
    public: false,
    async run(client, message) {
        let attachemnts = message.attachments.array();
        message.channel.send({
            files: attachemnts,
            embed: new discord_js_1.MessageEmbed().setTimestamp().setTitle("Test"),
        });
    },
};
