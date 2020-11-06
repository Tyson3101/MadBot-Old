"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
exports.event = {
    event: "ready",
    async run(client) {
        let botDev = await client.users.fetch("397737988915724310");
        client.developers.set(botDev.id, {
            User: botDev,
            position: 0,
        });
        await client.user.setActivity({
            name: `!help`,
            type: "COMPETING",
        });
        console.log(`-----------------  Ready  ----------------
${client.user.tag} is Ready!
-----------------  Stats  ----------------
Developers: ${client.developers.size}
Guilds: ${client.guilds.cache.size}
Users: ${client.guilds.cache.reduce((arr, { memberCount }) => arr + memberCount, 0)}
Commands: ${client.commands.size}
Events: ${client.events.size}
-----------------  Log  ----------------`);
    },
};
