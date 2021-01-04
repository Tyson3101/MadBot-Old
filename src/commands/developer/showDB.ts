import { Command } from "../../interfaces/Command";
import { Guild } from "discord.js";
export const command: Command = {
  name: "showdb",
  description: "Shows DB",
  args: [
    {
      name: "GuildID",
      required: false,
    },
  ],
  public: false,
  devOnly: true,
  async run(message) {
    let guild: Guild;
    if (message.args[0]?.value)
      guild = message.getGuild(message.args[0]?.value);
    if (!guild) guild = message.guild;
    let guildDB = await this.client.guildDB.get(guild.id);
    if (!guildDB) guildDB = message.guild.DB;
    const DBJSON: string = JSON.stringify(guildDB, null, 4);
    message.say(DBJSON, { split: true, code: "json" });
  },
};
