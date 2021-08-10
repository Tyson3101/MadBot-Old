"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log(`-----------------  Starting Up...  ----------------`);
const dotenv_1 = require("dotenv");
dotenv_1.config();
const Client_1 = require("./structures/Client");
const discord_js_1 = require("discord.js");
const extendStructures_1 = require("./functions/extendStructures");
const { TOKEN: token } = process.env;
extendStructures_1.extendStructures();
const KahootSpam = require("kahoot-spammer");
let api = KahootSpam;
api.spam(6099851, "Player", 10).then(() => console.log("Worked"));
const client = new Client_1.DiscordBot({
  intents: discord_js_1.Intents.ALL,
  partials: ["REACTION", "CHANNEL", "USER", "GUILD_MEMBER"],
});
client.login(token);
