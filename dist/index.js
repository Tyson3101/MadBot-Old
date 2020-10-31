"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const discord_js_1 = require("discord.js");
const { TOKEN: token } = process.env;
const client = new discord_js_1.Client();
let prefix = "!";
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