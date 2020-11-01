"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
exports.command = {
    name: "ban",
    description: "Bans a member from the server.",
    usage: "ban [Member] (Reason)",
    args: ["[Member]", "(Reason)"],
    aliases: ["banmember"],
    guildOnly: true,
    devOnly: true,
    permissions: "BAN_MEMBERS",
    run(message, client, args) {
        message.channel.send(`Arguments: ${args.join(" ")}`);
    },
};
//# sourceMappingURL=ban.js.map