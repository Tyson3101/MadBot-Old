import { Command } from "../../interfaces/Command";
import ytdl from "ytdl-core";

export const command: Command = {
  name: "play",
  description: "Plays Song",
  args: [
    {
      name: "Song",
      type: "STRING",
      description: "Song to play",
      required: true,
    },
  ],
  async run(message) {},
};
