import { commandInterFace } from "../../interfaces/Command";
import { GuildMember } from "discord.js";
import { invaildPermissionsCustom } from "../../structures/embeds";
import { guildDataBase } from "../../structures/DataBase";
import { GuildDataBaseInterface } from "../../interfaces/GuildDataBase";

export const command: commandInterFace = {
  name: "ban",
  description: "Bans a member from the server.",
  usage: ["ban [Member] (Reason)"],
  example: ["ban @Tyson Dm Advertising"],
  nsfw: true,
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
  permission: ["BAN_MEMBERS", true],
  async run(client, message, { args, ...util }) {
    let member: GuildMember = await util.getMember(args[0]);
    if (!member) return;
    if (member.id === message.guild.ownerID)
      return message.channel.send({
        embed: invaildPermissionsCustom(
          client,
          message.author,
          `I can't perform this action on this member.`
        ),
      });
    if (member.id === client.user.id)
      return message.channel.send({
        embed: invaildPermissionsCustom(
          client,
          message.author,
          `I can't perform this action on this member.`
        ),
      });
    if (message.member.id !== message.guild.ownerID) {
      if (
        !util.compareRolePostion(
          message.member.roles.highest,
          member.roles.highest
        )
      )
        return;
      if (
        !member.bannable ||
        util.compareRolePostion(
          message.guild.me.roles.highest,
          member.roles.highest,
          true
        )
      )
        return message.channel.send({
          embed: invaildPermissionsCustom(
            client,
            message.author,
            `I can't perform this action on this member.`
          ),
        });
    }
    let reason = "[BAN] No reason provided.";
    if (args[1]) reason = args[1];
    util.DB;
    const newDB: GuildDataBaseInterface = {
      ...util.DB,
    };
    await guildDataBase.set(message.guild.id, newDB);
  },
};
