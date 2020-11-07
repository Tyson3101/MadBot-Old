import { commandInterFace } from "../../interfaces/Command";
import { GuildMember } from "discord.js";
import { invaildPermissionsCustom } from "../../structures/embeds";
import { guildDataBase } from "../../structures/DataBase";
import {
  GuildDataBaseInterface,
  infringementInterface,
} from "../../interfaces/GuildDataBase";

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
    console.log("Command ran");
    if (member.id === message.guild.ownerID)
      return message.channel.send({
        embed: invaildPermissionsCustom(
          client,
          message.author,
          `I can't perform this action on this member.`
        ),
      });
    console.log("First if statement");
    if (member.id === client.user.id)
      return message.channel.send({
        embed: invaildPermissionsCustom(
          client,
          message.author,
          `I can't perform this action on this member.`
        ),
      });
    console.log("2nd if statement");
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
      console.log("3rd if statement");
    }
    console.log("4th if statement");
    let reason = "[BAN] No reason provided.";
    if (args[1]) reason = args[1];
    // infringementInterface>
    let banCaseCount = util.DB.moderation.bans.size;
    let caseCaseCount = util.DB.moderation.all.size;
    const moderationDB: infringementInterface = {
      victim: member.user,
      moderator: message.author,
      reason: reason,
      banCaseCount: banCaseCount + 1,
      caseCount: caseCaseCount + 1,
      infringementType: "BAN",
    };
    console.log(util.DB.moderation.all);
    console.log(util.DB.moderation.bans);
    console.log(util.DB.moderation.kicks);
    //util.DB.moderation.all.set(member.id, moderationDB);
    //util.DB.moderation.bans.set(member.id, moderationDB);
    //util.DB.moderation.caseCount += 1;
    //await guildDataBase.set(message.guild.id, { ...util.DB });
    member
      .send(`You have been banned from ${message.guild.name} for "${reason}".`)
      .catch((e) => e);
    //await member.ban({ reason: reason, days: 7 });
  },
};
