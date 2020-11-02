"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
const DataBase_1 = require("../structures/DataBase");
const getGuildDB_1 = require("../functions/getGuildDB");
const embeds_1 = require("../structures/embeds");
exports.event = {
    event: "message",
    async run(client, message) {
        if (message.author.bot)
            return;
        let prefix = "!";
        let guildDB = await getGuildDB_1.getGuildDB(client, message.guild, DataBase_1.guildDataBase);
        prefix = guildDB.prefix;
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
                    embed: embeds_1.dmCommandEmbed(client, message.author),
                });
            if (command.devOnly && !client.developers.has(message.author.id))
                return message.channel.send({
                    embed: embeds_1.ownerCommandEmbed(client, message.author),
                });
            if ((command.permission &&
                !message.member.hasPermission(command.permission)) ||
                (message.channel.type !== "dm" &&
                    !message.channel
                        .permissionsFor(message.member)
                        .has(command.permission)))
                return message.channel.send({
                    embed: embeds_1.invaildPermissionsCommandEmbed(client, message.author, command.permission),
                });
            if (command.args.filter((arg) => arg.required).length > args.length)
                return message.channel.send({
                    embed: embeds_1.noArgsCommandHelpEmbed(client, message.author, command),
                });
            try {
                command.run(message, client, args);
            }
            catch (e) {
                return message.channel.send({
                    embed: embeds_1.errorCommandEmbed(client, message.author, e),
                });
            }
        }
    },
};
