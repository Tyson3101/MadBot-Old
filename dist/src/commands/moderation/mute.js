"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
const Embeds_1 = require("../../structures/Embeds");
const ms_1 = __importDefault(require("ms"));
const DataBase_1 = require("../../structures/DataBase");
exports.command = {
    name: "mute",
    description: "Mute a members",
    example: [
        "mute @Tyson 5h Dm Advertising *5 hours*",
        "mute 53636233242246347 very very rude. *Unlimited*",
    ],
    guildOnly: true,
    args: [
        {
            name: "Member/ID to Mute",
            required: true,
        },
        {
            name: "Time",
            required: false,
        },
        {
            name: "Reason",
            required: false,
        },
    ],
    permission: ["MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_ROLES"],
    async run(message) {
        let member = await message.getMember(message.args[0]?.value);
        console.log("Started");
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
        if (!member.manageable ||
            !message.compareRolePostion(message.guild.me.roles.highest, member.roles.highest, true))
            return message.say({
                embed: Embeds_1.invaildPermissionsCustom(this.client, message.author, `I can't perform this action on this member.`),
            });
        let endTime;
        if (message.args[1].value) {
            endTime = ms_1.default(message.args[1].value);
        }
        let MutedRole = message.guild.roles.cache.find((role) => role.name.toLowerCase() === "muted");
        try {
            if (!MutedRole)
                MutedRole = await message.guild.roles.create({
                    name: "Muted",
                    color: "DARK_BUT_NOT_BLACK",
                    position: message.guild.me.roles.highest.position - 1,
                    reason: "Muted Role",
                });
            message.guild.channels.cache
                .filter((ch) => ch.manageable)
                .forEach(async (channel) => {
                await channel.updateOverwrite(MutedRole, {
                    SEND_MESSAGES: false,
                });
            });
        }
        catch (e) {
            return message.say({
                embed: Embeds_1.errorCommandEmbed(this.client, message.author, e),
            });
        }
        let reason = "No reason provided.";
        if (message.args[1].value && !endTime)
            reason = message.args
                .map((x) => x.raw)
                .slice(1)
                .join(" ");
        else if (message.args[2].value)
            reason = message.args
                .map((x) => x.raw)
                .slice(2)
                .join(" ");
        let backUpDB = { ...message.guild.DB };
        let typeCaseCount = this.client.getTypeCaseCount("MUTE", message.guild.DB) + 1;
        let caseCount = ++message.guild.DB.moderation.caseCount;
        message.guild.DB.moderation.activeCases++;
        const moderationDB = {
            guildID: message.guild.id,
            muteRoleID: MutedRole.id,
            oldRolesID: member.roles.cache
                .filter((role) => role.editable && !role.managed)
                .keyArray(),
            victim: member.id,
            moderator: message.author.id,
            reason: reason,
            typeCaseCount: typeCaseCount,
            caseCount: caseCount,
            infringementType: "MUTE",
            startDate: new Date(),
            endDate: endTime ? new Date(Date.now() + endTime) : null,
            active: true,
        };
        message.guild.DB.moderation.mutes[member.id]
            ? message.guild.DB.moderation.mutes[member.id].push(moderationDB)
            : (message.guild.DB.moderation.mutes[member.id] = [moderationDB]);
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
                    title: `Muted from ${message.guild.name}`,
                    description: `You have been Muted from ${message.guild.name} for ${message.args[1].value} long and for "${reason}".\nYou were Muted by ${message.author.tag}.`,
                    footer: {
                        text: `${this.client.user.username} ©`,
                        iconURL: this.client.user.displayAvatarURL({ format: "png" }),
                    },
                }),
            ],
        })
            .catch((e) => e);
        let timeMuteTimeout;
        if (endTime) {
            timeMuteTimeout = setTimeout(async () => this.client.handleEndMute(member, MutedRole.id, moderationDB.oldRolesID, message.guild.DB, typeCaseCount), endTime);
        }
        try {
            await member.roles.remove(moderationDB.oldRolesID);
            await member.roles.add(MutedRole, reason);
            await message.say({
                embed: Embeds_1.sucessPunishEmbed(this.client, member.user, message, {
                    title: "Muted!",
                    reason: reason,
                    casenumber: message.guild.DB.moderation.caseCount,
                }),
            });
        }
        catch (e) {
            console.log(e);
            message.say({
                embed: Embeds_1.errorCommandEmbed(this.client, message.author, e),
            });
            await this.client.guildDB.set(message.guild.id, backUpDB);
            if (timeMuteTimeout)
                clearTimeout(timeMuteTimeout);
        }
    },
};
