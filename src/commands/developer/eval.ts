import { Guild, Message, MessageEmbed, Util as DiscordUtil } from "discord.js";
import { commandInterFace } from "../../interfaces/Command";
import { GuildDataBaseInterface } from "../../interfaces/GuildDataBase";
import { guildDataBase } from "../../structures/DataBase";

async function sendEvaledMessage(
  message: Message,
  timeTook: number[],
  toDisplay: string,
  evaled: string
): Promise<Message> {
  const { client } = message;
  let evaledEmbed = new MessageEmbed({
    author: {
      name: message.author.tag,
      iconURL: message.author.displayAvatarURL({
        format: "png",
        dynamic: true,
      }),
    },
    color: "DARK_VIVID_PINK",
    title: "Evaled Code",
    description: `**Evaled in ${timeTook[0] > 0 ? `${timeTook[0]}s` : ""}${
      timeTook[1] / 1e6
    }ms**`,
    fields: [
      {
        name: "Input",
        value: `\`\`\`js\n${DiscordUtil.escapeMarkdown(toDisplay)}\n\`\`\``,
      },
      {
        name: "Output",
        value: `\`\`\`js\n${DiscordUtil.escapeMarkdown(
          evaled.slice(0, 1012)
        )}\n\`\`\``,
      },
    ],
    footer: {
      text: `${client.user.username} ©`,
      iconURL: client.user.displayAvatarURL({ format: "png" }),
    },
  });
  try {
    let msg = await message.channel.send(evaledEmbed);
    return msg;
  } catch {
    //'a'
  }
}

export const command: commandInterFace = {
  name: "eval",
  aliases: ["code"],
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
    let toDisplay: string;
    try {
      const startTime = process.hrtime();
      let toEvaledSpilt = toEvalFull.split(/\n/g);
      if (toEvaledSpilt.length <= 3) {
        toEval = (toEvaledSpilt[1]
          ? toEvaledSpilt[1].replace(/return/g, "")
          : toEvaledSpilt[0].replace(/return/g, "")
        ).trim();
        evaled = await eval(`(async () => ${toEval})()`);
        toDisplay = toEval
          .split(/\n/g)
          .map((str) => str.trim())
          .join("\n".trim())
          .replace(/return/g, "")
          .trim();
      } else {
        let filterd = toEvaledSpilt.filter(
          (str) =>
            ![0, toEvaledSpilt.length - 1].includes(
              toEvaledSpilt.findIndex((ind) => ind === str)
            ) && str.length
        );
        toEvaledSpilt[toEvaledSpilt.length - 2];
        toEval = filterd
          .map((str) => {
            if (filterd[filterd.length - 1] === str) {
              if (filterd[filterd.length - 1].includes("return")) return str;
              else return `return ${filterd[filterd.length - 1]}`;
            } else return `${str}\n`;
          })
          .join(" ")
          .trim();
        let toAlmostDisplay = toEval.split(/\n/g).map((str) => str.trim());
        toAlmostDisplay[toAlmostDisplay.length - 1] = toAlmostDisplay[
          toAlmostDisplay.length - 1
        ].replace(/return/g, "");
        toDisplay = toAlmostDisplay
          .map((str) => str.trim())
          .join("\n")
          .trim();
        evaled = await eval(`(async () => {\n${toEval}\n})()`);
      }
      const timeTook = process.hrtime(startTime);
      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

      if (evaled) {
        await sendEvaledMessage(message, timeTook, toDisplay, evaled);
      }
    } catch (e) {
      message.channel.send(
        new MessageEmbed({
          author: {
            name: message.author.tag,
            iconURL: message.author.displayAvatarURL({
              format: "png",
              dynamic: true,
            }),
          },
          color: "DARK_VIVID_PINK",
          title: "Evaled Code",
          fields: [
            {
              name: "Input",
              value: `\`\`\`js\n${toDisplay}\n\`\`\``,
            },
            {
              name: "Output",
              value: `\`\`\`js\n${e}\n\`\`\``,
            },
          ],
          footer: {
            text: `${client.user.username} ©`,
            iconURL: client.user.displayAvatarURL({ format: "png" }),
          },
        })
      );
    }
  },
};
