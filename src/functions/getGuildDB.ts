import { Collection, Guild } from "discord.js";
import { DiscordBot } from "../structures/Client";
import { GuildDataBaseInterface } from "../interfaces/GuildDataBase";
import { guildDataBase } from "../structures/DataBase";
import { gu } from "date-fns/locale";

export const getGuildDB = async (
  client: DiscordBot,
  guild: Guild,
  InputtedDB: any = null // Used to check other DB's I may want to use. Defaults to guild
): Promise<GuildDataBaseInterface> => {
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
      console.log(DBguild);
      return DBguild;
    } else {
      let guildObj: GuildDataBaseInterface = {
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
      return await DB.get(guild.id);
    }
  } else {
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
