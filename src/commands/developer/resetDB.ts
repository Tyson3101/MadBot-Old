import { Guild } from "discord.js";
import { Command } from "../../interfaces/Command";
import { GuildDataBase } from "../../structures/DataBase";
export const command: Command = {
  name: "resetdb",
  args: [
    {
      name: "GuildID",
      required: false,
    },
  ],
  public: false,
  devOnly: true,

  async run(client, message) {
    let guild: Guild;
    if (message.args[0]?.value)
      guild = message.getGuild(message.args[0]?.value);
    if (!guild) guild = message.guild;
    const DBObj: GuildDataBase = new GuildDataBase(message.guild);
    await client.guildDB.set(guild.id, DBObj);
    message.say(JSON.stringify(DBObj, null, 4), {
      split: true,
      code: "json",
    });
  },
};
