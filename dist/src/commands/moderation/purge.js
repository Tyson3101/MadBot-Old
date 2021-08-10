"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
const Embeds_1 = require("../../structures/Embeds");
exports.command = {
    name: "purge",
    aliases: ["prune"],
    guildOnly: true,
    args: [
        {
            name: "Message Count",
            required: true,
        },
        {
            name: "Reason",
            required: false,
        },
    ],
    example: ["purge 52 Too many shitpost", "purge 69"],
    permission: ["MANAGE_MESSAGES", true],
    async run(message) {
        const amount = parseInt(message.args[0].value);
        if (Number.isNaN(amount))
            return message.say({
                embed: Embeds_1.noArgsCommandHelpEmbed(this.client, message.author, message.command, message.guild.prefix),
            });
        if (amount <= 0 && amount >= 100)
            return message.say({
                embed: Embeds_1.noArgsCommandHelpEmbed(this.client, message.author, message.command, message.guild.prefix),
            });
        message.channel
            .bulkDelete(amount)
            .catch((e) => {
            message.say({
                embed: new discord_js_1.MessageEmbed({
                    author: {
                        name: message.author.tag,
                        iconURL: message.author.displayAvatarURL({
                            format: "png",
                            dynamic: true,
                        }),
                    },
                    title: "Error",
                    description: e.message,
                    footer: {
                        text: `${this.client.user.username} ©`,
                        iconURL: this.client.user.displayAvatarURL({ format: "png" }),
                    },
                }),
            });
        });
    },
};
