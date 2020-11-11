"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const DataBase_1 = require("../../structures/DataBase");
exports.command = {
    name: "showdb",
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
        let guildDB = await DataBase_1.guildDataBase.get(args[0]);
        if (!guildDB)
            guildDB = util.DB;
        const DBJSON = JSON.stringify(guildDB, null, 4);
        message.channel.send(DBJSON, { split: true, code: "json" });
    },
};
