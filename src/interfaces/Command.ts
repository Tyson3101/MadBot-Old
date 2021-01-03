import Discord from "discord.js";
import { DiscordBot } from "../structures/Client";
import { Args as args } from "./Command";

export interface Command {
  // Used to make command setting up easier
  // Interface
  name: string;
  description?: string;
  note?: string;
  usage?: string;
  example?: string[];
  args?: args[];
  aliases?: string[];
  guildOnly?: boolean;
  devOnly?: boolean;
  nsfw?: boolean;
  permission?: [
    Discord.PermissionString,
    boolean | Discord.PermissionString,
    Discord.PermissionString?,
    Discord.PermissionString?,
    Discord.PermissionString?,
    Discord.PermissionString?,
    Discord.PermissionString?,
    Discord.PermissionString?,
    Discord.PermissionString?,
    Discord.PermissionString?,
    Discord.PermissionString?,
    Discord.PermissionString?
  ];
  public?: boolean;
  catergory?: string;
  subCommands?: Discord.Collection<string, SubCommand>;
  run: (client: DiscordBot, message: Discord.Message) => any | Promise<any>;
}

export interface SubCommand {
  name: string;
  run: (client: DiscordBot, message: Discord.Message) => any | Promise<any>;
}

export interface Args {
  // Args Interface makes it easier to follow
  // Interface
  name: string;
  required: boolean;
}
