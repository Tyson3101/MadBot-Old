"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invaildPermissionsCommandEmbed = exports.ownerCommandEmbed = exports.dmCommandEmbed = void 0;
const discord_js_1 = require("discord.js");
exports.dmCommandEmbed = (client, user) => {
    return new discord_js_1.MessageEmbed({
        author: {
            name: user.username,
            iconURL: user.displayAvatarURL({ format: "png" }),
        },
        title: "Invaild Channel",
        description: ":x: This command cannot be used in a DM Channel. :x:",
        footer: {
            text: `© ${client.user.username}`,
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
            text: `© ${client.user.username}`,
            iconURL: client.user.displayAvatarURL({ format: "png" }),
        },
    });
};
exports.invaildPermissionsCommandEmbed = (client, user, Permission) => {
    return new discord_js_1.MessageEmbed({
        author: {
            name: user.username,
            iconURL: user.displayAvatarURL({ format: "png" }),
        },
        title: "Invaild Permissions",
        description: `:x: You need the "${Permission}" Permission to use this command. :x:`,
        footer: {
            text: `© ${client.user.username}`,
            iconURL: client.user.displayAvatarURL({ format: "png" }),
        },
    });
};
//# sourceMappingURL=embeds.js.map