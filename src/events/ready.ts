import { Collection } from "discord.js";
import { ReadyEventInterface } from "../interfaces/Events";

export const event: ReadyEventInterface = {
  event: "ready",
  async run(client) {
    let botDev = await client.users.fetch("397737988915724310");
    client.developers.set(botDev.id, {
      User: botDev, // Sets the botdevs user object
      position: 0,
    });
    let collection = new Collection([
      [1, "2"],
      [2, "3"],
    ]);
    console.log(collection);
    console.log(`-----------------  Ready  ----------------
${client.user.tag} is Ready!
-----------------  Stats  ----------------
Developers: ${client.developers.size}
Guilds: ${client.guilds.cache.size}
Users: ${client.guilds.cache.reduce(
      (arr: number, { memberCount }) => arr + memberCount,
      0
    )}
Commands: ${client.commands.size}
Events: ${client.events.size}
-----------------  Log  ----------------`);
  },
};
