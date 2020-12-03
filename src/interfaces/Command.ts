import Discord from "discord.js";
import { DiscordBot } from "../structures/Client";
import { argsInterface as args } from "./Args";

export interface commandInterFace {
  // Used to make command setting up easier
  // Interface
  name: string;
  description?: string;
  note?: string;
  usage?: string[];
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
  run: (client: DiscordBot, message: Discord.Message) => any | Promise<any>;
}
