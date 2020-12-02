import { commandInterFace } from "../../interfaces/Command";
import { GuildMember, MessageEmbed, Message } from "discord.js";
import {
  errorCommandEmbed,
  invaildPermissionsCustom,
  sucessPunishEmbed,
} from "../../structures/embeds";
import { guildDataBase } from "../../structures/DataBase";
import { infringementInterface } from "../../interfaces/GuildDataBase";

export const command: commandInterFace = {
  name: "kick",
  description: "Kicks a member from the server.",
  usage: ["kick [Member] (Reason)"],
  example: ["kick @Tyson Dm Advertising"],
  guildOnly: true,
  args: [
    {
      name: "Member",
      type: ["User Mention", "UserID"],
      description: "Member to kick",
      example: ["**Mention:** @Tyson", "**ID:** 397737988915724310"],
      required: true,
    },
    {
      name: "Reason",
      type: "Reason",
      description: "Reason for the kick",
      example: ["Advertising", "Being Rude"],
      required: false,
    },
  ],
  aliases: [],
  permission: ["KICK_MEMBERS", true],
  async run(
    client,
    {
      argsUtil: {
        parserOutput: { flags, options },
        flag,
        option,
      },
      args,
      ...message
    }
  ) {
    let member: GuildMember = await message.getMember(args[0]?.value);
    if (!member) return;
    if (member.id === message.guild.ownerID)
      return message.say({
        embed: invaildPermissionsCustom(
          client,
          message.author,
          `I can't perform this action on this member.`
        ),
      });
    if (member.id === client.user.id)
      return message.say({
        embed: invaildPermissionsCustom(
          client,
          message.author,
          `I can't perform this action on this member.`
        ),
      });
    if (message.member.id !== message.guild.ownerID) {
      if (
        !message.compareRolePostion(
          message.member.roles.highest,
          member.roles.highest
        )
      )
        return;
    }
    if (
      !member.kickable ||
      !message.compareRolePostion(
        message.guild.me.roles.highest,
        member.roles.highest,
        true
      )
    )
      return message.say({
        embed: invaildPermissionsCustom(
          client,
          message.author,
          `I can't perform this action on this member.`
        ),
      });
    let reason = "No reason provided.";
    if (args[1].value)
      reason = args
        .map((x) => x.raw)
        .slice(1)
        .join(" ");
    let backUpDB = { ...message.DB };
    let typeCaseCount = client.getTypeCaseCount("KICK", message.DB) + 1;
    let caseCount = ++message.DB.moderation.caseCount;
    const moderationDB: infringementInterface = {
      guildID: message.guild.id,
      victim: member.id,
      moderator: message.author.id,
      reason: reason,
      typeCaseCount: typeCaseCount,
      caseCount: caseCount,
      startDate: new Date(),
      infringementType: "KICK",
    };

    message.DB.moderation.kicks[member.id]
      ? message.DB.moderation.kicks[member.id].push(moderationDB)
      : (message.DB.moderation.kicks[member.id] = [moderationDB]);
    message.DB.moderation.all[member.id]
      ? message.DB.moderation.all[member.id].push(moderationDB)
      : (message.DB.moderation.all[member.id] = [moderationDB]);
    await guildDataBase.set(message.guild.id, { ...message.DB });
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
          title: `Kicked from ${message.guild.name}`,
          description: `You have been kicked from ${message.guild.name} for "${reason}".\nYou were kicked by ${message.author.tag}.`,
          footer: {
            text: `${client.user.username} ©`,
            iconURL: client.user.displayAvatarURL({ format: "png" }),
          },
        }),
      })
      .catch((e) => e);
    try {
      await member.kick(reason);
      await message.say({
        embed: sucessPunishEmbed(client, member.user, <Message>message, {
          title: "Kicked!",
          reason: reason,
          casenumber: message.DB.moderation.caseCount,
        }),
      });
    } catch {
      message.say({
        embed: errorCommandEmbed(client, message.author, null),
      });
      await guildDataBase.set(message.guild.id, backUpDB);
    }
  },
};
