"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGuildDB = void 0;
const DataBase_1 = require("../structures/DataBase");
async function getGuildDB(message, InputtedDB = null) {
    const { guild, client } = message;
    const DB = InputtedDB || client.guildDB;
    if (guild) {
        let DBguildRaw = await DB.get(guild.id);
        if (DBguildRaw) {
            return new DataBase_1.GuildDataBase(guild, DBguildRaw);
        }
        else {
            await DB.set(guild.id, new DataBase_1.GuildDataBase(guild));
            return new DataBase_1.GuildDataBase(guild);
        }
    }
    else {
        return new DataBase_1.GuildDataBase();
    }
}
exports.getGuildDB = getGuildDB;
