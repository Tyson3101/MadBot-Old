"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sucessPunishEmbed = exports.pingEmbed = exports.CommandHelpEmbed = exports.helpCatergoryEmbed = exports.helpEmbed = exports.clientInfo = exports.prefixEmbed = exports.noArgsCommandHelpEmbed = exports.errorCommandEmbed = exports.invaildPermissionsBotCommandEmbed = exports.invaildPermissionsCustom = exports.invaildPermissionsMemberCommandEmbed = exports.ownerCommandEmbed = exports.nsfwCommandEmbed = exports.dmCommandEmbed = void 0;
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
        color: "DARK_VIVID_PINK",
        title: "Invaild Channel",
        description: ":x: This command cannot be used in a DM Channel. :x:",
        footer: {
            text: `${client.user.username} ©`,
            iconURL: client.user.displayAvatarURL({ format: "png" }),
        },
    });
};
exports.nsfwCommandEmbed = (client, user) => {
    return new discord_js_1.MessageEmbed({
        author: {
            name: user.tag,
            iconURL: user.displayAvatarURL({
                format: "png",
                dynamic: true,
            }),
        },
        color: "DARK_VIVID_PINK",
        title: "Invaild Channel",
        description: ":x: This command can only be used in a NSFW Channel. :x:",
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
        color: "DARK_VIVID_PINK",
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
        color: "DARK_VIVID_PINK",
        title: "Invaild Permissions",
        description: `:x: You need the "${permission}" Permission to use this command. :x:`,
        footer: {
            text: `${client.user.username} ©`,
            iconURL: client.user.displayAvatarURL({ format: "png" }),
        },
    });
};
exports.invaildPermissionsCustom = (client, user, msg, note) => {
    return new discord_js_1.MessageEmbed({
        author: {
            name: user.tag,
            iconURL: user.displayAvatarURL({
                format: "png",
                dynamic: true,
            }),
        },
        color: "DARK_VIVID_PINK",
        title: "Invaild Permissions",
        description: `:x: ${msg} :x:${note ? `\n${note}` : ""}`,
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
        color: "DARK_VIVID_PINK",
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
        color: "DARK_VIVID_PINK",
        title: "Error",
        description: error?.message
            ? `:x: **This command experienced an error:** :x:\n${error.message}.`
            : `:x: This command experienced an error. :x:`,
        footer: {
            text: `${client.user.username} ©`,
            iconURL: client.user.displayAvatarURL({ format: "png" }),
        },
    });
};
exports.noArgsCommandHelpEmbed = (client, user, command, prefix) => {
    return new discord_js_1.MessageEmbed({
        author: {
            name: user.tag,
            iconURL: user.displayAvatarURL({
                format: "png",
                dynamic: true,
            }),
        },
        color: "DARK_VIVID_PINK",
        title: "Invaild Arguments",
        description: `:x: You are providing invaild arguments for this command. :x:\nDo **${prefix}${command.name}** for help. **|** Join My **[Support Server](${client.supportServer})** for more help.`,
        footer: {
            text: `${client.user.username} ©`,
            iconURL: client.user.displayAvatarURL({ format: "png" }),
        },
    });
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
        color: "DARK_VIVID_PINK",
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
        color: "DARK_VIVID_PINK",
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
        color: "DARK_VIVID_PINK",
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
        color: "DARK_VIVID_PINK",
        title: `${client.user.username} ${FirstCap_1.firstCap(catergory)} Commands`,
        description: `**[Join Support Server Here](${client.supportServer})**`,
        footer: {
            text: `${client.user.username} ©`,
            iconURL: client.user.displayAvatarURL({ format: "png" }),
        },
    });
    client.commands
        .filter((cmd) => cmd.catergory === catergory)
        .filter((cmd) => cmd.public !== false)
        .forEach((command, commandName) => {
        embed.addField(`${prefix}help ${commandName}`, `${command.description
            ? command.description
            : `Help for ${FirstCap_1.firstCap(commandName)}`}`, true);
    });
    if (embed.fields?.length)
        return exports.helpEmbed(client, user, prefix);
    return embed;
};
exports.CommandHelpEmbed = (client, user, commandName, prefix) => {
    const command = client.commands.get(commandName);
    if (command.public === false && !client.developers.has(user.id))
        return exports.helpEmbed(client, user, prefix);
    const { args } = command;
    let embed = new discord_js_1.MessageEmbed({
        author: {
            name: user.tag,
            iconURL: user.displayAvatarURL({
                format: "png",
                dynamic: true,
            }),
        },
        color: "DARK_VIVID_PINK",
        title: `${FirstCap_1.firstCap(command.name)} Help`,
        description: `Join My **[Support Server](${client.supportServer})** for more help.`,
        fields: [
            {
                name: `Command Help`,
                value: `**Name:** ${FirstCap_1.firstCap(command.name)}
**Catergory:** ${FirstCap_1.firstCap(command.catergory)}
${command.permission && command.permission[0]
                    ? `**Required Permission:** ${command.permission[0]}\n`
                    : ""}${command.usage
                    ? `**Usage:** ${prefix}${command.usage.join(` **|** ${prefix}`)}\n`
                    : ""}${command.example
                    ? `**Example:** ${prefix}${command.example.join(` **|** ${prefix}`)}\n`
                    : ""}${command.aliases?.length
                    ? `**Aliases:** ${command.aliases.join(` **|** `)}\n`
                    : "\n"}${command.args?.length ? `**Arguments Info:**` : ""}`,
            },
        ],
        footer: {
            text: `${client.user.username} ©`,
            iconURL: client.user.displayAvatarURL({ format: "png" }),
        },
    });
    if (command.args?.length) {
        args.forEach((argument, i) => {
            i++;
            embed.addField(`${i}: ${argument.name}`, `**Type:** ${Array.isArray(argument.type)
                ? argument.type.join(", ")
                : argument.type}\n${argument.description
                ? `**Description:** ${argument.description}\n`
                : ""}${argument.example?.length
                ? `**Example:** ${argument.example.join(` **|** `)}\n`
                : ""}**Required:** ${FirstCap_1.firstCap(argument.required.toString())}`);
        });
    }
    return embed;
};
exports.pingEmbed = (client, user, { latency, ping }) => {
    return new discord_js_1.MessageEmbed({
        author: {
            name: user.tag,
            iconURL: user.displayAvatarURL({ format: "png", dynamic: true }),
        },
        color: "DARK_VIVID_PINK",
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
exports.sucessPunishEmbed = (client, userPunished, util, { reason, casenumber, title }) => {
    let { message } = util;
    return new discord_js_1.MessageEmbed({
        author: {
            name: userPunished.tag,
            iconURL: userPunished.displayAvatarURL({
                format: "png",
                dynamic: true,
            }),
        },
        color: "DARK_VIVID_PINK",
        title: title,
        description: `**${userPunished.tag}** has been ${title
            .toLowerCase()
            .slice(0, title.length - 1)} for "${reason}"`,
        fields: [
            {
                name: "Case Number",
                value: `${casenumber}`,
                inline: true,
            },
            {
                name: "Mistake?",
                value: `*${util.prefix}help case* **|** *${util.prefix}help reason*`,
                inline: true,
            },
        ],
        footer: {
            text: `${FirstCap_1.firstCap(title.slice(0, title.length - 1))} by ${message.author.tag}!`,
            iconURL: client.user.displayAvatarURL({ format: "png" }),
        },
    });
};
