import Discord from "discord.js";
import { DiscordBot } from "../structures/Client";
import { args } from "./args";

export interface commandInterFace {
  // Interface
  name: string;
  description: string;
  usage: string | string[];
  args: args[];
  catergory?: string;
  aliases: string[];
  guildOnly: boolean;
  devOnly: boolean;
  permission?: Discord.PermissionString;
  run: (message: Discord.Message, client?: DiscordBot, args?: string[]) => void;
}
