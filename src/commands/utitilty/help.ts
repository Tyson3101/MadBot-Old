import { commandInterFace } from "../../interfaces/Command";
import {
  helpCatergoryEmbed,
  helpEmbed,
  CommandHelpEmbed,
} from "../../structures/embeds";

export const command: commandInterFace = {
  name: "help",
  example: ["help moderation", "help", "help info"],
  args: [
    {
      name: `Command/Catergory`,
      required: false,
    },
  ],
  async run(client, message) {
    const { prefix } = message;
    if (!message.args[0]?.value) {
      // Checks if inputted a command or caterogry
      message.say({
        embed: helpEmbed(client, message.author, prefix),
      });
    } else {
      let inputted: any = client.commands.get(
        message.args[0]?.value.toLowerCase()
      );
      if (!inputted) {
        let check = client.commands
          .filter(
            (cmd) =>
              cmd.catergory.toLowerCase() ===
              message.args[0]?.value.toLowerCase()
          )
          .first();
        if (check) {
          inputted = message.args[0]?.value;
          message.say({
            embed: helpCatergoryEmbed(
              client,
              message.author,
              message.args[0]?.value.toLowerCase(),
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
