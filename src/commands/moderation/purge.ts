import Discord from "discord.js";
import { commandInterFace } from "../../interfaces/Command";

export const command: commandInterFace = {
  name: "purge",
  aliases: ["prune"],
  guildOnly: true,
  args: [
    {
      name: "Message Count",
      description: "Amount of messages to purge",
      type: "Number",
      example: ["100"],
      required: true,
    },
    {
      name: "Reason",
      description: "Reason for the purge",
      type: "Reason",
      example: ["Clean up"],
      required: false,
    },
  ],
  example: ["purge [52] (Reason)"],
  permission: ["MANAGE_MESSAGES", true],
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
    if (Number.isNaN(args[0].value))
      return message.say({ embed: { title: "Works Ok???" } });
  },
};
