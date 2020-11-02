import { GuildMember, MessageEmbed, PermissionString, User } from "discord.js";
import { DiscordBot } from "./Client";
import { args as ArgsInterface } from "../interfaces/args";
import { firstCap } from "../functions/firstCap";
import { commandInterFace } from "../interfaces/Command";
import { formatDistance, subDays, subHours, subMinutes } from "date-fns";

export const dmCommandEmbed = (
  client: DiscordBot,
  user: User
): MessageEmbed => {
  return new MessageEmbed({
    author: {
      name: user.tag,
      iconURL: user.displayAvatarURL({ format: "png" }),
    },
    title: "Invaild Channel",
    description: ":x: This command cannot be used in a DM Channel. :x:",
    footer: {
      text: `${client.user.username} ©`,
      iconURL: client.user.displayAvatarURL({ format: "png" }),
    },
  });
};

export const ownerCommandEmbed = (
  client: DiscordBot,
  user: User
): MessageEmbed => {
  return new MessageEmbed({
    author: {
      name: user.username,
      iconURL: user.displayAvatarURL({ format: "png" }),
    },
    title: "Invaild Permissions",
    description: ":x: This command can only be used by bot developers. :x:",
    footer: {
      text: `${client.user.username} ©`,
      iconURL: client.user.displayAvatarURL({ format: "png" }),
    },
  });
};

export const invaildPermissionsCommandEmbed = (
  client: DiscordBot,
  user: User,
  permission: PermissionString
): MessageEmbed => {
  return new MessageEmbed({
    author: {
      name: user.username,
      iconURL: user.displayAvatarURL({ format: "png" }),
    },
    title: "Invaild Permissions",
    description: `:x: You need the "${permission}" Permission to use this command. :x:`,
    footer: {
      text: `${client.user.username} ©`,
      iconURL: client.user.displayAvatarURL({ format: "png" }),
    },
  });
};

//errorCommandEmbed

export const errorCommandEmbed = (
  client: DiscordBot,
  user: User,
  error: any
): MessageEmbed => {
  return new MessageEmbed({
    author: {
      name: user.username,
      iconURL: user.displayAvatarURL({ format: "png" }),
    },
    title: "Error",
    description: error.message
      ? `:x: This command experienced an error: ${error.message}. :x:`
      : `:x: This command experienced an error. :x:`,
    footer: {
      text: `${client.user.username} ©`,
      iconURL: client.user.displayAvatarURL({ format: "png" }),
    },
  });
};

export const noArgsCommandHelpEmbed = (
  client: DiscordBot,
  user: User,
  command: commandInterFace
): MessageEmbed => {
  const { args } = command;
  let embed = new MessageEmbed({
    author: {
      name: user.username,
      iconURL: user.displayAvatarURL({ format: "png" }),
    },
    title: "Invaild Arguments",
    description: `:x: You are missing arguments for this command. :x:`,
    fields: [
      {
        name: `Command Help`,
        value: `**Name:** ${firstCap(command.name)}
**Catergory:** ${firstCap(command.catergory)}
${
  command.permission
    ? `**Required Permissions:** "${command.permission}"\n`
    : ""
}**Usage:** ${command.usage.join(" | ")}
**Example:** ${command.usage.join(" | ")}\n
**Arguments Info:**`,
      },
    ],
    footer: {
      text: `${client.user.username} ©`,
      iconURL: client.user.displayAvatarURL({ format: "png" }),
    },
  });
  args.forEach((argument, i: number) => {
    i++;
    embed.addField(
      `${i}: ${argument.name}`,
      `**Type:** ${
        Array.isArray(argument.type) ? argument.type.join(", ") : argument.type
      }\n**Description:** ${
        argument.description
      }\n**Example:** "${argument.example.join(
        `", "`
      )}"\n**Required:** ${firstCap(argument.required.toString())}`
    );
  });
  return embed;
};

export const CommandHelpEmbed = (
  client: DiscordBot,
  user: User,
  commandName: string
): MessageEmbed => {
  const command = client.commands.get(commandName);
  const { args } = command;
  let embed = new MessageEmbed({
    author: {
      name: user.username,
      iconURL: user.displayAvatarURL({ format: "png" }),
    },
    title: `${command.name} Help`,
    fields: [
      {
        name: `Command Help`,
        value: `**Name:** ${firstCap(command.name)}
**Catergory:** ${firstCap(command.catergory)}
${
  command.permission
    ? `**Required Permissions:** "${command.permission}"\n`
    : ""
}**Usage:** ${command.usage.join(" | ")}
**Example:** ${command.usage.join(" | ")}\n
**Arguments Info:**`,
      },
    ],
    footer: {
      text: `${client.user.username} ©`,
      iconURL: client.user.displayAvatarURL({ format: "png" }),
    },
  });
  args.forEach((argument, i: number) => {
    i++;
    embed.addField(
      `${i}: ${argument.name}`,
      `**Type:** ${
        Array.isArray(argument.type) ? argument.type.join(", ") : argument.type
      }\n**Description:** ${
        argument.description
      }\n**Example:** "${argument.example.join(
        `", "`
      )}"\n**Required:** ${firstCap(argument.required.toString())}`
    );
  });
  return embed;
};

export const prefixEmbed = (
  client: DiscordBot,
  member: GuildMember,
  db,
  prefix = null
): MessageEmbed => {
  let { user } = member;
  return new MessageEmbed({
    author: {
      name: user.username,
      iconURL: user.displayAvatarURL({ format: "png" }),
    },
    title: "Prefix",
    description: prefix
      ? `Prefix for ${member.guild.name} is now \`${prefix}\``
      : `Prefix for ${member.guild.name} is \`${db.prefix}\``,
    footer: {
      text: `${client.user.username} ©`,
      iconURL: client.user.displayAvatarURL({ format: "png" }),
    },
  });
};

export const clientInfo = (client: DiscordBot, user: User): MessageEmbed => {
  return new MessageEmbed({
    author: {
      name: user.username,
      iconURL: user.displayAvatarURL({ format: "png" }),
    },
    title: `${client.user.username} Stats`,
    description: `A Discord Bot written in Node.js with [TypeScript](https://www.typescriptlang.org/) and the NPM Module [discord.js](https://discord.js.org/#/)!`,
    fields: [
      {
        name: `Uptime`,
        value: `Days: ${formatDistance(
          subDays(Date.now(), client.uptime),
          Date.now()
        )}}Hours: ${formatDistance(
          subHours(Date.now(), client.uptime),
          Date.now()
        )}`,
        inline: true,
      },
      {
        name: `Total Users`,
        value: `${client.guilds.cache.reduce(
          (arr: number, { memberCount }) => arr + memberCount,
          0
        )}`,
        inline: true,
      },
      {
        name: `Total Servers`,
        value: `${client.guilds.cache.size}`,
        inline: true,
      },
    ],
    footer: {
      text: `${client.user.username} ©`,
      iconURL: client.user.displayAvatarURL({ format: "png" }),
    },
  });
};
