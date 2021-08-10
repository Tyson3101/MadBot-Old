"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
const MemberCommandCheck_1 = __importDefault(require("../functions/MemberCommandCheck"));
const Embeds_1 = require("../structures/Embeds");
exports.event = {
    event: "message",
    async run(client, message) {
        if (message.author.bot ||
            message.webhookID ||
            !message.client.user ||
            (message.guild && (!message.guild.DB || !message.guild.DB.prefix)))
            return;
        const prefix = message.prefix;
        if (!message.isDM && message.guild) {
            if (!message.channel
                .permissionsFor(message.guild.me)
                .has(["SEND_MESSAGES"]))
                return;
        }
        const command = message.command;
        if ((!message.isDM && command) ||
            (!message.isDM && message.mentions.users.has(client.user.id))) {
            if (!message.guild.me.permissions.has("EMBED_LINKS") &&
                !message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS")) {
                return message.say(`:x: I need the "EMBED_LINKS" Permission :x:`);
            }
        }
        if (command) {
            console.log("Hey! Command starting");
            let vaildMember = MemberCommandCheck_1.default(client, message, command);
            command.client = client;
            if (vaildMember !== true)
                return console.log("Hey! Not a Vaild Member");
            try {
                await command.run(message);
                return;
            }
            catch (e) {
                console.log(e);
                return message.say({
                    embed: Embeds_1.errorCommandEmbed(client, message.author, e),
                });
            }
        }
        if (!message.isDM) {
            console.log(`${message.commandNameLowerCase} ${message.plainArgs
                .map((str) => str.toLowerCase())
                .join(" ")}`, message.guild.DB.tags[`${message.commandNameLowerCase} ${message.plainArgs
                .map((str) => str.toLowerCase())
                .join(" ")}`]);
            if (message.guild.DB.tags &&
                message.content.toLowerCase().startsWith(prefix.toLowerCase()) &&
                message.guild.DB.tags[`${message.commandNameLowerCase} ${message.plainArgs
                    .map((str) => str.toLowerCase())
                    .join(" ")}`]) {
                const tag = message.guild.DB.tags[`${message.commandNameLowerCase} ${message.plainArgs
                    .map((str) => str.toLowerCase())
                    .join(" ")}`];
                message.guild.DB.tags[`${message.commandNameLowerCase} ${message.plainArgs
                    .map((str) => str.toLowerCase())
                    .join(" ")}`].uses++;
                await client.guildDB.set(message.guild.id, message.guild.DB);
                return message
                    .say(tag.replies[Math.floor(Math.random() * tag.replies.length)])
                    .catch(console.log);
            }
        }
        if (message.mentions.users.has(client.user.id))
            return message.say(!message.isDM
                ? `Prefix for ${message.guild.name} is \`${message.prefix}\``
                : "", {
                embed: Embeds_1.clientInfo(client, message.author, message.prefix),
            });
    },
};
