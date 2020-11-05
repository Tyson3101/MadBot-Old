"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const DataBase_1 = require("../../structures/DataBase");
const GetGuildDB_1 = require("../../functions/GetGuildDB");
const Embeds_1 = require("../../structures/Embeds");
exports.command = {
    name: "prefix",
    description: "Gets or changes prefix for a server",
    usage: ["prefix (prefix)"],
    example: ["prefix ?", "prefix Orange"],
    args: [
        {
            name: "Prefix",
            type: ["Prefix"],
            description: "Prefix to change.",
            example: ["$", "z!"],
            required: false,
            order: 1,
        },
    ],
    aliases: [],
    guildOnly: true,
    devOnly: false,
    permission: ["MANAGE_GUILD", false],
    async run(client, message, args) {
        let guildDB = await GetGuildDB_1.getGuildDB(client, message.guild, DataBase_1.guildDataBase);
        const [, prefix, ..._] = message.content
            .trim()
            .slice(guildDB.prefix.length)
            .split(/ +/g);
        if (prefix) {
            guildDB.prefix = prefix;
            let newDBGUILD = {
                ...guildDB,
            };
            await DataBase_1.guildDataBase.set(message.guild.id, newDBGUILD);
            message.channel.send({
                embed: Embeds_1.prefixEmbed(client, message.member, await GetGuildDB_1.getGuildDB(client, message.guild, DataBase_1.guildDataBase), guildDB.prefix),
            });
        }
        else {
            message.channel.send({
                embed: Embeds_1.prefixEmbed(client, message.member, await GetGuildDB_1.getGuildDB(client, message.guild, DataBase_1.guildDataBase)),
            });
        }
    },
};
