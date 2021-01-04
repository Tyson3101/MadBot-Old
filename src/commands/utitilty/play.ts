import { Command } from "../../interfaces/Command";
import { pingEmbed } from "../../structures/Embeds"; // Import Syntax
import ytdl from "ytdl-core";

export const command: Command = {
  name: "play",
  description: "Plays Song",
  async run(message) {
    message?.member?.voice?.channel?.join().then((connection) => {
      try {
        connection.play(ytdl(message.plainArgs[0]));
      } catch {
        //..
      }
    });
  },
};
