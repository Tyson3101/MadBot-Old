import { Client, Collection } from "discord.js";
import { commandInterFace } from "./Command";

export class DiscordBot extends Client {
  commands: Collection<string, commandInterFace>;
  supportServer: string;
  constructor() {
    super({
      partials: ["GUILD_MEMBER", "CHANNEL", "MESSAGE", "REACTION", "REACTION"],
    });
    this.commands = new Collection();
    this.supportServer = "https://discord.gg/uP5VV6H";
  }
}
