import { ReadyEventInterface } from "../interfaces/Events";
import { infringementInterface } from "../interfaces/GuildDataBase";
import { guildDataBase } from "../structures/DataBase";

export const event: ReadyEventInterface = {
  event: "ready",
  async run(client) {
    client.developers.set("397737988915724310", {
      id: "397737988915724310", // Sets the botdevs user id
      position: 0,
    });

    await client.user.setActivity({
      name: `${client.prefix}help`,
      type: "COMPETING",
    });

    console.log(`-----------------  Ready  ----------------
${client.user.tag} is Ready!
Loggen in with the token ${client.token.slice(0, 34)}${"x".repeat(
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
    const Mutes = (await client.handleMutes(
      client
    )) as infringementInterface[][];
    Mutes.forEach((MuteGuild: infringementInterface[]) => {
      MuteGuild.forEach((Case: infringementInterface) => {
        const guild = client.guilds.cache.get(Case.guildID);
        if (guild && Case?.active && Case?.endDate) {
          setTimeout(async () => {
            client.handleEndMute(
              await guild.members.fetch(Case.victim),
              Case.muteRoleID,
              Case.oldRolesID,
              await guildDataBase.get(guild.id),
              Case.caseCount
            );
          }, new Date(Case.endDate).getTime() - Date.now());
        }
      });
    });
  },
};
