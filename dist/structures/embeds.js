"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientInfo = exports.prefixEmbed = exports.CommandHelpEmbed = exports.noArgsCommandHelpEmbed = exports.errorCommandEmbed = exports.invaildPermissionsCommandEmbed = exports.ownerCommandEmbed = exports.dmCommandEmbed = void 0;
const discord_js_1 = require("discord.js");
const firstCap_1 = require("../functions/firstCap");
const date_fns_1 = require("date-fns");
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
            name: user.username,
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
            name: user.username,
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
            name: user.username,
            iconURL: user.displayAvatarURL({ format: "png" }),
        },
        title: "Error",
        description: error.message
            ? `:x: This command experienced an error: ${error.message}. :x:`
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
            name: user.username,
            iconURL: user.displayAvatarURL({ format: "png" }),
        },
        title: "Invaild Arguments",
        description: `:x: You are missing arguments for this command. :x:`,
        fields: [
            {
                name: `Command Help`,
                value: `**Name:** ${firstCap_1.firstCap(command.name)}
**Catergory:** ${firstCap_1.firstCap(command.catergory)}
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
        embed.addField(`${i}: ${argument.name}`, `**Type:** ${Array.isArray(argument.type) ? argument.type.join(", ") : argument.type}\n**Description:** ${argument.description}\n**Example:** "${argument.example.join(`", "`)}"\n**Required:** ${firstCap_1.firstCap(argument.required.toString())}`);
    });
    return embed;
};
exports.CommandHelpEmbed = (client, user, commandName) => {
    const command = client.commands.get(commandName);
    const { args } = command;
    let embed = new discord_js_1.MessageEmbed({
        author: {
            name: user.username,
            iconURL: user.displayAvatarURL({ format: "png" }),
        },
        title: `${command.name} Help`,
        fields: [
            {
                name: `Command Help`,
                value: `**Name:** ${firstCap_1.firstCap(command.name)}
**Catergory:** ${firstCap_1.firstCap(command.catergory)}
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
        embed.addField(`${i}: ${argument.name}`, `**Type:** ${Array.isArray(argument.type) ? argument.type.join(", ") : argument.type}\n**Description:** ${argument.description}\n**Example:** "${argument.example.join(`", "`)}"\n**Required:** ${firstCap_1.firstCap(argument.required.toString())}`);
    });
    return embed;
};
exports.prefixEmbed = (client, member, db, prefix = null) => {
    let { user } = member;
    return new discord_js_1.MessageEmbed({
        author: {
            name: user.username,
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
            name: user.username,
            iconURL: user.displayAvatarURL({ format: "png" }),
        },
        title: `${client.user.username} Stats`,
        description: `A Discord Bot written in Node.js with [TypeScript](https://www.typescriptlang.org/) and the NPM Module [discord.js](https://discord.js.org/#/)!`,
        fields: [
            {
                name: `Uptime`,
                value: `Days: ${date_fns_1.formatDistance(date_fns_1.subDays(Date.now(), client.uptime), Date.now())}}Hours: ${date_fns_1.formatDistance(date_fns_1.subHours(Date.now(), client.uptime), Date.now())}`,
                inline: true,
            },
            {
                name: `Total Users`,
                value: `${client.guilds.cache.reduce((arr, { memberCount }) => arr + memberCount, 0)}`,
                inline: true,
            },
            {
                name: `Total Servers`,
                value: `${client.guilds.cache.size}`,
                inline: true,
            },
        ],
        footer: {
            text: `${client.user.username} ©`,
            iconURL: client.user.displayAvatarURL({ format: "png" }),
        },
    });
};
