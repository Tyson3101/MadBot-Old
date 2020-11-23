import { handleEndMute, handleMutes } from "../functions/handleMutes";
import { ReadyEventInterface } from "../interfaces/Events";
import { infringementInterface } from "../interfaces/GuildDataBase";
import { guildDataBase } from "../structures/DataBase";

function returnMultiple(stringToRepeat: string, timesToRepeat: number): string {
  let array = [];
  for (let i = 0; i < timesToRepeat; i++) array.push(stringToRepeat);
  return array.join("");
}

export const event: ReadyEventInterface = {
  event: "ready",
  async run(client) {
    let botDev = await client.users.fetch("397737988915724310");
    client.developers.set(botDev.id, {
      User: botDev, // Sets the botdevs user object
      position: 0,
    });

    await client.user.setActivity({
      name: `${client.prefix}help`,
      type: "COMPETING",
    });

    console.log(`-----------------  Ready  ----------------
${client.user.tag} is Ready!
Loggen in with the token ${client.token.slice(0, 34)}${returnMultiple(
      "x",
      client.token.slice(34).length
    )}
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
    const Mutes: infringementInterface[] = (await handleMutes(client))[1];
    if (Mutes.length) {
      Mutes.forEach((Case) => {
        const guild = client.guilds.cache.get(Case.guildID);
        if (guild && Case?.active && Case?.endDate) {
          setTimeout(async () => {
            handleEndMute(
              await guild.members.fetch(Case.victim.id),
              Case.muteRoleID,
              Case.oldRolesID,
              await guildDataBase.get(guild.id),
              Case.caseCount
            );
          }, new Date(Case.endDate).getTime() - Date.now());
        }
      });
    }
  },
};
