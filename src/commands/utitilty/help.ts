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
  usage: ["help (command/catergory)"],
  example: ["help moderation", "help", "help info"],
  aliases: [],
  public: false,
  args: [
    {
      name: `Command/Catergory`,
      required: false,
      example: ["ban", "moderation"],
      description: "Command Or Catergory to help with",
      type: "Text",
    },
  ],
  async run(client, message, { args, ...util }) {
    const guildDB = await getGuildDB(client, message.guild);
    const prefix = guildDB.prefix;
    if (!args[0]) {
      // Checks if inputted a command or caterogry
      message.channel.send({
        embed: helpEmbed(client, message.author, prefix),
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
              prefix
            ),
          });
        }
      } else {
        message.channel.send({
          embed: CommandHelpEmbed(
            client,
            message.author,
            inputted.name,
            prefix
          ),
        });
      }
    }
  },
};
