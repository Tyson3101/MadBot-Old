import { Command } from "../../interfaces/Command";
import { pingEmbed } from "../../structures/Embeds"; // Import Syntax

export const command: Command = {
  name: "ping",
  description: "Shows the API Latency.",
  example: ["ping"],
  aliases: ["latency"],
  guildOnly: false,
  devOnly: false,
  async run(message) {
    let latency: string = Date.now() - message.createdTimestamp + "ms";
    let ping: string = this.client.ws.ping + "ms";
    message.say({
      embed: pingEmbed(this.client, message.author, {
        latency: latency,
        ping: ping,
      }),
    });
  },
};
