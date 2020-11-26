import { Message, MessageEmbed, Util as DiscordUtil } from "discord.js";
import { getToEval } from "../../functions/SetUpArgs";
import { commandInterFace } from "../../interfaces/Command";

async function sendEvaledMessage(
  message: Message,
  timeTook: number[],
  toDisplay: string[],
  evaled: string
): Promise<Message | Message[]> {
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
    description: `**Evaled! Took ${timeTook[0] > 0 ? `${timeTook[0]}s` : ""}${
      timeTook[1] / 1e6
    }ms**\n\n**Output**\n\`\`\`js\n${DiscordUtil.escapeMarkdown(
      evaled.slice(0, 1987),
      {
        underline: false,
        bold: false,
        italic: false,
        inlineCode: false,
      }
    )}\n\`\`\``,
    fields: [
      {
        name: "Input",
        value: `\`\`\`js\n${DiscordUtil.escapeMarkdown(
          toDisplay
            .map((str, i) => {
              if (i === toDisplay.length - 1)
                return `${str.trim().replace(/return/g, "")}`;
              else return `${str}`;
            })
            .join("\n")
            .trim(),
          { underline: false, bold: false, italic: false, inlineCode: false }
        )}\n\`\`\``,
      },
    ],

    footer: {
      text: `${client.user.username} ©`,
      iconURL: client.user.displayAvatarURL({ format: "png" }),
    },
  });
  try {
    let msg: Message | Message[] = await message.channel.send(evaledEmbed);
    return msg;
  } catch (e) {
    console.log(e);
  }
}
import { functions } from "../../functions/evalFunctions";

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
  async run(
    client,
    message,
    {
      args: {
        parserOutput: { ordered: args, flags, options },
      },
    }
  ) {
    const toEvalFull = args
      .map((x) => x.raw)
      .join(" ")
      .replace(/```(js)?/g, "");
    let toEval: string;
    let evaled: string;
    let toEvaledSpilt: string[];
    try {
      const startTime = process.hrtime();
      toEvaledSpilt = toEvalFull.split(/\n/g);
      let filterd = toEvaledSpilt.filter((str) => str.length);
      toEval = getToEval(filterd);
      let aboutToEval = `(async () => {\nconst Discord = require('discord.js')\nconst { MessageEmbed, MessageAttachment } = require('discord.js')\n${functions.join(
        "\n"
      )}\n${toEval}\n})()`;
      evaled = await eval(aboutToEval);
      console.log(evaled);
      const timeTook = process.hrtime(startTime);
      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

      if (evaled && !flags.has("i")) {
        await sendEvaledMessage(message, timeTook, toEvaledSpilt, evaled);
      }
    } catch (e) {
      console.log(e);
      message.say(
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
              value: `\`\`\`js\n${DiscordUtil.escapeMarkdown(
                toEvaledSpilt
                  .map((str, i) => {
                    if (i === toEvaledSpilt.length - 1)
                      return `${str.trim().replace(/return/g, "")}`;
                    else return `${str}`.trim();
                  })
                  .join("\n")
                  .trim(),
                {
                  underline: false,
                  bold: false,
                  italic: false,
                  inlineCode: false,
                }
              )}\n\`\`\``,
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
