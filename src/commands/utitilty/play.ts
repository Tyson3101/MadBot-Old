import { Command } from "../../interfaces/Command";
import ytdl from "ytdl-core";

export const command: Command = {
  name: "play",
  description: "Plays Song",
  async run(client, message) {
    message?.member?.voice?.channel?.join().then((connection) => {
      try {
        connection.play(ytdl(message.plainArgs[0]));
      } catch {
        //..
      }
    });
  },
};
