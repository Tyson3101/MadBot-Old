import { commandInterFace } from "../../interfaces/Command";
import { pingEmbed } from "../../structures/Embeds"; // Import Syntax

export const command: commandInterFace = {
  name: "ping",
  description: "Shows the API Latency.",
  usage: ["ping"],
  example: ["ping"],
  args: [],
  aliases: ["latency"],
  guildOnly: false,
  devOnly: false,
  async run(client, message, args) {
    let latency: string = Date.now() - message.createdTimestamp + "ms";
    let ping: string = client.ws.ping + "ms";
    message.channel.send({
      embed: pingEmbed(client, message.author, {
        latency: latency,
        ping: ping,
      }),
    });
  },
};
