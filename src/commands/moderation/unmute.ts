import Discord from "discord.js";
import { GuildMember, MessageEmbed, Message } from "discord.js";
import { commandInterFace } from "../../interfaces/Command";
import {
  noArgsCommandHelpEmbed,
  sucessPunishEmbed,
} from "../../structures/embeds";

export const command: commandInterFace = {
  name: "unmute",
  args: [
    {
      name: "Member/ID to Unmute",
      description: "Member to mute.",
      type: ["User Mention", "UserID"],
      required: true,
    },
    {
      name: "Reason",
      type: "Reason",
      description: "Reason for the unmute",
      example: ["Mistake", "Said Sorry"],
      required: false,
    },
  ],
  async run(client, message) {
    let member: GuildMember = await message.getMember(message.args[0]?.value);
    if (!member) return;
    let reason = "No reason provided.";
    if (message.args[1].value)
      reason = message.args
        .map((x) => x.raw)
        .slice(1)
        .join(" ");
    if (
      !member.roles.cache.some((role) => role.name.toLowerCase() === "muted") ||
      !message.DB.moderation.mutes[member.id].some((Case) => Case.active)
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
    const Case = message.DB.moderation.mutes[member.id].find(
      (Case) => Case.active
    );
    const handled: boolean = await client.handleEndMute(
      member,
      Case.muteRoleID,
      Case.oldRolesID,
      message.DB,
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
