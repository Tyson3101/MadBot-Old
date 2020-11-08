import { Message, TextChannel, PermissionString } from "discord.js";
import { DiscordBot } from "../structures/Client";
import { commandInterFace } from "../interfaces/Command";
import {
  dmCommandEmbed,
  ownerCommandEmbed,
  invaildPermissionsMemberCommandEmbed,
  invaildPermissionsBotCommandEmbed,
  noArgsCommandHelpEmbed,
  nsfwCommandEmbed,
} from "../structures/Embeds";
import { utilObjInterface } from "../interfaces/Args";

export default function (
  client: DiscordBot,
  message: Message,
  util: utilObjInterface,
  command: commandInterFace
) {
  if (command.permission && command.permission[0]) {
    if (command.permission[1] === true) {
      command.permission[1] = command.permission[0];
    }
  }
  if (!message.content.toLowerCase().startsWith(util.prefix.toLowerCase()))
    return;
  if (command.devOnly && !client.developers.has(message.author.id))
    return message.channel.send({
      embed: ownerCommandEmbed(client, message.author),
    });
  if (command.guildOnly && message.channel.type === "dm")
    return message.channel.send({
      embed: dmCommandEmbed(client, message.author),
    });
  if (message.channel.type !== "dm" && command.nsfw && message.channel.nsfw)
    return message.channel.send({
      embed: nsfwCommandEmbed(client, message.author),
    });
  if (
    message.channel.type !== "dm" &&
    command.permission &&
    command.permission[0] &&
    !message.member.hasPermission(command.permission[0]) &&
    !message.channel.permissionsFor(message.member).has(command.permission[0])
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
      command.permission[1] as PermissionString
    ) &&
    !message.channel
      .permissionsFor(message.guild.me)
      .has(command.permission[1] as PermissionString)
  )
    return message.channel.send({
      embed: invaildPermissionsBotCommandEmbed(
        client,
        message.author,
        command.permission[1] as PermissionString
      ),
    });
  if (command.args?.filter((arg) => arg.required).length > util.args.length)
    return message.channel.send({
      embed: noArgsCommandHelpEmbed(
        client,
        message.author,
        command,
        util.prefix
      ),
    });
  return true;
}
