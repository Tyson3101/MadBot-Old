import { Message } from "discord.js";
import { GuildDataBase } from "../structures/DataBase";

export async function getGuildDB(
  message: Message,
  InputtedDB: any = null // Used to check other DB's I may want to use. Defaults to guild
): Promise<GuildDataBase> {
  const { guild, client } = message;
  // Says it returns a promise which resloves into a GuildDataBaseInterface>
  const DB = InputtedDB || client.guildDB;
  // Checks if guild is null (If is it was sent in dm.)
  if (guild) {
    let DBguildRaw: GuildDataBase = await DB.get(guild.id);
    if (DBguildRaw) {
      const DBguild: GuildDataBase = {
        ...DBguildRaw,
        ownerID: guild.ownerID,
        memberCount: guild.memberCount,
        name: guild.name,
      };
      return DBguild;
    } else {
      await DB.set(guild.id, new GuildDataBase(guild));
      return new GuildDataBase(guild);
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
