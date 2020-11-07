"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGuildDB = void 0;
const discord_js_1 = require("discord.js");
const DataBase_1 = require("../structures/DataBase");
exports.getGuildDB = async (client, guild, InputtedDB = null) => {
    if (guild) {
        const DB = InputtedDB || DataBase_1.guildDataBase;
        let DBguild = await DB.get(guild.id);
        if (DBguild)
            return DBguild;
        else {
            let guildObj = {
                name: guild.name,
                id: guild.id,
                ownerID: guild.ownerID,
                memberCount: guild.memberCount,
                prefix: "!",
                moderation: {
                    bans: new discord_js_1.Collection(),
                    kicks: new discord_js_1.Collection(),
                    mutes: new discord_js_1.Collection(),
                    warns: new discord_js_1.Collection(),
                    all: new discord_js_1.Collection(),
                    activeCases: 0,
                    caseCount: 0,
                },
            };
            await DB.set(guild.id, guildObj);
            return await DB.get(guild.id);
        }
    }
    else {
        let guildObj = {
            name: null,
            ownerID: null,
            id: null,
            memberCount: 0,
            prefix: "!",
            moderation: null,
        };
        return guildObj;
    }
};
