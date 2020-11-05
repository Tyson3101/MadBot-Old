"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pingEmbed = exports.helpCatergoryEmbed = exports.helpEmbed = exports.clientInfo = exports.prefixEmbed = exports.CommandHelpEmbed = exports.noArgsCommandHelpEmbed = exports.errorCommandEmbed = exports.invaildPermissionsBotCommandEmbed = exports.invaildPermissionsMemberCommandEmbed = exports.ownerCommandEmbed = exports.dmCommandEmbed = void 0;
const discord_js_1 = require("discord.js");
const FirstCap_1 = require("../functions/FirstCap");
const moment_1 = require("moment");
require("moment-duration-format");
exports.dmCommandEmbed = (client, user) => {
    return new discord_js_1.MessageEmbed({
        author: {
            name: user.tag,
            iconURL: user.displayAvatarURL({
                format: "png",
                dynamic: true,
            }),
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
            iconURL: user.displayAvatarURL({
                format: "png",
                dynamic: true,
            }),
        },
        title: "Invaild Permissions",
        description: ":x: This command can only be used by bot developers. :x:",
        footer: {
            text: `${client.user.username} ©`,
            iconURL: client.user.displayAvatarURL({ format: "png" }),
        },
    });
};
exports.invaildPermissionsMemberCommandEmbed = (client, user, permission) => {
    return new discord_js_1.MessageEmbed({
        author: {
            name: user.tag,
            iconURL: user.displayAvatarURL({
                format: "png",
                dynamic: true,
            }),
        },
        title: "Invaild Permissions",
        description: `:x: You need the "${permission}" Permission to use this command. :x:`,
        footer: {
            text: `${client.user.username} ©`,
            iconURL: client.user.displayAvatarURL({ format: "png" }),
        },
    });
};
exports.invaildPermissionsBotCommandEmbed = (client, user, permission) => {
    return new discord_js_1.MessageEmbed({
        author: {
            name: user.tag,
            iconURL: user.displayAvatarURL({
                format: "png",
                dynamic: true,
            }),
        },
        title: "Invaild Permissions",
        description: `:x: I need the "${permission}" Permission to execute this command. :x:`,
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
            iconURL: user.displayAvatarURL({
                format: "png",
                dynamic: true,
            }),
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
exports.noArgsCommandHelpEmbed = (client, user, command, prefix) => {
    const { args } = command;
    let embed = new discord_js_1.MessageEmbed({
        author: {
            name: user.tag,
            iconURL: user.displayAvatarURL({
                format: "png",
                dynamic: true,
            }),
        },
        title: "Invaild Arguments",
        description: `:x: You are missing arguments for this command. :x:`,
        fields: [
            {
                name: `Command Help`,
                value: `**Name:** ${FirstCap_1.firstCap(command.name)}
**Catergory:** ${FirstCap_1.firstCap(command.catergory)}
${command.permission[0]
                    ? `**Required Permission:** "${command.permission[0]}"\n`
                    : ""}**Usage:** "${prefix}${command.usage.join(`" | "${prefix}`)}"
${command.example
                    ? `**Example:** "${prefix}${command.example.join(`" | "${prefix}`)}"\n`
                    : ""}${command.aliases[0]
                    ? `**Aliases:** "${command.aliases.join(`" | "`)}"\n`
                    : "\n"}${command.args[0] ? `**Arguments Info:**` : ""}`,
            },
        ],
        footer: {
            text: `${client.user.username} ©`,
            iconURL: client.user.displayAvatarURL({ format: "png" }),
        },
    });
    args.forEach((argument, i) => {
        i++;
        embed.addField(`${i}: ${argument.name}`, `**Type:** ${Array.isArray(argument.type) ? argument.type.join(", ") : argument.type}\n**Description:** ${argument.description}\n**Example:** "${argument.example.join(`" | "`)}"\n**Required:** ${FirstCap_1.firstCap(argument.required.toString())}`);
    });
    return embed;
};
exports.CommandHelpEmbed = (client, user, commandName, prefix) => {
    const command = client.commands.get(commandName);
    const { args } = command;
    let embed = new discord_js_1.MessageEmbed({
        author: {
            name: user.tag,
            iconURL: user.displayAvatarURL({
                format: "png",
                dynamic: true,
            }),
        },
        title: `${command.name} Help`,
        fields: [
            {
                name: `Command Help`,
                value: `**Name:** ${FirstCap_1.firstCap(command.name)}
**Catergory:** ${FirstCap_1.firstCap(command.catergory)}
${command.permission[0]
                    ? `**Required Permission:** "${command.permission[0]}"\n`
                    : ""}**Usage:** "${prefix}${command.usage.join(`" | "${prefix}`)}"
${command.example
                    ? `**Example:** "${prefix}${command.example.join(`" | "${prefix}`)}"\n`
                    : ""}${command.aliases[0]
                    ? `**Aliases:** "${command.aliases.join(`" | "`)}"\n`
                    : "\n"}${command.args[0] ? `**Arguments Info:**` : ""}`,
            },
        ],
        footer: {
            text: `${client.user.username} ©`,
            iconURL: client.user.displayAvatarURL({ format: "png" }),
        },
    });
    args.forEach((argument, i) => {
        i++;
        embed.addField(`${i}: ${argument.name}`, `**Type:** ${Array.isArray(argument.type) ? argument.type.join(", ") : argument.type}\n**Description:** ${argument.description}\n**Example:** "${argument.example.join(`" | "`)}"\n**Required:** ${FirstCap_1.firstCap(argument.required.toString())}`);
    });
    return embed;
};
exports.prefixEmbed = (client, member, db, prefix = null) => {
    let { user } = member;
    return new discord_js_1.MessageEmbed({
        author: {
            name: user.tag,
            iconURL: user.displayAvatarURL({
                format: "png",
                dynamic: true,
            }),
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
exports.clientInfo = (client, user, prefix) => {
    return new discord_js_1.MessageEmbed({
        author: {
            name: user.tag,
            iconURL: user.displayAvatarURL({
                format: "png",
                dynamic: true,
            }),
        },
        title: `${client.user.username} Information`,
        url: `https://github.com/Tyson3101/MadBot/tree/main/src`,
        description: `A Discord Bot written in **[TypeScript](https://www.typescriptlang.org/)** with the Node Module **[Discord.js](https://discord.js.org/#/)**!\nDo **${prefix}help** for help. **| [Join My Support Server](${client.supportServer})**`,
        fields: [
            {
                name: `Uptime`,
                value: `${moment_1.duration(client.uptime).format("d[d ]h[h ]m[m ]s[s]")}`,
                inline: true,
            },
            {
                name: `Default Prefix`,
                value: `\`!\``,
                inline: true,
            },
            {
                name: `Source Code`,
                value: `[Github Repository](https://github.com/Tyson3101/MadBot/tree/main/src)`,
                inline: true,
            },
            {
                name: `Stats`,
                value: `**Servers:** \`${client.guilds.cache.size}\` **| Channels:** \`${client.channels.cache.size}\` **| Users:** \`${client.guilds.cache.reduce((arr, { memberCount }) => arr + memberCount, 0)}\` **| Commands:** \`${client.commands.size}\` **| Developers:** \`${client.developers.size}\``,
            },
        ],
        footer: {
            text: `${client.user.username} ©`,
            iconURL: client.user.displayAvatarURL({ format: "png" }),
        },
    });
};
exports.helpEmbed = (client, user, prefix) => {
    const embed = new discord_js_1.MessageEmbed({
        author: {
            name: user.tag,
            iconURL: user.displayAvatarURL({
                format: "png",
                dynamic: true,
            }),
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
        embed.addField(`${prefix}help ${command.catergory}`, `Shows all commands in the ${FirstCap_1.firstCap(command.catergory)} Catergory`, true);
    });
    return embed;
};
exports.helpCatergoryEmbed = (client, user, catergory, prefix) => {
    const embed = new discord_js_1.MessageEmbed({
        author: {
            name: user.tag,
            iconURL: user.displayAvatarURL({
                format: "png",
                dynamic: true,
            }),
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
        .filter((cmd) => cmd.name !== "help")
        .forEach((command, commandName) => {
        embed.addField(`${prefix}help ${commandName}`, `${command.description}`, true);
    });
    return embed;
};
exports.pingEmbed = (client, user, { latency, ping }) => {
    return new discord_js_1.MessageEmbed({
        author: {
            name: user.tag,
            iconURL: user.displayAvatarURL({ format: "png", dynamic: true }),
        },
        thumbnail: {
            url: client.user.displayAvatarURL({ format: "png" }),
        },
        title: "Pong! 🏓",
        fields: [
            {
                name: "Client",
                value: `**${ping}**`,
            },
            {
                name: "API",
                value: `**${latency}**`,
            },
        ],
        footer: {
            text: `${client.user.username} ©`,
            iconURL: client.user.displayAvatarURL({ format: "png" }),
        },
    });
};
