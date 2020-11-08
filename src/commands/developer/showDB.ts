import { commandInterFace } from "../../interfaces/Command";
import { guildDataBase } from "../../structures/DataBase";
export const command: commandInterFace = {
  name: "showdb",
  args: [
    {
      name: "GuildID",
      type: "GuildID",
      example: ["123456789101112"],
      description: `The ID of the guild to show the DB of.`,
      required: false,
    },
  ],
  public: false,
  devOnly: true,
  async run(client, message, { args, ...util }) {
    let guildDB = await guildDataBase.get(args[0]);
    if (!guildDB) guildDB = util.DB;
    message.channel.send(
      `\`\`\`json\n${JSON.stringify(guildDB, null, 4)}\`\`\``,
      { split: true }
    );
  },
};
