import { Command } from "../../interfaces/Command";
import { pingEmbed } from "../../structures/Embeds"; // Import Syntax

export const command: Command = {
  name: "ping",
  description: "Shows the API Latency.",
  example: ["ping"],
  aliases: ["latency"],
  guildOnly: false,
  devOnly: false,
  async run(client, message) {
    let latency = Date.now() - message.createdTimestamp + "ms";
    let ping = client.ws.ping + "ms";
    message.say({
      embed: pingEmbed(client, message.author, {
        latency: latency,
        ping: ping,
      }),
    });
  },
};
