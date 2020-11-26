import { commandInterFace } from "../../interfaces/Command";
import { guildDataBase } from "../../structures/DataBase";

export const command: commandInterFace = {
  name: "tagdelete",
  description: "Deletes a tag",
  usage: ["tagdelete [TagName]"],
  example: ["prices"],
  args: [
    {
      name: "TagName",
      type: "Text",
      example: ["rules"],
      required: true,
    },
  ],
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
    delete util.DB.tags[args[0]?.value.toLowerCase()];
    await guildDataBase.set(message.guild.id, util.DB);
    message.say(`The tag "${args[0]?.value}" has been deleted!`);
  },
};
