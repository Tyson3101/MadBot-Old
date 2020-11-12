import { Guild } from "discord.js";
import { DiscordBot } from "../structures/Client";
import {
  GuildDataBaseInterface,
  infringementType,
} from "../interfaces/GuildDataBase";
import { guildDataBase } from "../structures/DataBase";

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
};

export function getTypeCaseCount(
  type: infringementType,
  DB: GuildDataBaseInterface
) {
  let toLoop = DB.moderation[`${type.toLowerCase()}s`];
  let caseCount = 0;
  for (let key in toLoop) {
    if (Array.isArray(toLoop[key])) {
      caseCount += toLoop[key].length;
    } else caseCount++;
  }
  return caseCount;
}
