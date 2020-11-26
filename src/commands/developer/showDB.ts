import { commandInterFace } from "../../interfaces/Command";
import { guildDataBase } from "../../structures/DataBase";
export const command: commandInterFace = {
  name: "showdb",
  args: [
    {
      name: "GuildID",
      type: "GuildID",
      required: false,
    },
  ],
  public: false,
  devOnly: true,
  async run(
    client,
    message,
    {
      args: {
        parserOutput: { ordered: args, flags, options },
        flag,
        option,
      },
      ...util
    }
  ) {
    let guildDB = await guildDataBase.get(args[0]?.value);
    if (!guildDB) guildDB = util.DB;
    const DBJSON: string = JSON.stringify(guildDB, null, 4);
    message.say(DBJSON, { split: true, code: "json" });
  },
};
