"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
const DataBase_1 = require("../structures/DataBase");
const GetGuildDB_1 = require("../functions/GetGuildDB");
const Embeds_1 = require("../structures/Embeds");
exports.event = {
    event: "message",
    async run(client, message) {
        if (message.author.bot)
            return;
        let prefix = "!";
        let guildDB;
        if (message.channel.type !== "dm") {
            guildDB = await GetGuildDB_1.getGuildDB(client, message.guild, DataBase_1.guildDataBase);
            prefix = guildDB.prefix;
            if (!message.channel.permissionsFor(message.guild.me).has(["SEND_MESSAGES"]))
                return;
            else if (!message.channel.permissionsFor(message.guild.me).has(["EMBED_LINKS"])) {
                return message.channel.send(`:x: I need the "EMBED_LINKS" Permission to send embeds! :x:
          *(Do !)*`);
            }
        }
        const [commandName, ...args] = message.content
            .trim()
            .slice(prefix.length)
            .split(/ +/g);
        const command = client.commands.get(commandName)
            ? client.commands.get(commandName)
            : client.commands.find((cmd) => cmd.aliases ? cmd.aliases.includes(commandName) : false);
        if (command) {
            if (command.permission[0]) {
                if (command.permission[1] === true) {
                    command.permission[1] = command.permission[0];
                }
            }
            console.log(command);
            if (!message.content.toLowerCase().startsWith(prefix.toLowerCase()))
                return;
            if (command.guildOnly && message.channel.type === "dm")
                return message.channel.send({
                    embed: Embeds_1.dmCommandEmbed(client, message.author),
                });
            if (command.devOnly && !client.developers.has(message.author.id))
                return message.channel.send({
                    embed: Embeds_1.ownerCommandEmbed(client, message.author),
                });
            if (message.channel.type !== "dm" &&
                command.permission[0] &&
                !message.member.hasPermission(command.permission[0]) &&
                !message.channel
                    .permissionsFor(message.member)
                    .has(command.permission[0]))
                return message.channel.send({
                    embed: Embeds_1.invaildPermissionsMemberCommandEmbed(client, message.author, command.permission[0]),
                });
            if (message.channel.type !== "dm" &&
                command.permission[1] !== false &&
                !message.guild.me.hasPermission(command.permission[1]) &&
                !message.channel
                    .permissionsFor(message.guild.me)
                    .has(command.permission[1]))
                return message.channel.send({
                    embed: Embeds_1.invaildPermissionsBotCommandEmbed(client, message.author, command.permission[1]),
                });
            if (command.args.filter((arg) => arg.required).length > args.length)
                return message.channel.send({
                    embed: Embeds_1.noArgsCommandHelpEmbed(client, message.author, command, prefix),
                });
            try {
                command.run(client, message, args);
            }
            catch (e) {
                return message.channel.send({
                    embed: Embeds_1.errorCommandEmbed(client, message.author, e),
                });
            }
        }
        if (message.mentions.users.has(client.user.id))
            return message.channel.send({
                embed: Embeds_1.clientInfo(client, message.author, guildDB.prefix),
            });
    },
};
