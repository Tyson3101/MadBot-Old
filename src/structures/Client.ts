import { Client, Collection, Snowflake } from "discord.js";
import { commandInterFace } from "../interfaces/Command";
import { developerObject } from "../interfaces/Developers";

export class DiscordBot extends Client {
  // Extending Client
  commands: Collection<string, commandInterFace>; // Key, Value
  developers: Collection<Snowflake, developerObject>; // Key, Value
  supportServer: string;
  constructor() {
    super({
      // Client
      partials: ["GUILD_MEMBER", "CHANNEL", "MESSAGE", "REACTION", "REACTION"], // Client Options
    });
    this.commands = new Collection();
    this.supportServer = "https://discord.gg/uP5VV6H";
    this.developers = new Collection();
  }
}
