import { Command } from "../../interfaces/Command";

export const command: Command = {
  name: "tagdelete",
  description: "Deletes a tag",
  example: ["prices"],
  args: [
    {
      name: "TagName",
      required: true,
    },
  ],
  async run(client, message) {
    delete message.guild.DB.tags[message.args[0]?.value.toLowerCase()];
    await client.guildDB.set(message.guild.id, message.guild.DB);
    message.say(`The tag "${message.args[0]?.value}" has been deleted!`);
  },
};
