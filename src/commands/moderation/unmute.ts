import Discord from "discord.js";
import { GuildMember, MessageEmbed, Message } from "discord.js";
import { Command } from "../../interfaces/Command";
import { Infringement } from "../../interfaces/GuildDataBase";
import {
  noArgsCommandHelpEmbed,
  sucessPunishEmbed,
} from "../../structures/Embeds";

export const command: Command = {
  name: "unmute",
  example: ["unmute @Tyson felt sorry.", "unmute 53636233242246347 apologized"],
  args: [
    {
      name: "Member/ID to Unmute",
      required: true,
    },
    {
      name: "Reason",
      required: false,
    },
  ],
  async run(client, message) {
    let member = await message.getMember(message.args[0]?.value);
    if (!member) return;
    let reason = "No reason provided.";
    if (message.args[1].value)
      reason = message.args
        .map((x) => x.raw)
        .slice(1)
        .join(" ");
    if (
      !member.roles.cache.some((role) => role.name.toLowerCase() === "muted") ||
      !message.guild.DB.moderation.mutes[member.id].some((Case) => Case.active)
    ) {
      return message.say({
        embed: noArgsCommandHelpEmbed(
          client,
          member.user,
          message.command,
          message.prefix
        ),
      });
    }
    const Case = message.guild.DB.moderation.mutes[member.id].find(
      (Case) => Case.active
    );
    const handled: boolean = await client.handleEndMute(
      member,
      Case.muteRoleID,
      Case.oldRolesID,
      message.guild.DB,
      Case.caseCount
    );
    if (!handled) {
      return message.say({
        embed: noArgsCommandHelpEmbed(
          client,
          member.user,
          message.command,
          message.prefix
        ),
      });
    }
    let typeCaseCount = client.getTypeCaseCount("UNMUTE", message.guild.DB) + 1;
    let caseCount = ++message.guild.DB.moderation.caseCount;
    message.guild.DB.moderation.activeCases++;
    const moderationDB: Infringement = {
      guildID: message.guild.id,
      victim: member.id,
      moderator: message.author.id,
      reason: reason,
      typeCaseCount: typeCaseCount,
      caseCount: caseCount,
      infringementType: "UNMUTE",
      startDate: new Date(),
      endDate: null,
    };

    message.guild.DB.moderation.unmutes[member.id]
      ? message.guild.DB.moderation.unmutes[member.id].push(moderationDB)
      : (message.guild.DB.moderation.unmutes[member.id] = [moderationDB]);
    message.guild.DB.moderation.all[member.id]
      ? message.guild.DB.moderation.all[member.id].push(moderationDB)
      : (message.guild.DB.moderation.all[member.id] = [moderationDB]);
    await client.guildDB.set(message.guild.id, { ...message.guild.DB });
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
          description: `You have been Unmuted from ${message.guild.name} for "${reason}".\nYou were Unmuted by ${message.author.tag}.`,
          footer: {
            text: `${client.user.username} ©`,
            iconURL: client.user.displayAvatarURL({ format: "png" }),
          },
        }),
      })
      .catch((e) => e);
    await message.say({
      embed: new MessageEmbed({
        author: {
          name: member.user.tag,
          iconURL: member.user.displayAvatarURL({
            format: "png",
            dynamic: true,
          }),
        },
        color: "DARK_VIVID_PINK",
        title: "Unmuted!",
        description: `**${member.user.tag}** has been unmuted for "${reason}"`,
        fields: [
          {
            name: "Case Number",
            value: `${Case.caseCount}`,
            inline: true,
          },
        ],
        footer: {
          text: `${client.firstCap(
            "Unmuted!".slice(0, "Unmuted!".length - 1)
          )} by ${message.author.tag}!`,
          iconURL: client.user.displayAvatarURL({ format: "png" }),
        },
      }),
    });
  },
};
