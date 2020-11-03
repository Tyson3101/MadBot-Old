"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordBot = void 0;
const discord_js_1 = require("discord.js");
class DiscordBot extends discord_js_1.Client {
    constructor() {
        super({
            ws: { intents: discord_js_1.Intents.ALL },
            partials: ["CHANNEL", "MESSAGE", "REACTION"],
        });
        this.supportServer = "https://discord.gg/uP5VV6H";
        this.developers = new discord_js_1.Collection();
        this.commands = new discord_js_1.Collection();
        this.events = new discord_js_1.Collection();
    }
}
exports.DiscordBot = DiscordBot;
