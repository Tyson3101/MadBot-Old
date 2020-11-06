"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const embeds_1 = require("../../structures/embeds");
exports.command = {
    name: "ban",
    description: "Bans a member from the server.",
    usage: ["ban [Member] (Reason)"],
    example: ["ban @Tyson Dm Advertising"],
    args: [
        {
            name: "Member",
            type: ["Member", "ID"],
            description: "Member to ban",
            example: ["**Mention:** @Tyson", "**ID:** 397737988915724310"],
            required: true,
            order: 1,
        },
        {
            name: "Reason",
            type: "Reason",
            description: "Reason for the ban",
            example: ["Advertising", "Being Rude"],
            required: false,
            order: 2,
        },
    ],
    aliases: [],
    guildOnly: true,
    devOnly: false,
    permission: ["BAN_MEMBERS", true],
    async run(client, message, { args, ...util }) {
        let user;
        try {
            user = await util.getUser(args[0]);
        }
        catch {
            return message.channel.send({
                embed: embeds_1.noArgsCommandHelpEmbed(client, message.author, util.command, util.prefix),
            });
        }
        message.channel.send(`Arguments: ${user}`);
    },
};
