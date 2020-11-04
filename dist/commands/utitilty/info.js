"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const Embeds_1 = require("../../structures/Embeds");
const GetGuildDB_1 = require("../../functions/GetGuildDB");
exports.command = {
    name: "info",
    description: "Shows info of MadBot",
    usage: ["info"],
    example: null,
    args: [],
    aliases: ["stats"],
    guildOnly: false,
    devOnly: false,
    async run(client, message) {
        let { prefix } = await GetGuildDB_1.getGuildDB(client, message.guild);
        message.channel.send(Embeds_1.clientInfo(client, message.author, prefix));
    },
};
