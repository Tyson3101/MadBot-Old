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
      iconURL: user.displayAvatarURL({
        format: "png",
        dynamic: true,
      }),
    },
    color: "DARK_VIVID_PINK",
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
      iconURL: user.displayAvatarURL({
        format: "png",
        dynamic: true,
      }),
    },
    color: "DARK_VIVID_PINK",
    title: "Invaild Permissions",
    description: ":x: This command can only be used by bot developers. :x:",
    footer: {
      text: `${client.user.username} ©`,
      iconURL: client.user.displayAvatarURL({ format: "png" }),
    },
  });
};

export const invaildPermissionsMemberCommandEmbed = (
  client: DiscordBot,
  user: User,
  permission: PermissionString
): MessageEmbed => {
  return new MessageEmbed({
    author: {
      name: user.tag,
      iconURL: user.displayAvatarURL({
        format: "png",
        dynamic: true,
      }),
    },
    color: "DARK_VIVID_PINK",
    title: "Invaild Permissions",
    description: `:x: You need the "${permission}" Permission to use this command. :x:`,
    footer: {
      text: `${client.user.username} ©`,
      iconURL: client.user.displayAvatarURL({ format: "png" }),
    },
  });
};

export const invaildPermissionsCustom = (
  client: DiscordBot,
  user: User,
  msg: string,
  note?: string
): MessageEmbed => {
  return new MessageEmbed({
    author: {
      name: user.tag,
      iconURL: user.displayAvatarURL({
        format: "png",
        dynamic: true,
      }),
    },
    color: "DARK_VIVID_PINK",
    title: "Invaild Permissions",
    description: `:x: ${msg} :x:${note ? `\n${note}` : ""}`,
    footer: {
      text: `${client.user.username} ©`,
      iconURL: client.user.displayAvatarURL({ format: "png" }),
    },
  });
};

export const invaildPermissionsBotCommandEmbed = (
  client: DiscordBot,
  user: User,
  permission: PermissionString
): MessageEmbed => {
  return new MessageEmbed({
    author: {
      name: user.tag,
      iconURL: user.displayAvatarURL({
        format: "png",
        dynamic: true,
      }),
    },
    color: "DARK_VIVID_PINK",
    title: "Invaild Permissions",
    description: `:x: I need the "${permission}" Permission to execute this command. :x:`,
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
      iconURL: user.displayAvatarURL({
        format: "png",
        dynamic: true,
      }),
    },
    color: "DARK_VIVID_PINK",
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
  prefix: string
): MessageEmbed => {
  return new MessageEmbed({
    author: {
      name: user.tag,
      iconURL: user.displayAvatarURL({
        format: "png",
        dynamic: true,
      }),
    },
    color: "DARK_VIVID_PINK",
    title: "Invaild Arguments",
    description: `:x: You are providing invaild arguments for this command. :x:\nDo **${prefix}${command.name}** for help. **|** Join My **[Support Server](${client.supportServer})** for more help.`,
    footer: {
      text: `${client.user.username} ©`,
      iconURL: client.user.displayAvatarURL({ format: "png" }),
    },
  });
};

export const CommandHelpEmbed = (
  client: DiscordBot,
  user: User,
  commandName: string,
  prefix: string
): MessageEmbed => {
  const command = client.commands.get(commandName);
  const { args } = command;
  let embed = new MessageEmbed({
    author: {
      name: user.tag,
      iconURL: user.displayAvatarURL({
        format: "png",
        dynamic: true,
      }),
    },
    color: "DARK_VIVID_PINK", //"FD0061",
    title: `${firstCap(command.name)} Help`,
    description: `Join My **[Support Server](${client.supportServer})** for more help.`,
    fields: [
      {
        name: `Command Help`,
        value: `**Name:** ${firstCap(command.name)}
**Catergory:** ${firstCap(command.catergory)}
${
  command.permission && command.permission[0]
    ? `**Required Permission:** ${command.permission[0]}\n`
    : ""
}**Usage:** ${prefix}${command.usage.join(` **|** ${prefix}`)}
${
  command.example
    ? `**Example:** ${prefix}${command.example.join(` **|** ${prefix}`)}\n`
    : ""
}${
          command.aliases[0]
            ? `**Aliases:** ${command.aliases.join(` **|** `)}\n`
            : "\n"
        }${command.args[0] ? `**Arguments Info:**` : ""}`,
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
      }\n**Example:** ${argument.example.join(
        ` **|** `
      )}\n**Required:** ${firstCap(argument.required.toString())}`
    );
  });
  return embed;
};

export const prefixEmbed = (
  client: DiscordBot,
  member: GuildMember,
  db: GuildDataBaseInterface,
  prefix = null
): MessageEmbed => {
  let { user } = member;
  return new MessageEmbed({
    author: {
      name: user.tag,
      iconURL: user.displayAvatarURL({
        format: "png",
        dynamic: true,
      }),
    },
    color: "DARK_VIVID_PINK",
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

export const clientInfo = (
  client: DiscordBot,
  user: User,
  prefix: string
): MessageEmbed => {
  return new MessageEmbed({
    author: {
      name: user.tag,
      iconURL: user.displayAvatarURL({
        format: "png",
        dynamic: true,
      }),
    },
    color: "DARK_VIVID_PINK",
    title: `${client.user.username} Information`,
    url: `https://github.com/Tyson3101/MadBot/tree/main/src`,
    description: `A Discord Bot written in **[TypeScript](https://www.typescriptlang.org/)** with the Node Module **[Discord.js](https://discord.js.org/#/)**!\nDo **${prefix}help** for help. **| [Join My Support Server](${client.supportServer})**`,
    fields: [
      {
        name: `Uptime`,
        value: `${(duration(client.uptime) as any).format(
          "d[d ]h[h ]m[m ]s[s]"
        )}`,
        inline: true,
      },
      {
        name: `Default Prefix`,
        value: `\`!\``,
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
        )}\` **| Commands:** \`${client.commands.size}\` **| Developers:** \`${
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
  prefix: string
): MessageEmbed => {
  const embed: MessageEmbed = new MessageEmbed({
    author: {
      name: user.tag,
      iconURL: user.displayAvatarURL({
        format: "png",
        dynamic: true,
      }),
    },
    color: "DARK_VIVID_PINK",
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
      `${prefix}help ${command.catergory}`,
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
  prefix: string
): MessageEmbed => {
  const embed: MessageEmbed = new MessageEmbed({
    author: {
      name: user.tag,
      iconURL: user.displayAvatarURL({
        format: "png",
        dynamic: true,
      }),
    },
    color: "DARK_VIVID_PINK",
    title: `${client.user.username} ${firstCap(catergory)} Commands`,
    description: `**[Join Support Server Here](${client.supportServer})**`,
    footer: {
      text: `${client.user.username} ©`,
      iconURL: client.user.displayAvatarURL({ format: "png" }),
    },
  });
  client.commands
    .filter((cmd) => cmd.catergory === catergory)
    .filter((cmd) => cmd.name !== "help")
    .forEach((command: commandInterFace, commandName: string) => {
      embed.addField(
        `${prefix}help ${commandName}`,
        `${command.description}`,
        true
      );
    });
  return embed;
};

export const pingEmbed = (
  client: DiscordBot,
  user: User,
  { latency, ping }
): MessageEmbed => {
  return new MessageEmbed({
    author: {
      name: user.tag,
      iconURL: user.displayAvatarURL({ format: "png", dynamic: true }),
    },
    color: "DARK_VIVID_PINK",
    thumbnail: {
      url: client.user.displayAvatarURL({ format: "png" }),
    },
    title: "Pong! 🏓",
    fields: [
      {
        name: "Client",
        value: `**${ping}**`,
      },
      {
        name: "API",
        value: `**${latency}**`,
      },
    ],
    footer: {
      text: `${client.user.username} ©`,
      iconURL: client.user.displayAvatarURL({ format: "png" }),
    },
  });
};
