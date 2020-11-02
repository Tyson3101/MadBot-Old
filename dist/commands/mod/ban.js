"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
exports.command = {
    name: "ban",
    description: "Bans a member from the server.",
    usage: "ban [Member] (Reason)",
    args: [
        {
            name: "member",
            type: ["member", "id"],
            description: "Member to ban",
            example: ["Mention: @Tyson", "ID: 63637347374634"],
            required: true,
            order: 1,
        },
        {
            name: "reason",
            type: "string",
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
    run(message, client, args) {
        message.channel.send(`Arguments: ${args.join(" ")}`);
    },
};
