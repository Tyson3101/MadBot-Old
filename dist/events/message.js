"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
const MemberCommandCheck_1 = __importDefault(require("../functions/MemberCommandCheck"));
const DataBase_1 = require("../structures/DataBase");
const GetGuildDB_1 = require("../functions/GetGuildDB");
const Embeds_1 = require("../structures/Embeds");
const SetUpArgs_1 = __importDefault(require("../functions/SetUpArgs"));
exports.event = {
    event: "message",
    async run(client, message) {
        if (message.author.bot)
            return;
        let prefix = "!";
        let guildDB;
        guildDB = await GetGuildDB_1.getGuildDB(client, message.guild, DataBase_1.guildDataBase);
        prefix = guildDB.prefix;
        if (message.channel.type !== "dm") {
            if (!message.channel.permissionsFor(message.guild.me).has(["SEND_MESSAGES"]))
                return;
        }
        const [commandNameUPPERCASE, args, Util] = SetUpArgs_1.default(client, message, guildDB);
        const commandName = commandNameUPPERCASE.toLowerCase();
        const command = client.commands.get(commandName)
            ? client.commands.get(commandName)
            : client.commands.find((cmd) => cmd.aliases ? cmd.aliases.includes(commandName) : false);
        if ((message.channel.type !== "dm" && command) ||
            (message.channel.type !== "dm" &&
                message.mentions.users.has(client.user.id))) {
            if (!message.guild.me.hasPermission("EMBED_LINKS") &&
                !message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS")) {
                return message.channel.send(`:x: I need the "EMBED_LINKS" Permission to send the embeds :x:`);
            }
        }
        if (command) {
            let vaildMember = MemberCommandCheck_1.default(client, message, Util, command);
            if (vaildMember !== true)
                return;
            try {
                command.run(client, message, Util);
                return;
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
