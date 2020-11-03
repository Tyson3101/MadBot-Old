import { commandInterFace } from "../../interfaces/Command";
import { clientInfo } from "../../structures/Embeds";

export const command: commandInterFace = {
  name: "info",
  description: "Shows info of MadBot",
  usage: ["info"],
  args: [],
  aliases: ["stats"],
  guildOnly: false,
  devOnly: false,
  run(client, message) {
    message.channel.send(clientInfo(client, message.author)); // Sends Client Info Embed
  },
};
