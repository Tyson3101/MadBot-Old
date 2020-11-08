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
            example: ["123456789101112"],
            description: `The ID of the guild to show the DB of.`,
            required: false,
        },
    ],
    public: false,
    devOnly: true,
    async run(client, message, { args, ...util }) {
        let guildDB = await DataBase_1.guildDataBase.get(args[0]);
        if (!guildDB)
            guildDB = util.DB;
        message.channel.send(`\`\`\`json\n${JSON.stringify(guildDB, null, 4)}\`\`\``, { split: true });
    },
};
