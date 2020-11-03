"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGuildDB = void 0;
exports.getGuildDB = async (client, guild, DB) => {
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
        };
        await DB.set(guild.id, guildObj);
        return await DB.get(guild.id);
    }
};
