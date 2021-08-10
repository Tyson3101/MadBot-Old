"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sucessPunishEmbed = exports.pingEmbed = exports.CommandHelpEmbed = exports.helpCatergoryEmbed = exports.helpEmbed = exports.clientInfo = exports.prefixEmbed = exports.invaildUserEmbed = exports.noArgsCommandHelpEmbed = exports.errorCommandEmbed = exports.invaildPermissionsBotCommandEmbed = exports.invaildPermissionsCustom = exports.invaildPermissionsMemberCommandEmbed = exports.ownerCommandEmbed = exports.nsfwCommandEmbed = exports.dmCommandEmbed = void 0;
const discord_js_1 = require("discord.js");
const Client_1 = require("./Client");
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
        description: `:x: I need the "${permission.join(" **|** ")}" Permission(s) to execute this command. :x:`,
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
        description: error
            ? `:x: **This command experienced an error:** :x:\nPlease report this error: \`${error}\` to #${client.channels.cache.get("782159661141983243").name} in my [Support Server](${client.supportServer})!`
            : `\nPlease report this incident to ${client.users
                .fetch(client.developers.find((user) => !user.position).id, `${bigint}`)
                .then((user) => user.tag)} in my [Support Server](${client.supportServer})!`,
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
        description: `:x: You are providing invaild arguments for this command. :x:\nDo **${prefix}help ${command.name}** for help. **|** Join My **[Support Server](${client.supportServer})** for more help.`,
        fields: [
            {
                name: "Tips:",
                value: client.tips.join("\n"),
            },
        ],
        footer: {
            text: `${client.user.username} ©`,
            iconURL: client.user.displayAvatarURL({ format: "png" }),
        },
    });
};
exports.invaildUserEmbed = (client, user, command, prefix) => {
    return new discord_js_1.MessageEmbed({
        author: {
            name: user.tag,
            iconURL: user.displayAvatarURL({
                format: "png",
                dynamic: true,
            }),
        },
        color: "DARK_VIVID_PINK",
        title: "Invaild Member",
        description: `:x: You are providing an invaild member for this command. :x:\nDo **${prefix}help ${command.name}** for help. **|** Join My **[Support Server](${client.supportServer})** for more help.`,
        fields: [
            {
                name: "Tips:",
                value: client.tips.join("\n"),
            },
        ],
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
                value: `\`${Client_1.DiscordBot.DEFUALT_PREFIX()}\``,
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
        embed.addField(`${prefix}help ${command.catergory}`, `Shows all commands in the ${client.firstCap(command.catergory)} Catergory`, true);
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
        title: `${client.user.username} ${client.firstCap(catergory)} Commands`,
        description: `**[Join Support Server Here](${client.supportServer})**`,
        footer: {
            text: `${client.user.username} ©`,
            iconURL: client.user.displayAvatarURL({ format: "png" }),
        },
    });
    client.commands
        .filter((cmd) => cmd.catergory === catergory)
        .filter((cmd) => cmd.public !== false && !cmd.public)
        .forEach((command, commandName) => {
        embed.addField(`${prefix}help ${commandName}`, `${command.description
            ? command.description
            : `Help for ${client.firstCap(commandName)}`}`, true);
    });
    if (!embed.fields.length)
        return exports.helpEmbed(client, user, prefix);
    return embed;
};
exports.CommandHelpEmbed = (client, user, commandName, prefix) => {
    const command = client.commands.get(commandName);
    if (command.public === false && !client.developers.has(user.id))
        return exports.helpEmbed(client, user, prefix);
    let embed = new discord_js_1.MessageEmbed({
        author: {
            name: user.tag,
            iconURL: user.displayAvatarURL({
                format: "png",
                dynamic: true,
            }),
        },
        color: "DARK_VIVID_PINK",
        title: `${client.firstCap(command.name)} Help`,
        description: `Join My **[Support Server](${client.supportServer})** for more help.\n**\`[]\`** = Required **|** **\`()\`** = Optional`,
    });
    if (!command.subCommands.size) {
        embed["fields"] = [
            {
                name: `Command Help`,
                value: `**Name:** ${client.firstCap(command.name)}\n${command.aliases?.length
                    ? `**Aliases:** ${command.aliases.join(` **|** `)}\n`
                    : ""}${command.args?.length && command.usageargs
                    ? `**Arguments:** ${command.usageargs.join(` **|** `)}\n`
                    : ""}${command.permission && command.permission[0]
                    ? `**Required Permission:** ${command.permission[0]}\n`
                    : ""}${command.usage ? `**Usage:** ${prefix}${command.usage}\n\n` : "\n"}${command.example
                    ? `**Examples:**\n${prefix}${command.example.join(`\n${prefix}`)}`
                    : ""}`,
                inline: false,
            },
        ];
    }
    else {
        embed["fields"] = [
            {
                name: `Command Help`,
                value: `**Name:** ${client.firstCap(command.name)}\n${command.aliases?.length
                    ? `**Aliases:** ${command.aliases.join(` **|** `)}\n`
                    : ""}${command.args?.length && command.usageargs
                    ? `**Arguments:** ${command.usageargs.join(` **|** `)}\n`
                    : ""}${command.permission?.[0]
                    ? `**Required Permission:** ${command.permission[0]}\n`
                    : ""}${command.usage && command.usageargs
                    ? `**Usage:** ${prefix}${command.usageargs.map((arg) => `${arg} **|** ${prefix}help ${command.name} ${arg}`)}\n\n`
                    : "\n"}${command.example
                    ? `**Examples:**\n${prefix}${command.example.join(`\n${prefix}`)}`
                    : ""}`,
                inline: false,
            },
        ];
    }
    embed["footer"] = {
        text: `${client.user.username} ©`,
        iconURL: client.user.displayAvatarURL({ format: "png" }),
    };
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
exports.sucessPunishEmbed = (client, userPunished, message, { reason, casenumber, title }) => {
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
                value: `*${message.prefix}help case* **|** *${message.prefix}help reason*`,
                inline: true,
            },
        ],
        footer: {
            text: `${client.firstCap(title.slice(0, title.length - 1))} by ${message.author.tag}!`,
            iconURL: client.user.displayAvatarURL({ format: "png" }),
        },
    });
};
