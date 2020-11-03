import Discord from "discord.js";
import { DiscordBot } from "../structures/Client";
import { argsInterface as args } from "./Args";

export interface commandInterFace {
  // Used to make command setting up easier
  // Interface
  name: string;
  description: string;
  usage: string[];
  example: string[];
  args: args[];
  catergory?: string;
  aliases: string[];
  guildOnly: boolean;
  devOnly: boolean;
  permission?: Discord.PermissionString;
  run: (client: DiscordBot, message: Discord.Message, args?: string[]) => void;
}
