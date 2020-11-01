import { commandInterFace } from "../../interfaces/Command";
import { Message, MessageEmbed } from "discord.js";

export const command: commandInterFace = {
  name: "gay",
  description: "Shows how gay someone is",
  usage: "ban (Member)",
  args: [],
  aliases: [],
  guildOnly: false,
  devOnly: false,
  run(message, client, args) {
    message.channel.send("You are gay.");
  },
};
