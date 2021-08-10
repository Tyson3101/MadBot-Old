"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
exports.command = {
    name: "showdb",
    description: "Shows DB",
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
        let guildDB = await this.client.guildDB.get(guild.id);
        if (!guildDB)
            guildDB = message.guild.DB;
        const DBJSON = JSON.stringify(guildDB, null, 4);
        message.say(DBJSON, { split: true, code: "json" });
    },
};
