"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const DataBase_1 = require("../../structures/DataBase");
const getGuildDB_1 = require("../../functions/getGuildDB");
const embeds_1 = require("../../structures/embeds");
exports.command = {
    name: "prefix",
    description: "Gets or changes prefix for a server",
    usage: ["prefix (prefix)"],
    args: [
        {
            name: "Prefix",
            type: ["Prefix"],
            description: "Prefix to change.",
            example: ["?"],
            required: false,
            order: 1,
        },
    ],
    aliases: [],
    guildOnly: true,
    devOnly: false,
    permission: "MANAGE_GUILD",
    async run(message, client, args) {
        let guildDB = await getGuildDB_1.getGuildDB(client, message.guild, DataBase_1.guildDataBase);
        let prefix = guildDB.prefix;
        if (args[0]) {
            guildDB.prefix = args[0];
            let newDBGUILD = {
                ...guildDB,
            };
            await DataBase_1.guildDataBase.set(message.guild.id, newDBGUILD);
            message.channel.send(embeds_1.prefixEmbed(client, message.member, await getGuildDB_1.getGuildDB(client, message.guild, DataBase_1.guildDataBase), args[0]));
        }
        else {
            message.channel.send(embeds_1.prefixEmbed(client, message.member, await getGuildDB_1.getGuildDB(client, message.guild, DataBase_1.guildDataBase)));
        }
    },
};
