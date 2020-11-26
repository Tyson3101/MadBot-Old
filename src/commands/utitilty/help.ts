import { commandInterFace } from "../../interfaces/Command";
import {
  helpCatergoryEmbed,
  helpEmbed,
  CommandHelpEmbed,
} from "../../structures/embeds";

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
    const { prefix } = util;
    if (!args[0]?.value) {
      // Checks if inputted a command or caterogry
      message.say({
        embed: helpEmbed(client, message.author, prefix),
      });
    } else {
      let inputted: any = client.commands.get(args[0]?.value.toLowerCase());
      if (!inputted) {
        let check = client.commands
          .filter(
            (cmd) =>
              cmd.catergory.toLowerCase() === args[0]?.value.toLowerCase()
          )
          .first();
        if (check) {
          inputted = args[0]?.value;
          message.say({
            embed: helpCatergoryEmbed(
              client,
              message.author,
              args[0]?.value.toLowerCase(),
              prefix
            ),
          });
        }
      } else {
        message.say({
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
