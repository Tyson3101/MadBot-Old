import { MessageEmbed, Message, User, GuildMember } from "discord.js";
import { DiscordBot } from "./Client";

/* 
    author: {
      name: user.tag,
      iconURL: user.displayAvatarURL({
        format: "png",
        dynamic: true,
      }),
    },
    color: "DARK_VIVID_PINK",

    footer: {
      text: `${client.user.username} ©`,
      iconURL: client.user.displayAvatarURL({ format: "png" }),
    },
    */

export class TemplatedEmbed extends MessageEmbed {
  static DEFUALT_TEMPLATE(option: Message | User | GuildMember | DiscordBot) {
    // @ts-ignore
    const embed: MessageEmbed = { color: "DARK_VIVID_PINK" };
    if (option instanceof DiscordBot === false) {
      embed.footer = {
        text: `${
          (option as Message | User | GuildMember).client.user.username
        } ©`,
        iconURL: (option as
          | Message
          | User
          | GuildMember).client.user.displayAvatarURL({ format: "png" }),
      };
    } else {
      embed.footer = {
        text: `${(option as DiscordBot).user.username} ©`,
        iconURL: (option as DiscordBot).user.displayAvatarURL({
          format: "png",
        }),
      };
      return embed;
    }
    if (option instanceof Message) {
      embed.author = {
        name: option.author.tag,
        iconURL: option.author.displayAvatarURL({
          format: "png",
          dynamic: true,
        }),
      };
    } else if (option instanceof GuildMember) {
      embed.author = {
        name: option.user.tag,
        iconURL: option.user.displayAvatarURL({
          format: "png",
          dynamic: true,
        }),
      };
    } else if (option instanceof User) {
      embed.author = {
        name: option.tag,
        iconURL: option.displayAvatarURL({
          format: "png",
          dynamic: true,
        }),
      };
    }
    return embed;
  }
  constructor(
    option: Message | User | GuildMember | DiscordBot,
    data: Object | MessageEmbed = {}
  ) {
    super({
      ...TemplatedEmbed.DEFUALT_TEMPLATE(option),
      ...data,
    });
  }
}
