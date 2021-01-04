import { Command } from "../../interfaces/Command";
import {
  helpCatergoryEmbed,
  helpEmbed,
  CommandHelpEmbed,
} from "../../structures/Embeds";

export const command: Command = {
  name: "help",
  example: ["help moderation", "help", "help info"],
  args: [
    {
      name: `Command/Catergory`,
      required: false,
    },
  ],
  async run(message) {
    const { prefix } = message;
    if (!message.args[0]?.value) {
      message.say({
        embed: helpEmbed(this.client, message.author, prefix),
      });
    } else {
      let inputted: any = this.client.commands.get(
        message.args[0]?.value.toLowerCase()
      );
      if (!inputted) {
        let check = this.client.commands
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
              this.client,
              message.author,
              message.args[0]?.value.toLowerCase(),
              prefix
            ),
          });
        }
      } else {
        message.say({
          embed: CommandHelpEmbed(
            this.client,
            message.author,
            inputted.name,
            prefix
          ),
        });
      }
    }
  },
};
