"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
const embeds_1 = require("../../structures/embeds");
const GetGuildDB_1 = require("../../functions/GetGuildDB");
const DataBase_1 = require("../../structures/DataBase");
exports.command = {
    name: "kick",
    description: "Kicks a member from the server.",
    usage: ["kick [Member] (Reason)"],
    example: ["kick @Tyson Dm Advertising"],
    args: [
        {
            name: "Member",
            type: ["User Mention", "UserID"],
            description: "Member to kick",
            example: ["**Mention:** @Tyson", "**ID:** 397737988915724310"],
            required: true,
        },
        {
            name: "Reason",
            type: "Reason",
            description: "Reason for the kick",
            example: ["Advertising", "Being Rude"],
            required: false,
        },
    ],
    aliases: [],
    permission: ["KICK_MEMBERS", true],
    async run(client, message, util) {
        let { args } = util;
        let member = await util.getMember(args[0]);
        if (!member)
            return;
        if (member.id === message.guild.ownerID)
            return message.channel.send({
                embed: embeds_1.invaildPermissionsCustom(client, message.author, `I can't perform this action on this member.`),
            });
        if (member.id === client.user.id)
            return message.channel.send({
                embed: embeds_1.invaildPermissionsCustom(client, message.author, `I can't perform this action on this member.`),
            });
        if (message.member.id !== message.guild.ownerID) {
            if (!util.compareRolePostion(message.member.roles.highest, member.roles.highest))
                return;
            if (!member.kickable ||
                util.compareRolePostion(message.guild.me.roles.highest, member.roles.highest, true))
                return message.channel.send({
                    embed: embeds_1.invaildPermissionsCustom(client, message.author, `I can't perform this action on this member.`),
                });
        }
        let reason = "No reason provided.";
        if (args[1])
            reason = args.slice(1).join(" ");
        let backUpDB = { ...util.DB };
        let typeCaseCount = GetGuildDB_1.getTypeCaseCount("KICK", util.DB) + 1;
        let caseCount = ++util.DB.moderation.caseCount;
        const moderationDB = {
            victim: {
                id: member.id,
                username: member.user.username,
                tag: member.user.tag,
            },
            moderator: {
                id: message.author.id,
                username: message.author.username,
                tag: message.author.tag,
            },
            reason: reason,
            typeCaseCount: typeCaseCount,
            caseCount: caseCount,
            infringementType: "KICK",
        };
        util.DB.moderation.kicks[member.id]
            ? util.DB.moderation.kicks[member.id].push(moderationDB)
            : (util.DB.moderation.kicks[member.id] = [moderationDB]);
        util.DB.moderation.all[member.id]
            ? util.DB.moderation.all[member.id].push(moderationDB)
            : (util.DB.moderation.all[member.id] = [moderationDB]);
        await DataBase_1.guildDataBase.set(message.guild.id, { ...util.DB });
        member
            .send({
            embed: new discord_js_1.MessageEmbed({
                author: {
                    name: member.user.tag,
                    iconURL: member.user.displayAvatarURL({
                        format: "png",
                        dynamic: true,
                    }),
                },
                color: "DARK_VIVID_PINK",
                thumbnail: {
                    url: message.guild.iconURL({ format: "png", dynamic: true }) ||
                        client.user.displayAvatarURL({ format: "png" }),
                },
                title: `Kicked from ${message.guild.name}`,
                description: `You have been kicked from ${message.guild.name} for "${reason}".\nYou were kicked by ${message.author.tag}.`,
                footer: {
                    text: `${client.user.username} ©`,
                    iconURL: client.user.displayAvatarURL({ format: "png" }),
                },
            }),
        })
            .catch((e) => e);
        try {
            await member.kick(reason);
            await message.channel.send({
                embed: embeds_1.sucessPunishEmbed(client, member.user, util, {
                    title: "Kicked!",
                    reason: reason,
                    casenumber: util.DB.moderation.caseCount,
                }),
            });
        }
        catch {
            message.channel.send({
                embed: embeds_1.errorCommandEmbed(client, message.author, null),
            });
            await DataBase_1.guildDataBase.set(message.guild.id, backUpDB);
        }
    },
};
