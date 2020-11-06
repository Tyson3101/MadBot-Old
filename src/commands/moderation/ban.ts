import { commandInterFace } from "../../interfaces/Command";
import {
  Structures,
  TextChannel,
  DMChannel,
  NewsChannel,
  User,
} from "discord.js";
import { DiscordBot } from "../../structures/Client";
import { noArgsCommandHelpEmbed } from "../../structures/embeds";
import { getGuildDB } from "../../functions/getGuildDB";

export const command: commandInterFace = {
  name: "ban",
  description: "Bans a member from the server.",
  usage: ["ban [Member] (Reason)"],
  example: ["ban @Tyson Dm Advertising"],
  args: [
    {
      name: "Member",
      type: ["Member", "ID"],
      description: "Member to ban",
      example: ["**Mention:** @Tyson", "**ID:** 397737988915724310"],
      required: true,
      order: 1,
    },
    {
      name: "Reason",
      type: "Reason",
      description: "Reason for the ban",
      example: ["Advertising", "Being Rude"],
      required: false,
      order: 2,
    },
  ],
  aliases: [],
  guildOnly: true,
  devOnly: false,
  permission: ["BAN_MEMBERS", true],
  async run(client, message, { args, ...util }) {
    let user: User;
    try {
      user = await util.getUser(args[0]);
    } catch {
      return message.channel.send({
        embed: noArgsCommandHelpEmbed(
          client,
          message.author,
          util.command,
          util.prefix
        ),
      });
    }
    message.channel.send(`Arguments: ${user}`);
    // Need to create Command
  },
};
