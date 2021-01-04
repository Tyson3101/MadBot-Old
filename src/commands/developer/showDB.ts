import { Command } from "../../interfaces/Command";
export const command: Command = {
  name: "showdb",
  args: [
    {
      name: "GuildID",
      required: false,
    },
  ],
  public: false,
  devOnly: true,
  async run(message) {
    let guildDB = await this.client.guildDB.get(message.args[0]?.value);
    if (!guildDB) guildDB = message.guild.DB;
    const DBJSON: string = JSON.stringify(guildDB, null, 4);
    message.say(DBJSON, { split: true, code: "json" });
  },
};
