import { commandInterFace } from "../../interfaces/Command";
import { GuildMember, MessageEmbed } from "discord.js";
import {
  errorCommandEmbed,
  invaildPermissionsCustom,
  sucessPunishEmbed,
} from "../../structures/embeds";
import { guildDataBase } from "../../structures/DataBase";
import { infringementInterface } from "../../interfaces/GuildDataBase";
import { getTypeCaseCount } from "../../functions/getGuildDB";

export const command: commandInterFace = {
  name: "ban",
  description: "Bans a member from the server.",
  usage: ["ban [Member] (Reason)"],
  example: ["ban @Tyson Dm Advertising"],
  args: [
    {
      name: "Member",
      type: ["User Mention", "UserID"],
      description: "Member to ban",
      example: ["**Mention:** @Tyson", "**ID:** 397737988915724310"],
      required: true,
    },
    {
      name: "Reason",
      type: "Reason",
      description: "Reason for the ban",
      example: ["Advertising", "Being Rude"],
      required: false,
    },
  ],
  aliases: [],
  permission: ["BAN_MEMBERS", true],
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
    let reason = "No reason provided.";
    if (args[1]) reason = args.slice(1).join(" ");
    let typeCaseCount = getTypeCaseCount("BAN", util.DB) + 1;
    let caseCount = ++util.DB.moderation.caseCount;
    let backUpDB = { ...util.DB };
    const moderationDB: infringementInterface = {
      guildID: message.guild.id,
      victim: {
        id: member.id,
        username: member.user.username,
        tag: member.user.tag,
      },
      moderator: {
        id: message.author.id,
        username: message.author.username,
        tag: message.author.tag,
      },
      reason: reason,
      typeCaseCount: typeCaseCount,
      caseCount: caseCount,
      infringementType: "BAN",
    };

    util.DB.moderation.bans[member.id]
      ? util.DB.moderation.bans[member.id].push(moderationDB)
      : (util.DB.moderation.bans[member.id] = [moderationDB]);
    util.DB.moderation.all[member.id]
      ? util.DB.moderation.all[member.id].push(moderationDB)
      : (util.DB.moderation.all[member.id] = [moderationDB]);
    await guildDataBase.set(message.guild.id, { ...util.DB });
    member
      .send({
        embed: new MessageEmbed({
          author: {
            name: member.user.tag,
            iconURL: member.user.displayAvatarURL({
              format: "png",
              dynamic: true,
            }),
          },
          color: "DARK_VIVID_PINK",
          thumbnail: {
            url:
              message.guild.iconURL({ format: "png", dynamic: true }) ||
              client.user.displayAvatarURL({ format: "png" }),
          },
          title: `Banned from ${message.guild.name}`,
          description: `You have been banned from ${message.guild.name} for "${reason}".\nYou were banned by ${message.author.tag}.`,
          footer: {
            text: `${client.user.username} ©`,
            iconURL: client.user.displayAvatarURL({ format: "png" }),
          },
        }),
      })
      .catch((e) => e);
    try {
      await member.ban({ reason: reason });
      await message.channel.send({
        embed: sucessPunishEmbed(client, member.user, util, {
          title: "Banned!",
          reason: reason,
          casenumber: caseCount,
        }),
      });
    } catch (e) {
      console.log(e);
      message.channel.send({
        embed: errorCommandEmbed(client, message.author, null),
      });
      await guildDataBase.set(message.guild.id, backUpDB);
    }
  },
};
