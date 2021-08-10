"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const DataBase_1 = require("../../structures/DataBase");
exports.command = {
    name: "resetdb",
    args: [
        {
            name: "GuildID",
            required: false,
        },
    ],
    public: false,
    devOnly: true,
    async run(message) {
        let guild;
        if (message.args[0]?.value)
            guild = message.getGuild(message.args[0]?.value);
        if (!guild)
            guild = message.guild;
        const DBObj = new DataBase_1.GuildDataBase(message.guild);
        await this.client.guildDB.set(guild.id, DBObj);
        message.say(JSON.stringify(DBObj, null, 4), {
            split: true,
            code: "json",
        });
    },
};
