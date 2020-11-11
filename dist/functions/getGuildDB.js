"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTypeCaseCount = exports.getGuildDB = void 0;
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
            await DB.set(guild.id, guildObj);
            return guildObj;
        }
    }
    else {
        return {
            name: null,
            id: null,
            ownerID: null,
            memberCount: null,
            prefix: client.prefix,
            moderation: {
                bans: null,
                kicks: null,
                mutes: null,
                warns: null,
                all: null,
                unbans: null,
                unmutes: null,
                activeCases: 0,
                caseCount: 0,
                logChannel: null,
            },
        };
    }
};
function getTypeCaseCount(type, DB) {
    let toLoop = DB.moderation[`${type.toLowerCase()}s`];
    let caseCount = 0;
    for (let key in toLoop) {
        if (Array.isArray(toLoop[key])) {
            caseCount += toLoop[key].length;
        }
        else
            caseCount++;
    }
    return caseCount;
}
exports.getTypeCaseCount = getTypeCaseCount;
