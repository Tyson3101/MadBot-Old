import { MessageEmbed, GuildMember, Role, Message } from "discord.js";
import { commandInterFace } from "../../interfaces/Command";
import {
  errorCommandEmbed,
  invaildPermissionsCustom,
  sucessPunishEmbed,
} from "../../structures/embeds";
import ms from "ms";
import { guildDataBase } from "../../structures/DataBase";
import { infringementInterface } from "../../interfaces/GuildDataBase";

export const command: commandInterFace = {
  name: "mute",
  description: "Mute a members",
  guildOnly: true,
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
      required: false,
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
      !member.manageable ||
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
    let endTime: number;
    if (args[1].value) {
      endTime = ms(args[1].value);
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
      return message.say({
        embed: errorCommandEmbed(client, message.author, e),
      });
    }
    let reason = "No reason provided.";
    if (args[1].value && !endTime)
      reason = args
        .map((x) => x.raw)
        .slice(1)
        .join(" ");
    else if (args[2].value)
      reason = args
        .map((x) => x.raw)
        .slice(2)
        .join(" ");

    let backUpDB = { ...message.DB };
    let typeCaseCount = client.getTypeCaseCount("MUTE", message.DB) + 1;
    let caseCount = ++message.DB.moderation.caseCount;
    message.DB.moderation.activeCases++;
    const moderationDB: infringementInterface = {
      guildID: message.guild.id,
      muteRoleID: MutedRole.id,
      oldRolesID: member.roles.cache
        .filter((role) => role.editable && !role.managed)
        .keyArray(),
      victim: member.id,
      moderator: message.author.id,
      reason: reason,
      typeCaseCount: typeCaseCount,
      caseCount: caseCount,
      infringementType: "MUTE",
      startDate: new Date(),
      endDate: endTime ? new Date(Date.now() + endTime) : null,
      active: true,
    };

    message.DB.moderation.mutes[member.id]
      ? message.DB.moderation.mutes[member.id].push(moderationDB)
      : (message.DB.moderation.mutes[member.id] = [moderationDB]);
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
          title: `Muted from ${message.guild.name}`,
          description: `You have been Muted from ${message.guild.name} for ${args[1].value} long and for "${reason}".\nYou were Muted by ${message.author.tag}.`,
          footer: {
            text: `${client.user.username} ©`,
            iconURL: client.user.displayAvatarURL({ format: "png" }),
          },
        }),
      })
      .catch((e) => e);
    let timeMuteTimeout: any;
    if (endTime) {
      timeMuteTimeout = setTimeout(
        async () =>
          client.handleEndMute(
            member,
            MutedRole.id,
            moderationDB.oldRolesID,
            message.DB,
            typeCaseCount
          ),
        endTime
      );
    }
    try {
      await member.roles.remove(moderationDB.oldRolesID);
      await member.roles.add(MutedRole, reason);
      await message.say({
        embed: sucessPunishEmbed(client, member.user, <Message>message, {
          title: "Muted!",
          reason: reason,
          casenumber: message.DB.moderation.caseCount,
        }),
      });
    } catch (e) {
      console.log(e);
      message.say({
        embed: errorCommandEmbed(client, message.author, e),
      });
      await guildDataBase.set(message.guild.id, backUpDB);
      if (timeMuteTimeout) clearTimeout(timeMuteTimeout);
    }
  },
};
