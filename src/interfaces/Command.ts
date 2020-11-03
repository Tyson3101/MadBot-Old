import Discord from "discord.js";
import { DiscordBot } from "../structures/Client";
import { argsInterface as args } from "./Args";

export interface commandInterFace {
  // Interface
  name: string;
  description: string;
  usage: string[];
  args: args[];
  catergory?: string;
  aliases: string[];
  guildOnly: boolean;
  devOnly: boolean;
  permission?: Discord.PermissionString;
  run: (client: DiscordBot, message: Discord.Message, args?: string[]) => void;
}
