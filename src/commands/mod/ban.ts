import { Message } from "discord.js";
import { commandInterFace } from "../../interfaces/Command";

export const command: commandInterFace = {
  name: "ban",
  description: "Bans a member from the server.",
  usage: "ban [Member] (Reason)",
  args: ["[Member]", "(Reason)"],
  aliases: [],
  guildOnly: true,
  devOnly: true,
  permissions: "BAN_MEMBERS",
  run(message, client, args) {
    message.channel.send(`Arguments: ${args.join(" ")}`);
  },
};
