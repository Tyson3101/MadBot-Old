import { Guild, Message, MessageEmbed, Util as DiscordUtil } from "discord.js";
import { commandInterFace } from "../../interfaces/Command";

export const command: commandInterFace = {
  name: "eval--i",
  aliases: ["code--i", "eval--i"],
  args: [
    {
      name: "Code To Eval",
      type: "Code",
      required: true,
    },
  ],
  devOnly: true,
  async run(client, message, { args, ...util }) {
    const toEvalFull = args.join(" ").replace(/```(js)?/g, "");
    let toEval: string;
    let evaled: string;
    let toEvaledSpilt: string[];
    try {
      const startTime = process.hrtime();
      toEvaledSpilt = toEvalFull.split(/\n/g);
      if (toEvaledSpilt.length <= 3) {
        toEval = (toEvaledSpilt[1]
          ? toEvaledSpilt[1].replace(/return/g, "")
          : toEvaledSpilt[0].replace(/return/g, "")
        ).trim();
        evaled = await eval(`(async () => ${toEval})()`);
      } else {
        let filterd = toEvaledSpilt.filter((str) => str.length);
        toEval = filterd
          .map((str) => {
            if (filterd[filterd.length - 1] === str) {
              if (filterd[filterd.length - 1].includes("return")) return str;
              else return `return ${filterd[filterd.length - 1]}`;
            } else return `${str}\n`;
          })
          .join(" ")
          .trim();
        evaled = await eval(`(async () => {\n${toEval}\n})()`);
      }
    } catch {
      //
    }
  },
};
