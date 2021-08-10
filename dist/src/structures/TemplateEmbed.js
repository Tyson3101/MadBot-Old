"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplatedEmbed = void 0;
const discord_js_1 = require("discord.js");
const Client_1 = require("./Client");
class TemplatedEmbed extends discord_js_1.MessageEmbed {
    static DEFUALT_TEMPLATE(option) {
        const embed = { color: "DARK_VIVID_PINK" };
        if (option instanceof Client_1.DiscordBot === false) {
            embed.footer = {
                text: `${option.client.user.username} ©`,
                iconURL: option.client.user.displayAvatarURL({ format: "png" }),
            };
        }
        else {
            embed.footer = {
                text: `${option.user.username} ©`,
                iconURL: option.user.displayAvatarURL({
                    format: "png",
                }),
            };
            return embed;
        }
        if (option instanceof discord_js_1.Message) {
            embed.author = {
                name: option.author.tag,
                iconURL: option.author.displayAvatarURL({
                    format: "png",
                    dynamic: true,
                }),
            };
        }
        else if (option instanceof discord_js_1.GuildMember) {
            embed.author = {
                name: option.user.tag,
                iconURL: option.user.displayAvatarURL({
                    format: "png",
                    dynamic: true,
                }),
            };
        }
        else if (option instanceof discord_js_1.User) {
            embed.author = {
                name: option.tag,
                iconURL: option.displayAvatarURL({
                    format: "png",
                    dynamic: true,
                }),
            };
        }
        return embed;
    }
    constructor(option, data = {}) {
        super({
            ...TemplatedEmbed.DEFUALT_TEMPLATE(option),
            ...data,
        });
    }
    add(fieldNumber, [FieldTitle, FieldValue], inline = true) {
        if (inline)
            this.fields[fieldNumber].value += `\n**${Array.isArray(FieldTitle) ? FieldTitle.join("\n") : FieldTitle}** ${Array.isArray(FieldValue) ? FieldValue.join("\n") : FieldValue}`;
        else
            this.fields[fieldNumber].value += `\n**${Array.isArray(FieldTitle) ? FieldTitle.join("\n") : FieldTitle}**\n${Array.isArray(FieldValue) ? FieldValue.join("\n") : FieldValue}`;
        return this;
    }
}
exports.TemplatedEmbed = TemplatedEmbed;
