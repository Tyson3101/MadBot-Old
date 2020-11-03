import { commandInterFace } from "../../interfaces/Command";
import { getGuildDB } from "../../functions/getGuildDB";
import {
  helpCatergoryEmbed,
  helpEmbed,
  CommandHelpEmbed,
} from "../../structures/embeds";
import { catergoryType } from "../../interfaces/catergoryType";

export const command: commandInterFace = {
  name: "help",
  description: "Help",
  usage: ["help (command/catergory)"],
  example: ["help moderation", "help"],
  guildOnly: false,
  devOnly: false,
  aliases: [],
  args: [
    {
      name: "Command/Catergory",
      required: false,
      example: ["ban", "moderation"],
      description: "Command Or Catergory to help with",
      type: "Text",
      order: 1,
    },
  ],
  async run(client, message, args) {
    const guildDB = await getGuildDB(client, message.guild);
    if (!args[0]) {
      // Checks if inputted a command or caterogry
      message.channel.send({
        embed: helpEmbed(client, message.author, guildDB),
      });
    } else {
      let inputted: any = client.commands.get(args[0].toLowerCase());
      if (!inputted) {
        let check = client.commands
          .filter(
            (cmd) => cmd.catergory.toLowerCase() === args[0].toLowerCase()
          )
          .first();
        if (check) {
          inputted = args[0];
          message.channel.send({
            embed: helpCatergoryEmbed(
              client,
              message.author,
              args[0].toLowerCase(),
              guildDB
            ),
          });
        }
      } else {
        message.channel.send({
          embed: CommandHelpEmbed(
            client,
            message.author,
            inputted.name,
            guildDB
          ),
        });
      }
    }
  },
};
