import {
  GuildMember,
  MessageEmbed,
  PermissionString,
  TextChannel,
  User,
  Message,
} from "discord.js";
import { DiscordBot } from "./Client";
import { GuildDataBase } from "./DataBase";
import { Command } from "../interfaces/Command";
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
      text: `${this.client.user.username} ©`,
      iconURL: this.client.user.displayAvatarURL({ format: "png" }),
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
      text: `${this.client.user.username} ©`,
      iconURL: this.client.user.displayAvatarURL({ format: "png" }),
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
      text: `${this.client.user.username} ©`,
      iconURL: this.client.user.displayAvatarURL({ format: "png" }),
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
      text: `${this.client.user.username} ©`,
      iconURL: this.client.user.displayAvatarURL({ format: "png" }),
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
      text: `${this.client.user.username} ©`,
      iconURL: this.client.user.displayAvatarURL({ format: "png" }),
    },
  });
};

export const invaildPermissionsBotCommandEmbed = (
  client: DiscordBot,
  user: User,
  permission: PermissionString[]
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
    description: `:x: I need the "${permission.join(
      " **|** "
    )}" Permission(s) to execute this command. :x:`,
    footer: {
      text: `${this.client.user.username} ©`,
      iconURL: this.client.user.displayAvatarURL({ format: "png" }),
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
          (this.client.channels.cache.get("782159661141983243") as TextChannel)
            .name
        } in my [Support Server](${this.client.supportServer})!`
      : `\nPlease report this incident to ${this.client.users
          .fetch(this.client.developers.find((user) => !user.position).id)
          .then((user) => user.tag)} in my [Support Server](${
          this.client.supportServer
        })!`,
    footer: {
      text: `${this.client.user.username} ©`,
      iconURL: this.client.user.displayAvatarURL({ format: "png" }),
    },
  });
};

export const noArgsCommandHelpEmbed = (
  client: DiscordBot,
  user: User,
  command: Command,
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
    description: `:x: You are providing invaild arguments for this command. :x:\nDo **${prefix}help ${command.name}** for help. **|** Join My **[Support Server](${this.client.supportServer})** for more help.`,
    fields: [
      {
        name: "Tips:",
        value: this.client.tips.join("\n"),
      },
    ],
    footer: {
      text: `${this.client.user.username} ©`,
      iconURL: this.client.user.displayAvatarURL({ format: "png" }),
    },
  });
};

export const prefixEmbed = (
  client: DiscordBot,
  member: GuildMember,
  db: GuildDataBase,
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
      text: `${this.client.user.username} ©`,
      iconURL: this.client.user.displayAvatarURL({ format: "png" }),
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
    title: `${this.client.user.username} Information`,
    url: `https://github.com/Tyson3101/MadBot/tree/main/src`,
    description: `A Discord Bot written in **[TypeScript](https://www.typescriptlang.org/)** with the Node Module **[Discord.js](https://discord.js.org/#/)**!\nDo **${prefix}help** for help. **| [Join My Support Server](${this.client.supportServer})**`,
    fields: [
      {
        name: `Uptime`,
        value: `${(duration(this.client.uptime) as any).format(
          "d[d ]h[h ]m[m ]s[s]"
        )}`,
        inline: true,
      },
      {
        name: `Default Prefix`,
        value: `\`${this.client.prefix}\``,
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
          this.client.guilds.cache.size
        }\` **| Channels:** \`${
          this.client.channels.cache.size
        }\` **| Users:** \`${this.client.guilds.cache.reduce(
          (arr: number, { memberCount }) => arr + memberCount,
          0
        )}\` **| Commands:** \`${
          this.client.commands.size
        }\` **| Developers:** \`${this.client.developers.size}\``,
      },
    ],
    footer: {
      text: `${this.client.user.username} ©`,
      iconURL: this.client.user.displayAvatarURL({ format: "png" }),
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
    title: `${this.client.user.username} Commands`,
    description: `**[Join Support Server Here](${this.client.supportServer})**`,
    footer: {
      text: `${this.client.user.username} ©`,
      iconURL: this.client.user.displayAvatarURL({ format: "png" }),
    },
  });
  let allReady: string[] = [];
  this.client.commands.forEach((command: Command) => {
    if (allReady.includes(command.catergory)) return;
    allReady.push(command.catergory);
    embed.addField(
      `${prefix}help ${command.catergory}`,
      `Shows all commands in the ${this.client.firstCap(
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
    title: `${this.client.user.username} ${this.client.firstCap(
      catergory
    )} Commands`,
    description: `**[Join Support Server Here](${this.client.supportServer})**`,
    footer: {
      text: `${this.client.user.username} ©`,
      iconURL: this.client.user.displayAvatarURL({ format: "png" }),
    },
  });
  this.client.commands
    .filter((cmd) => cmd.catergory === catergory)
    .filter((cmd) => cmd.public !== false && !cmd.public)
    .forEach((command: Command, commandName: string) => {
      embed.addField(
        `${prefix}help ${commandName}`,
        `${
          command.description
            ? command.description
            : `Help for ${this.client.firstCap(commandName)}`
        }`,
        true
      );
    });
  if (!embed.fields.length) return helpEmbed(this.client, user, prefix);
  return embed;
};

export const CommandHelpEmbed = (
  client: DiscordBot,
  user: User,
  commandName: string,
  prefix: string
): MessageEmbed => {
  const command = this.client.commands.get(commandName);
  if (command.public === false && !this.client.developers.has(user.id))
    return helpEmbed(this.client, user, prefix);
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
    title: `${this.client.firstCap(command.name)} Help`,
    description: `Join My **[Support Server](${this.client.supportServer})** for more help.\n**\`[]\`** = Required **|** **\`()\`** = Optional`,
    fields: [
      {
        name: `Command Help`,
        value: `**Name:** ${this.client.firstCap(command.name)}\n${
          command.aliases?.length
            ? `**Aliases:** ${command.aliases.join(` **|** `)}\n`
            : ""
        }${
          command.args?.length
            ? `**Arguments:** ${command.args
                .map((arg) => arg.name)
                .join(` **|** `)}\n`
            : ""
        }${
          command.permission && command.permission[0]
            ? `**Required Permission:** ${command.permission[0]}\n`
            : ""
        }${command.usage ? `**Usage:** ${prefix}${command.usage}\n\n` : "\n"}${
          command.example
            ? `**Examples:**\n${prefix}${command.example.join(`\n${prefix}`)}`
            : ""
        }`,
      },
    ],
    footer: {
      text: `${this.client.user.username} ©`,
      iconURL: this.client.user.displayAvatarURL({ format: "png" }),
    },
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
      url: this.client.user.displayAvatarURL({ format: "png" }),
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
      text: `${this.client.user.username} ©`,
      iconURL: this.client.user.displayAvatarURL({ format: "png" }),
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
      text: `${this.client.firstCap(title.slice(0, title.length - 1))} by ${
        message.author.tag
      }!`,
      iconURL: this.client.user.displayAvatarURL({ format: "png" }),
    },
  });
};
