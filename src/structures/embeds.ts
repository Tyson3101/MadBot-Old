import { GuildMember, MessageEmbed, PermissionString, User } from "discord.js";
import { DiscordBot } from "./Client";
import { GuildDataBaseInterface } from "../interfaces/GuildDataBase";
import { firstCap } from "../functions/FirstCap";
import { commandInterFace } from "../interfaces/Command";
import { duration } from "moment";
import "moment-duration-format";

// All embeds I want to use. (Allows less typing and resuing, also can input stuff in)

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
      name: user.tag,

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
      name: user.tag,
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
      name: user.tag,
      iconURL: user.displayAvatarURL({ format: "png" }),
    },
    title: "Error",
    description: error.message
      ? `:x: **This command experienced an error:** :x:\n${error.message}.`
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
  command: commandInterFace,
  db: any
): MessageEmbed => {
  const { args } = command;
  let embed = new MessageEmbed({
    author: {
      name: user.tag,
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
}**Usage:** "${db.prefix}${command.usage.join(`" | "${db.prefix}`)}"
**Example:** "${db.prefix}${command.example.join(`" | "${db.prefix}`)}"\n
**Arguments Info:**`,
      },
    ],
    footer: {
      text: `${client.user.username} ©`,
      iconURL: client.user.displayAvatarURL({ format: "png" }),
    },
  });
  args.forEach((argument, i: number): void => {
    i++;
    embed.addField(
      `${i}: ${argument.name}`,
      `**Type:** ${
        Array.isArray(argument.type) ? argument.type.join(", ") : argument.type
      }\n**Description:** ${
        argument.description
      }\n**Example:** "${argument.example.join(
        `" | "`
      )}"\n**Required:** ${firstCap(argument.required.toString())}`
    );
  });
  return embed;
};

export const CommandHelpEmbed = (
  client: DiscordBot,
  user: User,
  commandName: string,
  db: any
): MessageEmbed => {
  const command = client.commands.get(commandName);
  const { args } = command;
  let embed = new MessageEmbed({
    author: {
      name: user.tag,
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
}**Usage:** "${db.prefix}${command.usage.join(`" | "${db.prefix}`)}"
**Example:** "${db.prefix}${command.example.join(`" | "${db.prefix}`)}"\n
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
        `" | "`
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
      name: user.tag,
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
      name: user.tag,
      iconURL: user.displayAvatarURL({ format: "png" }),
    },
    title: `${client.user.username} Information`,
    url: `https://github.com/Tyson3101/MadBot/tree/main/src`,
    description: `A Discord Bot written in **[TypeScript](https://www.typescriptlang.org/)** with the Node Module **[Discord.js](https://discord.js.org/#/)**!`,
    fields: [
      {
        name: `Uptime`,
        value: `${(duration(client.uptime) as any).format(
          "d[d ]h[h ]m[m ]s[s]"
        )}`,
        inline: true,
      },
      {
        name: `Support Server`,
        value: `[Join Here](${client.supportServer})`,
        inline: true,
      },
      {
        name: `Source Code`,
        value: `[Github Repository](https://github.com/Tyson3101/MadBot/tree/main/src)`,
        inline: true,
      },
      {
        name: `Stats`,
        value: `**Servers:** \`${
          client.guilds.cache.size
        }\` **| Channels:** \`${
          client.channels.cache.size
        }\` **| Users:** \`${client.guilds.cache.reduce(
          (arr: number, { memberCount }) => arr + memberCount,
          0
        )}\`**| Commands:** \`${client.commands.size}\` **| Developers:** \`${
          client.developers.size
        }\``,
      },
    ],
    footer: {
      text: `${client.user.username} ©`,
      iconURL: client.user.displayAvatarURL({ format: "png" }),
    },
  });
};

export const helpEmbed = (
  client: DiscordBot,
  user: User,
  DB: GuildDataBaseInterface
): MessageEmbed => {
  const embed: MessageEmbed = new MessageEmbed({
    author: {
      name: user.tag,
      iconURL: user.displayAvatarURL({ format: "png" }),
    },
    title: `${client.user.username} Commands`,
    description: `**[Join Support Server Here](${client.supportServer})**`,
    footer: {
      text: `${client.user.username} ©`,
      iconURL: client.user.displayAvatarURL({ format: "png" }),
    },
  });
  let allReady: string[] = [];
  client.commands.forEach((command: commandInterFace) => {
    if (allReady.includes(command.catergory)) return;
    allReady.push(command.catergory);
    embed.addField(
      `${DB.prefix}help ${command.catergory}`,
      `Shows all commands in the ${firstCap(command.catergory)} Catergory`,
      true
    );
  });
  return embed;
};

export const helpCatergoryEmbed = (
  client: DiscordBot,
  user: User,
  catergory: string,
  DB: GuildDataBaseInterface
): MessageEmbed => {
  const embed: MessageEmbed = new MessageEmbed({
    author: {
      name: user.tag,
      iconURL: user.displayAvatarURL({ format: "png" }),
    },
    title: `${client.user.username} ${firstCap(catergory)} Commands`,
    description: `**[Join Support Server Here](${client.supportServer})**`,
    footer: {
      text: `${client.user.username} ©`,
      iconURL: client.user.displayAvatarURL({ format: "png" }),
    },
  });
  client.commands
    .filter((cmd) => cmd.catergory === catergory)
    .forEach((command: commandInterFace) => {
      embed.addField(
        `${DB.prefix}help ${command.name}`,
        `${command.description}`,
        true
      );
    });
  return embed;
};
