import { commandInterFace } from "../../interfaces/Command";
import { guildDataBase } from "../../structures/DataBase";
import { GuildDataBaseInterface } from "../../interfaces/GuildDataBase";
import { getGuildDB } from "../../functions/GetGuildDB";
import { prefixEmbed } from "../../structures/Embeds"; // Import Syntax

export const command: commandInterFace = {
  name: "prefix",
  description: "Gets or changes prefix for a server",
  usage: ["prefix (prefix)"],
  example: ["prefix ?", "prefix Orange"],
  args: [
    {
      name: "New Prefix",
      type: ["Prefix"],
      description: "Prefix to change.",
      example: ["$", "z!"],
      required: false,
    },
  ],
  aliases: [],
  guildOnly: true,
  devOnly: false,
  permission: ["MANAGE_GUILD", false],
  async run(
    client,
    message,
    {
      args: {
        parserOutput: { ordered: args, flags, options },
        flag,
        option,
      },
      ...util
    }
  ) {
    let guildDB = util.DB;
    const prefix = args[0]?.value;
    if (prefix) {
      guildDB.prefix = prefix;
      let newDBGUILD: GuildDataBaseInterface = {
        ...guildDB,
      };
      await guildDataBase.set(message.guild.id, newDBGUILD);
      message.say({
        embed: prefixEmbed(client, message.member, util.DB, guildDB.prefix),
      });
    } else {
      message.say({
        embed: prefixEmbed(client, message.member, util.DB),
      });
    }
  },
};
