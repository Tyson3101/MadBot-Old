import fs from "fs";
import { EventInterface } from "../interfaces/Events";
import { DiscordBot } from "../structures/Client"; // Import Syntax

export const EventHandlerInit = (client: DiscordBot): void => {
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
};
