import { DiscordBot, client } from "../structures/Client";
import { ReadyEventInterface } from "../interfaces/Events";

export const event: ReadyEventInterface = {
  event: "ready",
  async run() {
    let botDev = await client.users.fetch("397737988915724310");
    client.developers.set(botDev.id, {
      User: botDev,
      position: 0,
    });
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
