import fs from "fs";
import { DiscordBot } from "../structures/Client";

export const eventHandlerInit = (client: DiscordBot) => {
  let i = 1;
  const events = fs
    .readdirSync("./dist/events")
    .filter((file) => file.endsWith(".js"));
  events.forEach((event) => {
    const eventListener = require(`../events/${event}`).event;
    client.events.set(eventListener.event, eventListener);
    client.on(eventListener.event, eventListener.run);
    console.log(`Event ${i}: Loaded ${eventListener.event}!`);
    i++;
  });
};
