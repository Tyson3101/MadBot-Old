import { Message } from "discord.js";
import { GuildDataBaseInterface } from "../interfaces/GuildDataBase";
import { guildDataBase } from "../structures/DataBase";

export async function getGuildDB(
  message: Message,
  InputtedDB: any = null // Used to check other DB's I may want to use. Defaults to guild
): Promise<GuildDataBaseInterface> {
  const { guild, client } = message;
  // Says it returns a promise which resloves into a GuildDataBaseInterface>
  const DB = InputtedDB || guildDataBase;
  // Checks if guild is null (If is it was sent in dm.)
  if (guild) {
    let DBguildRaw: GuildDataBaseInterface = await DB.get(guild.id);
    if (DBguildRaw) {
      const DBguild: GuildDataBaseInterface = {
        ...DBguildRaw,
        ownerID: guild.ownerID,
        memberCount: guild.memberCount,
        name: guild.name,
      };
      return DBguild;
    } else {
      let guildObj: GuildDataBaseInterface = {
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
        tags: {},
        logChannel: null,
      };
      await DB.set(guild.id, guildObj);
      return guildObj;
    }
  } else {
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
      tags: {},
      logChannel: null,
    };
  }
}
