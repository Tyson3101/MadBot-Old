import { MessageEmbed, PermissionString, User } from "discord.js";
import { DiscordBot } from "./Client";

export const dmCommandEmbed = (client: DiscordBot, user: User) => {
  return new MessageEmbed({
    author: {
      name: user.username,
      iconURL: user.displayAvatarURL({ format: "png" }),
    },
    title: "Invaild Channel",
    description: ":x: This command cannot be used in a DM Channel. :x:",
    footer: {
      text: `© ${client.user.username}`,
      iconURL: client.user.displayAvatarURL({ format: "png" }),
    },
  });
};

export const ownerCommandEmbed = (client: DiscordBot, user: User) => {
  return new MessageEmbed({
    author: {
      name: user.username,
      iconURL: user.displayAvatarURL({ format: "png" }),
    },
    title: "Invaild Permissions",
    description: ":x: This command can only be used by bot developers. :x:",
    footer: {
      text: `© ${client.user.username}`,
      iconURL: client.user.displayAvatarURL({ format: "png" }),
    },
  });
};

export const invaildPermissionsCommandEmbed = (
  client: DiscordBot,
  user: User,
  Permission: PermissionString
) => {
  return new MessageEmbed({
    author: {
      name: user.username,
      iconURL: user.displayAvatarURL({ format: "png" }),
    },
    title: "Invaild Permissions",
    description: `:x: You need the "${Permission}" Permission to use this command. :x:`,
    footer: {
      text: `© ${client.user.username}`,
      iconURL: client.user.displayAvatarURL({ format: "png" }),
    },
  });
};
