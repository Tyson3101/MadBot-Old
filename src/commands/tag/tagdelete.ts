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
  async run(client, message, util) {
    const { args } = util;
    delete util.DB.tags[args[0].toLowerCase()];
    await guildDataBase.set(message.guild.id, util.DB);
    message.channel.send(`The tag "${args[0]}" has been deleted!`);
  },
};
