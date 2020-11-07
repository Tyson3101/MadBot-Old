import Discord, { TextChannel } from "discord.js";
import commandCheck from "../functions/MemberCommandCheck";
import { guildDataBase } from "../structures/DataBase";
import { getGuildDB } from "../functions/GetGuildDB";
import { errorCommandEmbed, clientInfo } from "../structures/Embeds";
import { MessageEventInterface } from "../interfaces/Events";
import setUpArgs from "../functions/SetUpArgs";
export const event: MessageEventInterface = {
  event: "message",
  async run(client, message) {
    if (message.author.bot) return;
    let prefix: string = "!";
    let guildDB;
    guildDB = await getGuildDB(client, message.guild, guildDataBase); // Gets Guild DataBase
    prefix = guildDB.prefix;
    if (message.channel.type !== "dm") {
      if (
        !message.channel.permissionsFor(message.guild.me).has(["SEND_MESSAGES"])
      )
        return;
    } // Checks Prefix

    const [commandNameUPPERCASE, args, Util] = setUpArgs(
      client,
      message,
      guildDB
    );
    const commandName = commandNameUPPERCASE.toLowerCase();
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
        return message.channel.send(
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
        return message.channel.send({
          embed: errorCommandEmbed(client, message.author, e),
        });
      }
    }
    if (message.mentions.users.has(client.user.id))
      return message.channel.send({
        embed: clientInfo(client, message.author, guildDB.prefix),
      });
  },
};
