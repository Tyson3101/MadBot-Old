"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helpCatergoryEmbed = exports.helpEmbed = exports.clientInfo = exports.prefixEmbed = exports.CommandHelpEmbed = exports.noArgsCommandHelpEmbed = exports.errorCommandEmbed = exports.invaildPermissionsCommandEmbed = exports.ownerCommandEmbed = exports.dmCommandEmbed = void 0;
const discord_js_1 = require("discord.js");
const FirstCap_1 = require("../functions/FirstCap");
const moment_1 = require("moment");
require("moment-duration-format");
exports.dmCommandEmbed = (client, user) => {
    return new discord_js_1.MessageEmbed({
        author: {
            name: user.tag,
            iconURL: user.displayAvatarURL({ format: "png" }),
        },
        title: "Invaild Channel",
        description: ":x: This command cannot be used in a DM Channel. :x:",
        footer: {
            text: `${client.user.username} ©`,
            iconURL: client.user.displayAvatarURL({ format: "png" }),
        },
    });
};
exports.ownerCommandEmbed = (client, user) => {
    return new discord_js_1.MessageEmbed({
        author: {
            name: user.tag,
            iconURL: user.displayAvatarURL({ format: "png" }),
        },
        title: "Invaild Permissions",
        description: ":x: This command can only be used by bot developers. :x:",
        footer: {
            text: `${client.user.username} ©`,
            iconURL: client.user.displayAvatarURL({ format: "png" }),
        },
    });
};
exports.invaildPermissionsCommandEmbed = (client, user, permission) => {
    return new discord_js_1.MessageEmbed({
        author: {
            name: user.tag,
            iconURL: user.displayAvatarURL({ format: "png" }),
        },
        title: "Invaild Permissions",
        description: `:x: You need the "${permission}" Permission to use this command. :x:`,
        footer: {
            text: `${client.user.username} ©`,
            iconURL: client.user.displayAvatarURL({ format: "png" }),
        },
    });
};
exports.errorCommandEmbed = (client, user, error) => {
    return new discord_js_1.MessageEmbed({
        author: {
            name: user.tag,
            iconURL: user.displayAvatarURL({ format: "png" }),
        },
        title: "Error",
        description: error.message
            ? `:x: **This command experienced an error:** :x:\n${error.message}.`
            : `:x: This command experienced an error. :x:`,
        footer: {
            text: `${client.user.username} ©`,
            iconURL: client.user.displayAvatarURL({ format: "png" }),
        },
    });
};
exports.noArgsCommandHelpEmbed = (client, user, command) => {
    const { args } = command;
    let embed = new discord_js_1.MessageEmbed({
        author: {
            name: user.tag,
            iconURL: user.displayAvatarURL({ format: "png" }),
        },
        title: "Invaild Arguments",
        description: `:x: You are missing arguments for this command. :x:`,
        fields: [
            {
                name: `Command Help`,
                value: `**Name:** ${FirstCap_1.firstCap(command.name)}
**Catergory:** ${FirstCap_1.firstCap(command.catergory)}
${command.permission
                    ? `**Required Permissions:** "${command.permission}"\n`
                    : ""}**Usage:** ${command.usage.join(" | ")}
**Example:** ${command.usage.join(" | ")}\n
**Arguments Info:**`,
            },
        ],
        footer: {
            text: `${client.user.username} ©`,
            iconURL: client.user.displayAvatarURL({ format: "png" }),
        },
    });
    args.forEach((argument, i) => {
        i++;
        embed.addField(`${i}: ${argument.name}`, `**Type:** ${Array.isArray(argument.type) ? argument.type.join(", ") : argument.type}\n**Description:** ${argument.description}\n**Example:** "${argument.example.join(`", "`)}"\n**Required:** ${FirstCap_1.firstCap(argument.required.toString())}`);
    });
    return embed;
};
exports.CommandHelpEmbed = (client, user, commandName) => {
    const command = client.commands.get(commandName);
    const { args } = command;
    let embed = new discord_js_1.MessageEmbed({
        author: {
            name: user.tag,
            iconURL: user.displayAvatarURL({ format: "png" }),
        },
        title: `${command.name} Help`,
        fields: [
            {
                name: `Command Help`,
                value: `**Name:** ${FirstCap_1.firstCap(command.name)}
**Catergory:** ${FirstCap_1.firstCap(command.catergory)}
${command.permission
                    ? `**Required Permissions:** "${command.permission}"\n`
                    : ""}**Usage:** ${command.usage.join(" | ")}
**Example:** ${command.usage.join(" | ")}\n
**Arguments Info:**`,
            },
        ],
        footer: {
            text: `${client.user.username} ©`,
            iconURL: client.user.displayAvatarURL({ format: "png" }),
        },
    });
    args.forEach((argument, i) => {
        i++;
        embed.addField(`${i}: ${argument.name}`, `**Type:** ${Array.isArray(argument.type) ? argument.type.join(", ") : argument.type}\n**Description:** ${argument.description}\n**Example:** "${argument.example.join(`", "`)}"\n**Required:** ${FirstCap_1.firstCap(argument.required.toString())}`);
    });
    return embed;
};
exports.prefixEmbed = (client, member, db, prefix = null) => {
    let { user } = member;
    return new discord_js_1.MessageEmbed({
        author: {
            name: user.tag,
            iconURL: user.displayAvatarURL({ format: "png" }),
        },
        title: "Prefix",
        description: prefix
            ? `Prefix for ${member.guild.name} is now \`${prefix}\``
            : `Prefix for ${member.guild.name} is \`${db.prefix}\``,
        footer: {
            text: `${client.user.username} ©`,
            iconURL: client.user.displayAvatarURL({ format: "png" }),
        },
    });
};
exports.clientInfo = (client, user) => {
    return new discord_js_1.MessageEmbed({
        author: {
            name: user.tag,
            iconURL: user.displayAvatarURL({ format: "png" }),
        },
        title: `${client.user.username} Information`,
        url: `https://github.com/Tyson3101/MadBot/tree/main/src`,
        description: `A Discord Bot written in Node.js with [TypeScript](https://www.typescriptlang.org/) and the NPM Module [discord.js](https://discord.js.org/#/)!`,
        fields: [
            {
                name: `Uptime`,
                value: `${moment_1.duration(client.uptime).format("d[d ]h[h ]m[m ]s[s]")}`,
                inline: true,
            },
            {
                name: `Support Server`,
                value: `[Join Here](${client.supportServer})`,
                inline: true,
            },
            {
                name: `Source Code`,
                value: `[Github Repository](https://github.com/Tyson3101/MadBot/tree/main/src)`,
                inline: true,
            },
            {
                name: `Stats`,
                value: `**Servers:** \`${client.guilds.cache.size}\` **| Channels:** \`${client.channels.cache.size}\` **| Users:** \`${client.guilds.cache.reduce((arr, { memberCount }) => arr + memberCount, 0)}\`**| Commands:** \`${client.commands.size}\` **| Developers:** \`${client.developers.size}\``,
            },
        ],
        footer: {
            text: `${client.user.username} ©`,
            iconURL: client.user.displayAvatarURL({ format: "png" }),
        },
    });
};
exports.helpEmbed = (client, user, DB) => {
    const embed = new discord_js_1.MessageEmbed({
        author: {
            name: user.tag,
            iconURL: user.displayAvatarURL({ format: "png" }),
        },
        title: `${client.user.username} Commands`,
        description: `**[Join Support Server Here](${client.supportServer})**`,
        footer: {
            text: `${client.user.username} ©`,
            iconURL: client.user.displayAvatarURL({ format: "png" }),
        },
    });
    let allReady = [];
    client.commands.forEach((command) => {
        if (allReady.includes(command.catergory))
            return;
        allReady.push(command.catergory);
        embed.addField(`${DB.prefix}help ${command.catergory}`, `Shows all commands in the ${FirstCap_1.firstCap(command.catergory)} Catergory`, true);
    });
    return embed;
};
exports.helpCatergoryEmbed = (client, user, catergory, DB) => {
    const embed = new discord_js_1.MessageEmbed({
        author: {
            name: user.tag,
            iconURL: user.displayAvatarURL({ format: "png" }),
        },
        title: `${client.user.username} ${FirstCap_1.firstCap(catergory)} Commands`,
        description: `**[Join Support Server Here](${client.supportServer})**`,
        footer: {
            text: `${client.user.username} ©`,
            iconURL: client.user.displayAvatarURL({ format: "png" }),
        },
    });
    client.commands
        .filter((cmd) => cmd.catergory === catergory)
        .forEach((command) => {
        embed.addField(`${DB.prefix}help ${command.name}`, `${command.description}`, true);
    });
    return embed;
};
