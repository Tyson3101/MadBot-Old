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
    {
      argsUtil: {
        parserOutput: { flags, options },
        flag,
        option,
      },
      args,
      ...message
    }
  ) {
    let guildDB = await guildDataBase.get(args[0]?.value);
    if (!guildDB) guildDB = message.DB;
    const DBJSON: string = JSON.stringify(guildDB, null, 4);
    message.say(DBJSON, { split: true, code: "json" });
  },
};
