import { Client, Collection, Snowflake, Intents } from "discord.js";
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
      ws: { intents: Intents.ALL }, // Intents
      partials: ["CHANNEL", "MESSAGE", "REACTION"], // Client Options (Partials)
    });
    this.supportServer = "https://discord.gg/uP5VV6H"; // Support Server
    this.developers = new Collection();
    this.commands = new Collection();
    this.events = new Collection();
  }
}
