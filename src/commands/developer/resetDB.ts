import { Guild } from "discord.js";
import { commandInterFace } from "../../interfaces/Command";
import { GuildDataBaseInterface } from "../../interfaces/GuildDataBase";
import { DiscordBot } from "../../structures/Client";
import { guildDataBase } from "../../structures/DataBase";
export const command: commandInterFace = {
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
    const DBObj: GuildDataBaseInterface = DiscordBot.DEFUALT_DB(message.guild);
    await guildDataBase.set(message.args[0]?.value ?? guild.id, DBObj);
    message.say(JSON.stringify(DBObj, null, 4), {
      split: true,
      code: "json",
    });
  },
};
