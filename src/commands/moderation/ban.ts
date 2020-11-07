import { commandInterFace } from "../../interfaces/Command";
import { GuildMember } from "discord.js";

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
    if (
      !util.compareRolePostion(
        message.member.roles.highest,
        member.roles.highest
      )
    )
      return;
  },
};
