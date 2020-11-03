import { commandInterFace } from "../../interfaces/Command";
import Discord from "discord.js";
import util, { inspect } from "util";
export const command: commandInterFace = {
  name: "eval",
  description: "Evals Javascript",
  usage: ["eval \\`\\`\\`js code \\`\\`\\`"],
  args: [
    {
      name: "code",
      description: "code to eval",
      type: "Code",
      required: true,
      example: ["\\`\\`\\`js console.log(true)\\`\\`\\`"],
      order: 1,
    },
  ],
  aliases: ["evaljs"],
  guildOnly: false,
  devOnly: true,
  async run(client, message, args) {
    console.log(this.args);
  },
};
