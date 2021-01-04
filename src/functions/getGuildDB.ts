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
      return new GuildDataBase(guild, DBguildRaw);
    } else {
      await DB.set(guild.id, new GuildDataBase(guild));
      return new GuildDataBase(guild);
    }
  } else {
    return new GuildDataBase(guild);
  }
}
