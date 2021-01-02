import { commandInterFace } from "../../interfaces/Command";
import { guildDataBase } from "../../structures/DataBase";
import { GuildDataBaseInterface } from "../../interfaces/GuildDataBase";
import { prefixEmbed } from "../../structures/Embeds"; // Import Syntax

export const command: commandInterFace = {
  name: "prefix",
  description: "Gets or changes prefix for a server",
  example: ["prefix ?", "prefix Orange"],
  args: [
    {
      name: "New Prefix",
      required: false,
    },
  ],
  aliases: [],
  guildOnly: true,
  devOnly: false,
  permission: ["MANAGE_GUILD", false],
  async run(client, message) {
    let guildDB = message.guild.DB;
    const prefix = message.args[0]?.value;
    if (prefix) {
      guildDB.prefix = prefix;
      let newDBGUILD: GuildDataBaseInterface = {
        ...guildDB,
      };
      await guildDataBase.set(message.guild.id, newDBGUILD);
      message.say({
        embed: prefixEmbed(
          client,
          message.member,
          message.guild.DB,
          guildDB.prefix
        ),
      });
    } else {
      message.say({
        embed: prefixEmbed(client, message.member, message.guild.DB),
      });
    }
  },
};
