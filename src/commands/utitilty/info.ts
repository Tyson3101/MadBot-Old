import { commandInterFace } from "../../interfaces/Command";
import { clientInfo } from "../../structures/Embeds";
import { GuildDataBaseInterface } from "../../interfaces/GuildDataBase";
import { getGuildDB } from "../../functions/GetGuildDB";
import { Message } from "discord.js";

export const command: commandInterFace = {
  name: "info",
  description: "Shows info of MadBot",
  aliases: ["stats"],
  async run(
    client,
    message: Message,
    {
      args: {
        parserOutput: { ordered: args, flags, options },
        flag,
        option,
      },
      ...util
    }
  ) {
    const { prefix } = util;
    message.say({ embed: clientInfo(client, message.author, prefix) }); // Sends Client Info Embed
  },
};
