import { Guild } from "discord.js";
import { DiscordBot } from "../structures/Client";
import { GuildDataBaseInterface } from "../interfaces/GuildDataBase";
import { guildDataBase } from "../structures/DataBase";

export const getGuildDB = async (
  client: DiscordBot,
  guild: Guild,
  InputtedDB: any = null // Used to check other DB's I may want to use. Defaults to guild
): Promise<GuildDataBaseInterface> => {
  // Says it returns a promise which resloves into a GuildDataBaseInterface>
  if (guild) {
    const DB = InputtedDB || guildDataBase;
    let DBguild = await DB.get(guild.id);
    if (DBguild) return DBguild;
    else {
      let guildObj: GuildDataBaseInterface = {
        name: guild.name,
        id: guild.id,
        ownerID: guild.ownerID,
        memberCount: guild.memberCount,
        prefix: "!",
      };
      await DB.set(guild.id, guildObj);
      return await DB.get(guild.id);
    }
  } else {
    return {
      name: null,
      ownerID: null,
      id: null,
      memberCount: 0,
      prefix: "!",
    };
  }
};
