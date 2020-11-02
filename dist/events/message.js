"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
const Client_1 = require("../structures/Client");
const embeds_1 = require("../structures/embeds");
let prefix = "!";
exports.event = {
    event: "message",
    run(message) {
        if (message.author.bot)
            return;
        const [commandName, ...args] = message.content
            .toLowerCase()
            .trim()
            .slice(prefix.length)
            .split(/ +/g);
        const command = Client_1.client.commands.get(commandName)
            ? Client_1.client.commands.get(commandName)
            : Client_1.client.commands.find((cmd) => cmd.aliases.includes(commandName));
        if (command) {
            if (command.guildOnly && message.channel.type === "dm")
                return message.channel.send({
                    embed: embeds_1.dmCommandEmbed(Client_1.client, message.author),
                });
            if (command.devOnly && !Client_1.client.developers.has(message.author.id))
                return message.channel.send({
                    embed: embeds_1.ownerCommandEmbed(Client_1.client, message.author),
                });
            if ((command.permission &&
                !message.member.hasPermission(command.permission)) ||
                (message.channel.type !== "dm" &&
                    !message.channel
                        .permissionsFor(message.member)
                        .has(command.permission)))
                return message.channel.send({
                    embed: embeds_1.invaildPermissionsCommandEmbed(Client_1.client, message.author, command.permission),
                });
            try {
                command.run(message, Client_1.client, args);
            }
            catch (e) {
                return message.channel.send({
                    embed: embeds_1.errorCommandEmbed(Client_1.client, message.author, e),
                });
            }
        }
    },
};
