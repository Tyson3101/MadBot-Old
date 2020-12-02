import {
  GuildMember,
  MessageEmbed,
  PermissionString,
  TextChannel,
  User,
  Message,
} from "discord.js";
import { DiscordBot } from "./Client";
import { GuildDataBaseInterface } from "../interfaces/GuildDataBase";
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

export const nsfwCommandEmbed = (
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
    description: ":x: This command can only be used in a NSFW Channel. :x:",
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
    description: error
      ? `:x: **This command experienced an error:** :x:\nPlease report this error: \`${error}\` to #${
          (client.channels.cache.get("782159661141983243") as TextChannel).name
        } in my [Support Server](${client.supportServer})!`
      : `\nPlease report this incident to ${client.users
          .fetch(client.developers.find((user) => !user.position).id)
          .then((user) => user.tag)} in my [Support Server](${
          client.supportServer
        })!`,
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
    description: `:x: You are providing invaild arguments for this command. :x:\nDo **${prefix}help ${command.name}** for help. **|** Join My **[Support Server](${client.supportServer})** for more help.`,
    fields: [
      {
        name: "Tips:",
        value: client.tips.join("\n"),
      },
    ],
    footer: {
      text: `${client.user.username} ©`,
      iconURL: client.user.displayAvatarURL({ format: "png" }),
    },
  });
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
        value: `\`${client.prefix}\``,
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
      `Shows all commands in the ${client.firstCap(
        command.catergory
      )} Catergory`,
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
    title: `${client.user.username} ${client.firstCap(catergory)} Commands`,
    description: `**[Join Support Server Here](${client.supportServer})**`,
    footer: {
      text: `${client.user.username} ©`,
      iconURL: client.user.displayAvatarURL({ format: "png" }),
    },
  });
  client.commands
    .filter((cmd) => cmd.catergory === catergory)
    .filter((cmd) => cmd.public !== false && !cmd.public)
    .forEach((command: commandInterFace, commandName: string) => {
      embed.addField(
        `${prefix}help ${commandName}`,
        `${
          command.description
            ? command.description
            : `Help for ${client.firstCap(commandName)}`
        }`,
        true
      );
    });
  if (!embed.fields.length) return helpEmbed(client, user, prefix);
  return embed;
};

export const CommandHelpEmbed = (
  client: DiscordBot,
  user: User,
  commandName: string,
  prefix: string
): MessageEmbed => {
  const command = client.commands.get(commandName);
  if (command.public === false && !client.developers.has(user.id))
    return helpEmbed(client, user, prefix);
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
    title: `${client.firstCap(command.name)} Help`,
    description: `Join My **[Support Server](${client.supportServer})** for more help.`,
    fields: [
      {
        name: `Command Help`,
        value: `**Name:** ${client.firstCap(command.name)}
**Catergory:** ${client.firstCap(command.catergory)}\n${
          command.note ? `**Note:** ${command.note}\n` : ""
        }${
          command.permission && command.permission[0]
            ? `**Required Permission:** ${command.permission[0]}\n`
            : ""
        }${
          command.usage
            ? `**Usage:** ${prefix}${command.usage.join(` **|** ${prefix}`)}\n`
            : ""
        }${
          command.example
            ? `**Example:** ${prefix}${command.example.join(
                ` **|** ${prefix}`
              )}\n`
            : ""
        }${
          command.aliases?.length
            ? `**Aliases:** ${command.aliases.join(` **|** `)}\n`
            : "\n"
        }${command.args?.length ? `**Arguments Info:**` : ""}`,
      },
    ],
    footer: {
      text: `${client.user.username} ©`,
      iconURL: client.user.displayAvatarURL({ format: "png" }),
    },
  });
  if (command.args?.length) {
    embed.addField("Tips:", client.tips.join("\n"));
    args.forEach((argument, i: number) => {
      i++;
      embed.addField(
        `${i}: ${argument.name}`,
        `**Type:** ${
          Array.isArray(argument.type)
            ? argument.type.join(", ")
            : argument.type
        }\n${
          argument.description
            ? `**Description:** ${argument.description}\n`
            : ""
        }${argument.note ? `**Note:** ${argument.note}\n` : ""}${
          argument.length ? `**Length:** ${argument.length}\n` : ""
        }${
          argument.example?.length
            ? `**Example:** ${argument.example.join(` **|** `)}\n`
            : ""
        }**Required:** ${client.firstCap(argument.required.toString())}`
      );
    });
  }
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

export const sucessPunishEmbed = (
  client: DiscordBot,
  userPunished: User,
  message: Message,
  { reason, casenumber, title }
): MessageEmbed => {
  return new MessageEmbed({
    author: {
      name: userPunished.tag,
      iconURL: userPunished.displayAvatarURL({
        format: "png",
        dynamic: true,
      }),
    },
    color: "DARK_VIVID_PINK",
    title: title,
    description: `**${userPunished.tag}** has been ${title
      .toLowerCase()
      .slice(0, title.length - 1)} for "${reason}"`,
    fields: [
      {
        name: "Case Number",
        value: `${casenumber}`,
        inline: true,
      },
      {
        name: "Mistake?",
        value: `*${message.prefix}help case* **|** *${message.prefix}help reason*`,
        inline: true,
      },
    ],
    footer: {
      text: `${client.firstCap(title.slice(0, title.length - 1))} by ${
        message.author.tag
      }!`,
      iconURL: client.user.displayAvatarURL({ format: "png" }),
    },
  });
};
