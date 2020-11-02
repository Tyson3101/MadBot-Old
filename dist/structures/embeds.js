"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorCommandEmbed = exports.invaildPermissionsCommandEmbed = exports.ownerCommandEmbed = exports.dmCommandEmbed = void 0;
const discord_js_1 = require("discord.js");
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
//errorCommandEmbed
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
