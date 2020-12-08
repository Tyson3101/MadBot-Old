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
  async run(client, message) {
    delete message.guild.DB.tags[message.args[0]?.value.toLowerCase()];
    await guildDataBase.set(message.guild.id, message.guild.DB);
    message.say(`The tag "${message.args[0]?.value}" has been deleted!`);
  },
};
