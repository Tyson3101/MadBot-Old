import { GuildFeatures } from "discord.js";

export interface Guild {
  id: string;
  name: string;
  icon: string;
  owner: false;
  permissions: number;
  features: GuildFeatures[];
  permissions_new: string;
}
