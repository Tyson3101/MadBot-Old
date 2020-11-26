import { Client, Collection, Snowflake, ClientOptions } from "discord.js";
import { commandInterFace } from "../interfaces/Command";
import fs from "fs";
import { developerInterface } from "../interfaces/Developers";
import { EventInterface } from "../interfaces/Events";
import { firstCap } from "../functions/FirstCap";

export class DiscordBot extends Client {
  // Extending Client
  events: Collection<string, EventInterface>; // Key, Value
  commands: Collection<string, commandInterFace>; // Key, Value
  developers: Collection<Snowflake, developerInterface>; // Key, Value
  supportServer: string;
  prefix: string;
  constructor(clientOptions?: ClientOptions) {
    super(clientOptions);
    this.supportServer = "https://discord.gg/uP5VV6H"; // Support Server
    this.developers = new Collection();
    this.commands = new Collection();
    this.events = new Collection();
    this.prefix = "m!";
  }
  private EventHandlerInit(client: this): void {
    let i = 1; // Counter for console logging
    const events = fs
      .readdirSync("./dist/src/events")
      .filter((file) => file.endsWith(".js"));
    events.forEach(async (fileEvent) => {
      const event: EventInterface = (await import(`../events/${fileEvent}`))
        .event;
      if (!event || client.events.has(event.event)) return;
      client.events.set(event.event, event);
      if (event.event === "ready")
        client.once(<any>event.event, event.run.bind(null, client));
      else client.on(<any>event.event, event.run.bind(null, client)); // Type Casting (Can also do `(event as any).event`) and Function Bind() <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind>
      if (i === 1) console.log(`-----------------  Events  ----------------`);

      console.log(`Event ${i}: Loaded ${event.event}!`);
      i++;
    });
  }
  private CommandHandlerInit(client: this) {
    const catergories = fs.readdirSync("./dist/src/commands"); // From root
    let i = 1;
    catergories.forEach((catergory) => {
      const commands = fs
        .readdirSync(`./dist/src/commands/${catergory}`)
        .filter((filename) => filename.endsWith(".js"));
      commands.forEach(async (fileCommand) => {
        const { command } = await import(
          `../commands/${catergory}/${fileCommand}`
        ); // From File
        if (!command || client.commands.has(command.name.toLowerCase())) return;
        command.name = command.name.toLowerCase();
        const addCommand = {
          ...command,
          catergory: catergory, // Adds catergory property here to make it easier, is the folder name of that command file
        };

        if (i === 1)
          console.log(`-----------------  Commands  ----------------`);
        console.log(`Command ${i}: Loaded ${firstCap(addCommand.name)}!`);
        i++;

        client.commands.set(addCommand.name, addCommand);
      });
    });
  }
  public async startUp(token: string) {
    if (!this.user) {
      // Checks if logged in!
      this.CommandHandlerInit(this); // Handles Commands
      this.EventHandlerInit(this); // Handles Events
      try {
        let TOKEN = await this.login(token);
        return TOKEN;
      } catch (e) {
        throw e;
      }
    } else throw new TypeError("Already logged In!");
  }
}
