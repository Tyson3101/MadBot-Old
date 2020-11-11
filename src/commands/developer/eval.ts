/*
import { commandInterFace } from "../../interfaces/Command";
import Discord from "discord.js";
export const command: commandInterFace = {
  name: "eval",
  description: "Evals Javascript",
  usage: ["eval \\`\\`\\`js code \\`\\`\\`"],
  example: ["eval \\`\\`\\`js console.log(63 + 53) \\`\\`\\`"],
  args: [
    {
      name: "code",
      description: "code to eval",
      type: "Code",
      required: true,
      example: ["\\`\\`\\`js console.log(true)\\`\\`\\`"],
    },
  ],
  aliases: ["evaljs"],
  devOnly: true,
  async run(client, message, { args, ...util }) {
    try {
      let codein = args.join(" ");
      let code = eval(`(async () => {\n${codein}\n})()`);
      if (typeof code !== "string")
        code = require("util").inspect(code, { depth: 0 });
      let embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor(message.guild.me.displayColor)
        .addField("Input", `\`\`\`js\n${codein}\`\`\``)
        .addField("Output", `\`\`\`js\n${code}\n\`\`\``);
      return message.channel.send(embed);
    } catch (e) {
      return message.channel.send(`\`\`\`js\n${e}\n\`\`\``);
    }
  },
};
*/
