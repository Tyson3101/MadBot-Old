"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
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
    async run(client, message, args) {
        message.getMember = async (mentionID) => {
            console.log(mentionID);
            let idArray = mentionID.match(/\d+/);
            if (!idArray)
                throw "No ID!";
            let id = idArray[0];
            try {
                let guildMember = await message.guild.members.fetch(id);
                return guildMember;
            }
            catch (e) {
                throw e;
            }
        };
        try {
            console.log(await message.getMember(args[0]));
        }
        catch (e) {
            console.log(e);
        }
        message.channel.send(`Arguments: ${args.join(" ")}`);
    },
};
