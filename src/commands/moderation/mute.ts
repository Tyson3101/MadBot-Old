import Discord, {
  MessageEmbed,
  MessageAttachment,
  GuildMember,
} from "discord.js";
import { commandInterFace } from "../../interfaces/Command";
import { invaildPermissionsCustom } from "../../structures/embeds";

export const command: commandInterFace = {
  name: "mute",
  description: "Mute a members",
  args: [
    {
      name: "Member/ID to Mute",
      description: "Member to mute.",
      type: ["User Mention", "UserID"],
      required: true,
    },
    {
      name: "Time",
      description: "Time to mute for.",
      type: ["Time"],
      required: true,
    },
    {
      name: "Reason",
      type: "Reason",
      description: "Reason for the mute",
      example: ["Advertising", "Being Rude"],
      required: false,
    },
  ],
  async run(client, message, util) {
    let { args } = util;
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
    }
    if (
      !member.manageable ||
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
  },
};
