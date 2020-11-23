import Discord, {
  MessageEmbed,
  MessageAttachment,
  GuildMember,
  Role,
} from "discord.js";
import { commandInterFace } from "../../interfaces/Command";
import {
  errorCommandEmbed,
  invaildPermissionsCustom,
  sucessPunishEmbed,
} from "../../structures/embeds";
import ms from "ms";
import { guildDataBase } from "../../structures/DataBase";
import { infringementInterface } from "../../interfaces/GuildDataBase";
import { getTypeCaseCount as muteCaseCount } from "../../functions/GetGuildDB";
import { handleEndMute as handleMute } from "../../functions/handleMutes";

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
  permission: ["MANAGE_CHANNELS", true],
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
      !util.compareRolePostion(
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
    let endTime: number;
    if (args[1]) {
      endTime = ms(args[1]);
    }
    let MutedRole: Role = message.guild.roles.cache.find(
      (role) => role.name.toLowerCase() === "muted"
    );
    try {
      if (!MutedRole)
        MutedRole = await message.guild.roles.create({
          data: {
            name: "Muted",
            color: "DARK_BUT_NOT_BLACK",
            position: message.guild.me.roles.highest.position - 1,
          },
          reason: "Muted Role",
        });
      message.guild.channels.cache
        .filter((ch) => ch.manageable)
        .forEach(async (channel) => {
          await channel.updateOverwrite(
            MutedRole,
            {
              SEND_MESSAGES: false,
            },
            "Mute Command"
          );
        });
    } catch (e) {
      return message.channel.send({
        embed: errorCommandEmbed(client, message.author, e),
      });
    }
    let reason = "No reason provided.";
    if (args[2]) reason = args.slice(2).join(" ");
    let backUpDB = { ...util.DB };
    let typeCaseCount = muteCaseCount("MUTE", util.DB) + 1;
    let caseCount = ++util.DB.moderation.caseCount;
    util.DB.moderation.activeCases++;
    const moderationDB: infringementInterface = {
      guildID: message.guild.id,
      muteRoleID: MutedRole.id,
      oldRolesID: member.roles.cache
        .filter((role) => role.editable && !role.managed)
        .keyArray(),
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
      infringementType: "MUTE",
      endDate: new Date(Date.now() + endTime),
      active: true,
    };

    util.DB.moderation.mutes[member.id]
      ? util.DB.moderation.mutes[member.id].push(moderationDB)
      : (util.DB.moderation.mutes[member.id] = [moderationDB]);
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
          title: `Muted from ${message.guild.name}`,
          description: `You have been Muted from ${message.guild.name} for ${args[1]} long and for "${reason}".\nYou were Muted by ${message.author.tag}.`,
          footer: {
            text: `${client.user.username} ©`,
            iconURL: client.user.displayAvatarURL({ format: "png" }),
          },
        }),
      })
      .catch((e) => e);
    const timeMuteTimeout = setTimeout(
      async () =>
        handleMute(
          member,
          MutedRole.id,
          moderationDB.oldRolesID,
          util.DB,
          typeCaseCount
        ),
      endTime
    );
    try {
      await member.roles.remove(moderationDB.oldRolesID);
      await member.roles.add(MutedRole, reason);
      await message.channel.send({
        embed: sucessPunishEmbed(client, member.user, util, {
          title: "Muted!",
          reason: reason,
          casenumber: util.DB.moderation.caseCount,
        }),
      });
    } catch (e) {
      console.log(e);
      message.channel.send({
        embed: errorCommandEmbed(client, message.author, e),
      });
      await guildDataBase.set(message.guild.id, backUpDB);
      clearTimeout(timeMuteTimeout);
    }
  },
};
