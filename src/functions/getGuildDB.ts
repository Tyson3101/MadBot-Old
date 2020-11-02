import { Guild } from "discord.js";
import { DiscordBot } from "../structures/Client";
import { GuildDataBaseInterface } from "../interfaces/GuildDataBase";

export const getGuildDB = async (client: DiscordBot, guild: Guild, DB: any) => {
  let DBguild = await DB.get(guild.id);
  if (DBguild) return DBguild;
  else {
    let guildObj: GuildDataBaseInterface = {
      name: guild.name,
      id: guild.id,
      ownerID: (await client.users.fetch(guild.ownerID)).username,
      memberCount: guild.memberCount,
      prefix: "!",
    };
    await DB.set(guild.id, guildObj);
    return await DB.get(guild.id);
  }
};
