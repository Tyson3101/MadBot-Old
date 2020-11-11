"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const DataBase_1 = require("../../structures/DataBase");
exports.command = {
    name: "resetdb",
    args: [
        {
            name: "GuildID",
            type: "GuildID",
            required: false,
        },
    ],
    public: false,
    devOnly: true,
    async run(client, message, { args, ...util }) {
        let guild;
        if (args[0])
            guild = util.getGuild(args[0]);
        if (!guild)
            guild = message.guild;
        const DBObj = {
            name: guild.name,
            id: guild.id,
            ownerID: guild.ownerID,
            memberCount: guild.memberCount,
            prefix: client.prefix,
            moderation: {
                bans: {},
                kicks: {},
                mutes: {},
                warns: {},
                all: {},
                unbans: {},
                unmutes: {},
                activeCases: 0,
                caseCount: 0,
                logChannel: null,
            },
        };
        await DataBase_1.guildDataBase.set(args[0] || guild.id, DBObj);
        message.channel.send(JSON.stringify(DBObj, null, 4), {
            split: true,
            code: "json",
        });
    },
};
