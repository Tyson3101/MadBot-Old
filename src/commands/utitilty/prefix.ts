import { Command } from "../../interfaces/Command";
import { GuildDataBase } from "../../structures/DataBase";
import { prefixEmbed } from "../../structures/Embeds"; // Import Syntax

export const command: Command = {
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
  async run(message) {
    let guildDB = message.guild.DB;
    const prefix = message.args[0]?.value;
    if (prefix) {
      guildDB.prefix = prefix;
      let newDBGUILD: GuildDataBase = {
        ...guildDB,
      };
      await this.client.guildDB.set(
        message.guild.id,
        new GuildDataBase(message.guild, newDBGUILD)
      );
      message.say({
        embed: prefixEmbed(
          this.client,
          message.member,
          message.guild.DB,
          guildDB.prefix
        ),
      });
    } else {
      message.say({
        embed: prefixEmbed(this.client, message.member, message.guild.DB),
      });
    }
  },
};
