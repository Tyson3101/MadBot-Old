"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
const Client_1 = require("../structures/Client");
exports.event = {
    event: "ready",
    async run() {
        let botDev = await Client_1.client.users.fetch("397737988915724310");
        Client_1.client.developers.set(botDev.id, {
            User: botDev,
            position: 0,
        });
        console.log(`-----------------  Ready  ----------------
${Client_1.client.user.tag} is Ready!
-----------------  Stats  ----------------
Developers: ${Client_1.client.developers.size}
Guilds: ${Client_1.client.guilds.cache.size}
Users: ${Client_1.client.guilds.cache.reduce((arr, { memberCount }) => arr + memberCount, 0)}
Commands: ${Client_1.client.commands.size}
Events: ${Client_1.client.events.size}
-----------------  Log  ----------------`);
    },
};
