"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
exports.command = {
    name: "ban",
    description: "Bans a member from the server.",
    usage: ["ban [Member] (Reason)"],
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
    permission: "BAN_MEMBERS",
    run(client, message, args) {
        message.channel.send(`Arguments: ${args.join(" ")}`);
    },
};
