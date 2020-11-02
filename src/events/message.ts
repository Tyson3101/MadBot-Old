import Discord from "discord.js";
import { DiscordBot, client } from "../structures/Client";
import {
  dmCommandEmbed,
  ownerCommandEmbed,
  invaildPermissionsCommandEmbed,
  errorCommandEmbed,
} from "../structures/embeds";
import { MessageEventInterface } from "../interfaces/Events";
let prefix: string = "!";
export const event: MessageEventInterface = {
  event: "message",
  run(message: Discord.Message) {
    if (message.author.bot) return;
    const [commandName, ...args] = message.content
      .toLowerCase()
      .trim()
      .slice(prefix.length)
      .split(/ +/g);
    const command = client.commands.get(commandName)
      ? client.commands.get(commandName)
      : client.commands.find((cmd) => cmd.aliases.includes(commandName));
    if (command) {
      if (command.guildOnly && message.channel.type === "dm")
        return message.channel.send({
          embed: dmCommandEmbed(client, message.author),
        });

      if (command.devOnly && !client.developers.has(message.author.id))
        return message.channel.send({
          embed: ownerCommandEmbed(client, message.author),
        });
      if (
        (command.permission &&
          !message.member.hasPermission(command.permission)) ||
        (message.channel.type !== "dm" &&
          !message.channel
            .permissionsFor(message.member)
            .has(command.permission))
      )
        return message.channel.send({
          embed: invaildPermissionsCommandEmbed(
            client,
            message.author,
            command.permission
          ),
        });
      try {
        command.run(message, client, args);
      } catch (e) {
        return message.channel.send({
          embed: errorCommandEmbed(client, message.author, e),
        });
      }
    }
  },
};
