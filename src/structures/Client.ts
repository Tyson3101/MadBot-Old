import { Client, Collection, Snowflake } from "discord.js";
import { commandInterFace } from "../interfaces/Command";
import { developerInterface } from "../interfaces/Developers";
import { EventInterface } from "../interfaces/Events";

export class DiscordBot extends Client {
  // Extending Client
  events: Collection<string, EventInterface>; // Key, Value
  commands: Collection<string, commandInterFace>; // Key, Value
  developers: Collection<Snowflake, developerInterface>; // Key, Value
  supportServer: string;
  constructor() {
    super({
      // Client
      partials: ["GUILD_MEMBER", "CHANNEL", "MESSAGE", "REACTION", "REACTION"], // Client Options (Partials)
    });
    this.commands = new Collection();
    this.supportServer = "https://discord.gg/uP5VV6H";
    this.developers = new Collection();
    this.events = new Collection();
  }
}

export const client: DiscordBot = new DiscordBot();
