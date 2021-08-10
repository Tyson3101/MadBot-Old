"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
const Embeds_1 = require("../../structures/Embeds");
const DataBase_1 = require("../../structures/DataBase");
exports.command = {
    name: "ban",
    description: "Bans a member from the server.",
    example: ["ban @Tyson Dm Advertising", "ban 53636233242246347"],
    guildOnly: true,
    args: [
        {
            name: "Member",
            required: true,
        },
        {
            name: "Reason",
            required: false,
        },
    ],
    permission: ["BAN_MEMBERS", true],
    async run(message) {
        let member = await message.getMember(message.args[0]?.value);
        if (!member)
            return;
        if (member.id === message.guild.ownerID)
            return message.say({
                embed: Embeds_1.invaildPermissionsCustom(this.client, message.author, `I can't perform this action on this member.`),
            });
        if (member.id === this.client.user.id)
            return message.say({
                embed: Embeds_1.invaildPermissionsCustom(this.client, message.author, `I can't perform this action on this member.`),
            });
        if (message.member.id !== message.guild.ownerID) {
            if (!message.compareRolePostion(message.member.roles.highest, member.roles.highest))
                return;
        }
        if (!member.bannable ||
            !message.compareRolePostion(message.guild.me.roles.highest, member.roles.highest, true))
            return message.say({
                embed: Embeds_1.invaildPermissionsCustom(this.client, message.author, `I can't perform this action on this member.`),
            });
        let reason = "No reason provided.";
        if (message.args[1].value)
            reason = message.args
                .map((x) => x.raw)
                .slice(1)
                .join(" ");
        let typeCaseCount = this.client.getTypeCaseCount("BAN", message.guild.DB) + 1;
        let caseCount = ++message.guild.DB.moderation.caseCount;
        let backUpDB = { ...message.guild.DB };
        const moderationDB = {
            guildID: message.guild.id,
            victim: member.id,
            moderator: message.author.id,
            reason: reason,
            typeCaseCount: typeCaseCount,
            caseCount: caseCount,
            startDate: new Date(),
            infringementType: "BAN",
        };
        message.guild.DB.moderation.bans[member.id]
            ? message.guild.DB.moderation.bans[member.id].push(moderationDB)
            : (message.guild.DB.moderation.bans[member.id] = [moderationDB]);
        message.guild.DB.moderation.all[member.id]
            ? message.guild.DB.moderation.all[member.id].push(moderationDB)
            : (message.guild.DB.moderation.all[member.id] = [moderationDB]);
        await this.client.guildDB.set(message.guild.id, new DataBase_1.GuildDataBase(message.guild, { ...message.guild.DB }));
        member
            .send({
            embeds: [
                new discord_js_1.MessageEmbed({
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
                            this.client.user.displayAvatarURL({ format: "png" }),
                    },
                    title: `Banned from ${message.guild.name}`,
                    description: `You have been banned from ${message.guild.name} for "${reason}".\nYou were banned by ${message.author.tag}.`,
                    footer: {
                        text: `${this.client.user.username} ©`,
                        iconURL: this.client.user.displayAvatarURL({ format: "png" }),
                    },
                }),
            ],
        })
            .catch((e) => e);
        try {
            await member.ban({ reason: reason });
            await message.say({
                embed: Embeds_1.sucessPunishEmbed(this.client, member.user, message, {
                    title: "Banned!",
                    reason: reason,
                    casenumber: caseCount,
                }),
            });
        }
        catch (e) {
            console.log(e);
            message.say({
                embed: Embeds_1.errorCommandEmbed(this.client, message.author, null),
            });
            await this.client.guildDB.set(message.guild.id, backUpDB);
        }
    },
};
