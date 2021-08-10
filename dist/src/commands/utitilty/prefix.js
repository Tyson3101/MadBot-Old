"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const DataBase_1 = require("../../structures/DataBase");
const Embeds_1 = require("../../structures/Embeds");
exports.command = {
    name: "prefix",
    description: "Gets or changes prefix for a server",
    example: ["prefix ?", "prefix Orange"],
    args: [
        {
            name: "New Prefix",
            required: false,
        },
    ],
    aliases: [],
    guildOnly: true,
    devOnly: false,
    permission: ["MANAGE_GUILD", false],
    async run(message) {
        let guildDB = message.guild.DB;
        const prefix = message.args[0]?.value;
        if (prefix) {
            guildDB.prefix = prefix;
            let newDBGUILD = {
                ...guildDB,
            };
            await this.client.guildDB.set(message.guild.id, new DataBase_1.GuildDataBase(message.guild, newDBGUILD));
            message.say({
                embed: Embeds_1.prefixEmbed(this.client, message.member, message.guild.DB, guildDB.prefix),
            });
        }
        else {
            message.say({
                embed: Embeds_1.prefixEmbed(this.client, message.member, message.guild.DB),
            });
        }
    },
};
