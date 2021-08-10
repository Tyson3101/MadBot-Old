"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
const Client_1 = require("../structures/Client");
exports.event = {
    event: "ready",
    async run(client) {
        const Mutes = (await client.handleMutes(client));
        client.developers.set("397737988915724310", {
            id: "397737988915724310",
            position: 0,
        });
        client.user.setActivity({
            name: `${Client_1.DiscordBot.DEFUALT_PREFIX()}help`,
            type: "COMPETING",
        });
        let slashCommands = client.commands
            .filter(({ catergory }) => catergory.toLowerCase() === "music")
            .map((cmd) => ({ name: cmd.name, description: cmd.description }));
        client.application.commands.set(slashCommands);
        console.log(`-----------------  Ready  ----------------
${client.user.tag} is Ready!
Loggen in with the token ${client.token.slice(0, 34)}${"x".repeat(client.token.slice(34).length)}
-----------------  Stats  ----------------
Developers: ${client.developers.size}
Guilds: ${client.guilds.cache.size}
Users: ${client.guilds.cache.reduce((arr, { memberCount }) => arr + memberCount, 0)}
Commands: ${client.commands.size}
Events: ${client.events.size}
Mutes: ${Mutes.reduce((acc, ele) => acc + ele.length, 0)}
-----------------  Log  ----------------`);
        Mutes.forEach((MuteGuild) => {
            MuteGuild.forEach((Case) => {
                const guild = client.guilds.cache.get(Case.guildID, `${bigint}`);
                if (guild && Case?.active && Case?.endDate) {
                    setTimeout(async () => {
                        client.handleEndMute(await guild.members.fetch(Case.guildID, `${bigint}`), Case.muteRoleID, Case.oldRolesID, await client.guildDB.get(guild.id), Case.caseCount);
                    }, new Date(Case.endDate).getTime() - Date.now());
                }
            });
        });
    },
};
