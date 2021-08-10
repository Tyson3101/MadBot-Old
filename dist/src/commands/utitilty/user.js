"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const Client_1 = require("../../structures/Client");
const TemplateEmbed_1 = require("../../structures/TemplateEmbed");
const moment_1 = __importDefault(require("moment"));
exports.command = {
    name: "user",
    example: ["user 96396396346737437", "user @Tyson", "user"],
    args: [
        {
            name: "User",
            required: false,
        },
    ],
    async run(message) {
        let member = !message.isDM
            ? (await message.getMember(message.plainArgs.join(" "), false)) ??
                (await message.getUser(message.plainArgs.join(" "), false))
                ? undefined
                : message.member ?? undefined
            : undefined;
        const user = member?.user ??
            (await message.getUser(message.plainArgs.join(" "), false)) ??
            message.author;
        if (!message.isDM && !member)
            member = await message.getMember(user.id, false);
        const userInfo = new TemplateEmbed_1.TemplatedEmbed(user, {
            title: `${user.tag}'s Info`,
            thumbnail: {
                url: user.displayAvatarURL({
                    dynamic: true,
                    size: 4096,
                }),
            },
        });
        if (user.id !== message.author.id)
            userInfo.description = `${user.username}'s Info Requested by ${message.author.username}`;
        userInfo.addField("User Info", `**Username:** ${user.tag}`);
        userInfo.add(0, ["ID:", user.id]);
        userInfo.add(0, ["Bot:", this.client.firstCap(user.bot.toString())]);
        userInfo.add(0, [
            "Created At:",
            `${moment_1.default(user.createdAt).format("MMMM Do YYYY")} **|** ${Client_1.DiscordBot.getTimeAgo(user.createdAt)}`,
        ]);
        userInfo.add(0, ["Status:", this.client.firstCap(user.presence.status)]);
        if (user.presence.activities[0])
            userInfo.add(0, [
                "Playing:",
                (member ?? user).presence.activities.map((activitiy) => activitiy.type === "CUSTOM_STATUS"
                    ? activitiy.state
                    : activitiy.name),
            ], false);
        else
            userInfo.add(0, ["Playing:", "Nothing"]);
        if (!message.isDM && member) {
            userInfo.addField("Member Info", "**Nickname:** " + (member.nickname ?? "No Nickname"));
            userInfo.add(1, [
                "Owner:",
                this.client.firstCap((user.id === message.guild.ownerID).toString()),
            ]);
            userInfo.add(1, [
                "Joined At:",
                `${moment_1.default(member.joinedAt).format("MMMM Do YYYY")} **|** ${Client_1.DiscordBot.getTimeAgo(member.joinedAt)}`,
            ]);
            userInfo.add(1, [
                "Server Booster:",
                this.client.firstCap((!!member.premiumSince).toString()),
            ]);
            userInfo.add(1, [
                "Roles:",
                member.roles.cache.filter((r) => !r.name.startsWith("@")).size
                    ? member.roles.cache
                        .filter((r) => !r.name.startsWith("@"))
                        .map((r) => `\`${r.name}\``)
                        .join(" ")
                    : "No Roles",
            ]);
        }
        message.say(userInfo);
    },
};
