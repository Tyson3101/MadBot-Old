import { Guild } from "discord.js";
import { Command } from "../../interfaces/Command";
import { GuildDataBase } from "../../structures/DataBase";
import { DiscordBot } from "../../structures/Client";
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
    const DBObj: GuildDataBase = DiscordBot.DEFUALT_DB(message.guild);
    await client.guildDB.set(message.args[0]?.value ?? guild.id, DBObj);
    message.say(JSON.stringify(DBObj, null, 4), {
      split: true,
      code: "json",
    });
  },
};
