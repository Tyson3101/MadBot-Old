import Discord from "discord.js";

export type commandInterFace = {
  // Interface
  name: string;
  description: string;
  usage: string | string[];
  args: string[];
  catergory?: string;
  aliases: string[] | [];
  guildOnly: boolean;
  devOnly: boolean;
  permissions: Discord.PermissionString[];
  run: () => void;
};
