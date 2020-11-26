import commandCheck from "../functions/MemberCommandCheck";
import { guildDataBase } from "../structures/DataBase";
import { getGuildDB } from "../functions/GetGuildDB";
import { errorCommandEmbed, clientInfo } from "../structures/Embeds";
import { MessageEventInterface } from "../interfaces/Events";
import { setUpArgs } from "../functions/SetUpArgs";
import { GuildDataBaseInterface } from "../interfaces/GuildDataBase";

export const event: MessageEventInterface = {
  event: "message",
  async run(client, message) {
    if (message.author.bot) return;
    console.log(
      `Message Type: ${message.type}\nMessage Content: ${message.content}\n${
        message.author ? `Message Author: ${message.author.username}` : ""
      }`
    );
    let prefix: string = client.prefix;
    let guildDB: GuildDataBaseInterface;
    guildDB = await getGuildDB(client, message.guild, guildDataBase); // Gets Guild DataBase
    prefix = guildDB.prefix;
    if (message.channel.type !== "dm" && message.guild) {
      if (
        !message.channel.permissionsFor(message.guild.me).has(["SEND_MESSAGES"])
      )
        return;
    }
    const [commandName, , Util] = setUpArgs(client, message, guildDB);
    const command = client.commands.get(commandName)
      ? client.commands.get(commandName)
      : client.commands.find((cmd) =>
          cmd.aliases ? cmd.aliases.includes(commandName) : false
        );

    if (
      (message.channel.type !== "dm" && command) ||
      (message.channel.type !== "dm" &&
        message.mentions.users.has(client.user.id))
    ) {
      if (
        !message.guild.me.hasPermission("EMBED_LINKS") &&
        !message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS")
      ) {
        return message.say(
          `:x: I need the "EMBED_LINKS" Permission to send the embeds :x:`
        );
      }
    }
    if (command) {
      let vaildMember = commandCheck(client, message, Util, command);
      if (vaildMember !== true) return;
      try {
        command.run(client, message, Util);
        return;
      } catch (e) {
        console.log(e);
        return message.say({
          embed: errorCommandEmbed(client, message.author, e),
        });
      }
    }
    if (
      Util.DB.tags &&
      message.content.startsWith(prefix) &&
      Util.DB.tags[
        commandName.toLowerCase() +
          " " +
          Util.args.parserOutput.ordered
            .map((x) => x.raw)
            .join(" ")
            .toLowerCase()
      ]
    ) {
      return message.say(
        Util.DB.tags[
          commandName.toLowerCase() +
            " " +
            Util.args.parserOutput.ordered
              .map((x) => x.raw)
              .join(" ")
              .toLowerCase()
        ].reply
      );
    }
    if (message.mentions.users.has(client.user.id))
      return message.say({
        embed: clientInfo(client, message.author, guildDB.prefix),
      });
  },
};
