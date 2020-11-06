import Discord, { TextChannel } from "discord.js";
import { guildDataBase } from "../structures/DataBase";
import { getGuildDB } from "../functions/GetGuildDB";
import {
  dmCommandEmbed,
  ownerCommandEmbed,
  invaildPermissionsMemberCommandEmbed,
  invaildPermissionsBotCommandEmbed,
  errorCommandEmbed,
  noArgsCommandHelpEmbed,
  clientInfo,
} from "../structures/Embeds";
import { MessageEventInterface } from "../interfaces/Events";
import setUpArgs from "../functions/SetUpArgs";
export const event: MessageEventInterface = {
  event: "message",
  async run(client, message) {
    if (message.author.bot) return;
    let prefix: string = "!";
    let guildDB;
    if (message.channel.type !== "dm") {
      guildDB = await getGuildDB(client, message.guild, guildDataBase); // Gets Guild DataBase
      prefix = guildDB.prefix;
      if (
        !message.channel.permissionsFor(message.guild.me).has(["SEND_MESSAGES"])
      )
        return;
      else if (
        !message.channel.permissionsFor(message.guild.me).has(["EMBED_LINKS"])
      ) {
        return message.channel.send(
          `:x: I need the "EMBED_LINKS" Permission to send embeds! :x:`
        );
      }
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
    if (command) {
      if (command.permission && command.permission[0]) {
        if (command.permission[1] === true) {
          command.permission[1] = command.permission[0];
        }
      }
      if (!message.content.toLowerCase().startsWith(prefix.toLowerCase()))
        return;
      if (command.guildOnly && message.channel.type === "dm")
        return message.channel.send({
          embed: dmCommandEmbed(client, message.author),
        });

      if (command.devOnly && !client.developers.has(message.author.id))
        return message.channel.send({
          embed: ownerCommandEmbed(client, message.author),
        });
      if (
        message.channel.type !== "dm" &&
        command.permission &&
        command.permission[0] &&
        !message.member.hasPermission(command.permission[0]) &&
        !message.channel
          .permissionsFor(message.member)
          .has(command.permission[0])
      )
        return message.channel.send({
          embed: invaildPermissionsMemberCommandEmbed(
            client,
            message.author,
            command.permission[0]
          ),
        });
      if (
        message.channel.type !== "dm" &&
        command.permission &&
        command.permission[1] !== false &&
        !message.guild.me.hasPermission(
          command.permission[1] as Discord.PermissionString
        ) &&
        !message.channel
          .permissionsFor(message.guild.me)
          .has(command.permission[1] as Discord.PermissionString)
      )
        return message.channel.send({
          embed: invaildPermissionsBotCommandEmbed(
            client,
            message.author,
            command.permission[1] as Discord.PermissionString
          ),
        });
      if (command.args.filter((arg) => arg.required).length > args.length)
        return message.channel.send({
          embed: noArgsCommandHelpEmbed(
            client,
            message.author,
            command,
            prefix
          ),
        });
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
