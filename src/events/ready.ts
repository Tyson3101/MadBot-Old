import { ReadyEvent } from "../interfaces/Events";
import { Infringement } from "../interfaces/GuildDataBase";

export const event: ReadyEvent = {
  event: "ready",
  async run() {
    const Mutes = (await this.client.handleMutes(
      this.client
    )) as Infringement[][];
    this.client.developers.set("397737988915724310", {
      id: "397737988915724310", // Sets the botdevs user id
      position: 0,
    });

    await this.client.user.setActivity({
      name: `${this.client.prefix}help`,
      type: "COMPETING",
    });
    console.log(`-----------------  Ready  ----------------
${this.client.user.tag} is Ready!
Loggen in with the token ${this.client.token.slice(0, 34)}${"x".repeat(
      this.client.token.slice(34).length
    )}
-----------------  Stats  ----------------
Developers: ${this.client.developers.size}
Guilds: ${this.client.guilds.cache.size}
Users: ${this.client.guilds.cache.reduce(
      (arr: number, { memberCount }) => arr + memberCount,
      0
    )}
Commands: ${this.client.commands.size}
Events: ${this.client.events.size}
Mutes: ${Mutes.reduce((acc, ele) => acc + ele.length, 0)}
-----------------  Log  ----------------`);
    Mutes.forEach((MuteGuild: Infringement[]) => {
      MuteGuild.forEach((Case: Infringement) => {
        const guild = this.client.guilds.cache.get(Case.guildID);
        if (guild && Case?.active && Case?.endDate) {
          setTimeout(async () => {
            this.client.handleEndMute(
              await guild.members.fetch(Case.victim),
              Case.muteRoleID,
              Case.oldRolesID,
              await this.client.guildDB.get(guild.id),
              Case.caseCount
            );
          }, new Date(Case.endDate).getTime() - Date.now());
        }
      });
    });
  },
};
