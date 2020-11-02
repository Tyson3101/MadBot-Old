import fs from "fs";
import { EventInterface } from "../interfaces/Events";
import { DiscordBot } from "../structures/Client";

export const eventHandlerInit = (client: DiscordBot) => {
  let i = 1;
  const events = fs
    .readdirSync("./dist/events")
    .filter((file) => file.endsWith(".js"));
  events.forEach((fileEvent) => {
    const event: EventInterface = require(`../events/${fileEvent}`).event;
    client.events.set(event.event, event);
    client.on(event.event, event.run.bind(null, client));
    if (i === 1) console.log(`-----------------  Events  ----------------`);
    console.log(`Event ${i}: Loaded ${event.event}!`);
    i++;
  });
};
