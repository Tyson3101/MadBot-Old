import { commandInterFace } from "../../interfaces/Command";
import { clientInfo } from "../../structures/Embeds";

export const command: commandInterFace = {
  name: "info",
  description: "Shows info of MadBot",
  usage: ["info"],
  args: [],
  aliases: [],
  guildOnly: false,
  devOnly: false,
  run(message, client) {
    message.channel.send(clientInfo(client, message.author));
  },
};
