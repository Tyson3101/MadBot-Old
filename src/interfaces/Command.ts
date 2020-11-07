import Discord from "discord.js";
import { DiscordBot } from "../structures/Client";
import { argsInterface as args, utilObjInterface } from "./Args";

export interface commandInterFace {
  // Used to make command setting up easier
  // Interface
  name: string;
  description: string;
  usage: string[];
  example?: string[];
  args: args[];
  catergory?: string;
  aliases?: string[];
  guildOnly?: boolean;
  devOnly?: boolean;
  nsfw?: boolean;
  permission?: [Discord.PermissionString, boolean | Discord.PermissionString];
  run: (
    client: DiscordBot,
    message: Discord.Message,
    args: utilObjInterface
  ) => void;
}
