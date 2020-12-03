import { commandInterFace } from "../../interfaces/Command";
import { clientInfo } from "../../structures/Embeds";
import { Message } from "discord.js";

export const command: commandInterFace = {
  name: "info",
  description: "Shows info of MadBot",
  aliases: ["stats"],
  async run(client, message) {
    message.say({ embed: clientInfo(client, message.author, message.prefix) }); // Sends Client Info Embed
  },
};
