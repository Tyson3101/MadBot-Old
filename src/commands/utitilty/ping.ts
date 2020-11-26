import { commandInterFace } from "../../interfaces/Command";
import { pingEmbed } from "../../structures/Embeds"; // Import Syntax

export const command: commandInterFace = {
  name: "ping",
  description: "Shows the API Latency.",
  usage: ["ping"],
  example: ["ping"],
  aliases: ["latency"],
  guildOnly: false,
  devOnly: false,
  async run(
    client,
    message,
    {
      args: {
        parserOutput: { ordered: args, flags, options },
        flag,
        option,
      },
      ...util
    }
  ) {
    let latency: string = Date.now() - message.createdTimestamp + "ms";
    let ping: string = client.ws.ping + "ms";
    message.say({
      embed: pingEmbed(client, message.author, {
        latency: latency,
        ping: ping,
      }),
    });
  },
};
