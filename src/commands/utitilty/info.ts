import { commandInterFace } from "../../interfaces/Command";
import { clientInfo } from "../../structures/Embeds";
import { GuildDataBaseInterface } from "../../interfaces/GuildDataBase";
import { getGuildDB } from "../../functions/GetGuildDB";

export const command: commandInterFace = {
  name: "info",
  description: "Shows info of MadBot",
  usage: ["info"],
  example: null,
  args: [],
  aliases: ["stats"],
  guildOnly: false,
  devOnly: false,
  async run(client, message, util) {
    const { prefix } = util;
    message.channel.send(clientInfo(client, message.author, prefix)); // Sends Client Info Embed
  },
};
