"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
dotenv_1.config();
const Client_1 = require("./interfaces/Client");
const commandHandler_1 = require("./functions/commandHandler");
const { TOKEN: token } = process.env;
const client = new Client_1.DiscordBot(); // Type Assertion
commandHandler_1.handlerInit(client);
let prefix = "!";
console.log(client.commands);
client.on("ready", () => {
    console.log("Ready!");
});
client.on("message", (message) => {
    if (message.author.bot)
        return;
    const [command, ...args] = message.content
        .trim()
        .slice(prefix.length)
        .split(/ +/g);
});
client.login(token);
//# sourceMappingURL=index.js.map