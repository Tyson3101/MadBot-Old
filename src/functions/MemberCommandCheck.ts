import { Message, TextChannel, PermissionString } from "discord.js";
import { DiscordBot } from "../structures/Client";
import { Command } from "../interfaces/Command";
import {
  dmCommandEmbed,
  ownerCommandEmbed,
  invaildPermissionsMemberCommandEmbed,
  invaildPermissionsBotCommandEmbed,
  noArgsCommandHelpEmbed,
  nsfwCommandEmbed,
} from "../structures/Embeds";

export default function (
  client: DiscordBot,
  message: Message,
  command: Command
) {
  if (command.permission && command.permission[0]) {
    if (command.permission[1] === true) {
      command.permission[1] = command.permission[0];
    }
  }
  if (!message.content.toLowerCase().startsWith(message.prefix.toLowerCase()))
    return;
  if (command.devOnly && !client.developers.has(message.author.id))
    return message.channel.send({
      embed: ownerCommandEmbed(client, message.author),
    });
  if (command.guildOnly && message.isDM)
    return message.channel.send({
      embed: dmCommandEmbed(client, message.author),
    });
  if (!message.isDM && command.nsfw && (message.channel as TextChannel).nsfw)
    return message.channel.send({
      embed: nsfwCommandEmbed(client, message.author),
    });
  if (
    !message.isDM &&
    command.permission &&
    command.permission[0] &&
    !message.member.hasPermission(command.permission[0]) &&
    !(message.channel as TextChannel)
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
    !message.isDM &&
    command.permission &&
    command.permission[1] !== false &&
    !message.guild.me.hasPermission(
      command.permission.slice(1) as PermissionString[]
    ) &&
    !(message.channel as TextChannel)
      .permissionsFor(message.guild.me)
      .has(command.permission.slice(1) as PermissionString[])
  )
    return message.channel.send({
      embed: invaildPermissionsBotCommandEmbed(
        client,
        message.author,
        command.permission.slice(1) as PermissionString[]
      ),
    });
  if (
    command.args &&
    command.args.filter((arg) => arg.required).length > message.args.length
  )
    return message.channel.send({
      embed: noArgsCommandHelpEmbed(
        client,
        message.author,
        command,
        message.prefix
      ),
    });
  return true;
}
