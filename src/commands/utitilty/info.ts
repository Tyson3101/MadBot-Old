import { commandInterFace } from "../../interfaces/Command";
import { clientInfo } from "../../structures/Embeds";
import { Message } from "discord.js";

export const command: commandInterFace = {
  name: "info",
  description: "Shows info of MadBot",
  aliases: ["stats"],
  async run(
    client,
    {
      argsUtil: {
        parserOutput: { flags, options },
        flag,
        option,
      },
      args,
      ...message
    }
  ) {
    const { prefix } = message;
    message.say({ embed: clientInfo(client, message.author, prefix) }); // Sends Client Info Embed
  },
};
