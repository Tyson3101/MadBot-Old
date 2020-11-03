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
            example: ["$", "%"],
            required: false,
            order: 1,
        },
    ],
    aliases: [],
    guildOnly: true,
    devOnly: false,
    permission: "MANAGE_GUILD",
    async run(client, message, args) {
        let guildDB = await GetGuildDB_1.getGuildDB(client, message.guild, DataBase_1.guildDataBase);
        console.log(guildDB);
        if (args[0]) {
            guildDB.prefix = args[0];
            let newDBGUILD = {
                ...guildDB,
            };
            await DataBase_1.guildDataBase.set(message.guild.id, newDBGUILD);
            message.channel.send({
                embed: Embeds_1.prefixEmbed(client, message.member, await GetGuildDB_1.getGuildDB(client, message.guild, DataBase_1.guildDataBase), args[0]),
            });
        }
        else {
            message.channel.send({
                embed: Embeds_1.prefixEmbed(client, message.member, await GetGuildDB_1.getGuildDB(client, message.guild, DataBase_1.guildDataBase)),
            });
        }
    },
};
