import Discord, {
  ApplicationCommandOptionChoice,
  ApplicationCommandOptionData,
  ApplicationCommandOptionType,
} from "discord.js";
import { DiscordBot } from "../structures/Client";

export interface Command {
  // Used to make command setting up easier
  // Interface
  name: string;
  description?: string;
  slashCommand?: boolean;
  note?: string;
  usage?: string;
  example?: string[];
  args?: Args[];
  aliases?: string[];
  guildOnly?: boolean;
  devOnly?: boolean;
  nsfw?: boolean;
  client?: DiscordBot;
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
  usageargs?: string[];
  subCommands?: Discord.Collection<string, SubCommand>;
  run: (message: Discord.Message) => any | Promise<any>;
}

export interface SubCommand extends Command {
  run: (message: Discord.Message) => any | Promise<any>;
}

export interface Args {
  // Args Interface makes it easier to follow
  // Interface
  type?: ApplicationCommandOptionType;
  description?: string;
  name: string;
  required: boolean;
  choices?: ApplicationCommandOptionChoice;
}
