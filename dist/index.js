"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log(`-----------------  Starting Up...  ----------------`);
const dotenv_1 = require("dotenv");
dotenv_1.config();
const Client_1 = require("./structures/Client");
const CommandHandler_1 = require("./functions/CommandHandler");
const EventHandler_1 = require("./functions/EventHandler");
const discord_js_1 = require("discord.js");
const { TOKEN: token } = process.env;
const client = new Client_1.DiscordBot({
    ws: { intents: discord_js_1.Intents.ALL },
    partials: ["CHANNEL", "MESSAGE", "REACTION"],
});
CommandHandler_1.CommandHandlerInit(client);
EventHandler_1.EventHandlerInit(client);
client.login(token);
