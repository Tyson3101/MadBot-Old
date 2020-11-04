import fs from "fs";
import { EventInterface } from "../interfaces/Events";
import { DiscordBot } from "../structures/Client"; // Import Syntax

export const EventHandlerInit = (client: DiscordBot): void => {
  let i = 1; // Counter for console logging
  const events = fs
    .readdirSync("./dist/events")
    .filter((file) => file.endsWith(".js"));
  events.forEach((fileEvent) => {
    const event: EventInterface = require(`../events/${fileEvent}`).event;
    client.events.set(event.event, event);
    client.on(<any>event.event, event.run.bind(null, client)); // Type Casting (Can also do `(event as any).event`) and Function Bind() <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind>
    if (i === 1) console.log(`-----------------  Events  ----------------`);
    console.log(`Event ${i}: Loaded ${event.event}!`);
    i++;
  });
};
