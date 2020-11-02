import { commandInterFace } from "../../interfaces/Command";
import { guildDataBase } from "../../structures/DataBase";
import { GuildDataBaseInterface } from "../../interfaces/GuildDataBase";
import { getGuildDB } from "../../functions/getGuildDB";
import { prefixEmbed } from "../../structures/embeds";

export const command: commandInterFace = {
  name: "prefix",
  description: "Gets or changes prefix for a server",
  usage: ["prefix (prefix)"],
  args: [
    {
      name: "Prefix",
      type: ["Prefix"],
      description: "Prefix to change.",
      example: ["?"],
      required: false,
      order: 1,
    },
  ],
  aliases: [],
  guildOnly: true,
  devOnly: false,
  permission: "MANAGE_GUILD",
  async run(message, client, args) {
    let guildDB = await getGuildDB(client, message.guild, guildDataBase);
    let prefix = guildDB.prefix;
    if (args[0]) {
      guildDB.prefix = args[0];
      let newDBGUILD: GuildDataBaseInterface = {
        ...guildDB,
      };
      await guildDataBase.set(message.guild.id, newDBGUILD);
      message.channel.send(
        prefixEmbed(
          client,
          message.member,
          await getGuildDB(client, message.guild, guildDataBase),
          args[0]
        )
      );
    } else {
      message.channel.send(
        prefixEmbed(
          client,
          message.member,
          await getGuildDB(client, message.guild, guildDataBase)
        )
      );
    }
  },
};
