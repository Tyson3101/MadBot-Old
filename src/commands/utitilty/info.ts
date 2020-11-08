import { commandInterFace } from "../../interfaces/Command";
import { clientInfo } from "../../structures/Embeds";
import { GuildDataBaseInterface } from "../../interfaces/GuildDataBase";
import { getGuildDB } from "../../functions/GetGuildDB";

export const command: commandInterFace = {
  name: "info",
  description: "Shows info of MadBot",
  aliases: ["stats"],
  async run(client, message, util) {
    const { prefix } = util;
    message.channel.send({ embed: clientInfo(client, message.author, prefix) }); // Sends Client Info Embed
  },
};
