"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGuildDB = void 0;
const DataBase_1 = require("../structures/DataBase");
exports.getGuildDB = async (client, guild, InputtedDB = null) => {
    const DB = InputtedDB || DataBase_1.guildDataBase;
    if (guild) {
        let DBguildRaw = await DB.get(guild.id);
        if (DBguildRaw) {
            const DBguild = {
                ...DBguildRaw,
                ownerID: guild.ownerID,
                memberCount: guild.memberCount,
                name: guild.name,
            };
            return DBguild;
        }
        else {
            let guildObj = {
                name: guild.name,
                id: guild.id,
                ownerID: guild.ownerID,
                memberCount: guild.memberCount,
                prefix: "!",
                moderation: {
                    bans: new Map(),
                    kicks: new Map(),
                    mutes: new Map(),
                    warns: new Map(),
                    all: new Map(),
                    activeCases: 0,
                    caseCount: 0,
                },
            };
            await DB.set(guild.id, guildObj);
            return guildObj;
        }
    }
    else {
        return {
            name: guild.name,
            id: null,
            ownerID: null,
            memberCount: null,
            prefix: "!",
            moderation: {
                bans: null,
                kicks: null,
                mutes: null,
                warns: null,
                all: null,
                activeCases: 0,
                caseCount: 0,
            },
        };
    }
};
