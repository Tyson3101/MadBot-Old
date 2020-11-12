import { commandInterFace } from "../../interfaces/Command";
import { guildDataBase } from "../../structures/DataBase";

export const command: commandInterFace = {
  name: "tagcreate",
  description: "Creates a tag",
  usage: ["tagcreate [TagName] [Text to Reply Back With]"],
  example: ["tagcreate 5+5 it equals 6"],
  args: [
    {
      name: "TagName",
      type: "Text",
      example: ["Are-Cats-Dangerous?"],
      required: true,
    },
    {
      name: "Text to Reply Back With",
      type: "Text",
      example: ["Yes, Cats are dangerous"],
      required: true,
    },
  ],
  async run(client, message, util) {
    const { args } = util;
    util.DB.tags[args[0]] = {
      name: args[0],
      reply: args.slice(1).join(" "),
    };
    const newDB = {
      ...util.DB,
    };

    await guildDataBase.set(message.guild.id, newDB);
    message.channel.send(`The tag "${args[0]}" has been created!`);
  },
};
