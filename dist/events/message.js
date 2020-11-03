"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
const Embeds_1 = require("../structures/Embeds");
exports.event = {
    event: "message",
    async run(client, message) {
        if (message.author.bot)
            return;
        let prefix = "!";
        const [commandName, ...args] = message.content
            .toLowerCase()
            .trim()
            .slice(prefix.length)
            .split(/ +/g);
        const command = client.commands.get(commandName)
            ? client.commands.get(commandName)
            : client.commands.find((cmd) => cmd.aliases.includes(commandName));
        if (command) {
            if (command.guildOnly && message.channel.type === "dm")
                return message.channel.send({
                    embed: Embeds_1.dmCommandEmbed(client, message.author),
                });
            if (command.devOnly && !client.developers.has(message.author.id))
                return message.channel.send({
                    embed: Embeds_1.ownerCommandEmbed(client, message.author),
                });
            if (message.channel.type !== "dm" &&
                !message.member.hasPermission(command.permission) &&
                !message.channel.permissionsFor(message.member).has(command.permission))
                return message.channel.send({
                    embed: Embeds_1.invaildPermissionsCommandEmbed(client, message.author, command.permission),
                });
            if (command.args.filter((arg) => arg.required).length > args.length)
                return message.channel.send({
                    embed: Embeds_1.noArgsCommandHelpEmbed(client, message.author, command),
                });
            try {
                command.run(message, client, args);
            }
            catch (e) {
                return message.channel.send({
                    embed: Embeds_1.errorCommandEmbed(client, message.author, e),
                });
            }
        }
    },
};
