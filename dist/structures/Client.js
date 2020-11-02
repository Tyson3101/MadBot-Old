"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = exports.DiscordBot = void 0;
const discord_js_1 = require("discord.js");
class DiscordBot extends discord_js_1.Client {
    constructor() {
        super({
            // Client
            partials: ["GUILD_MEMBER", "CHANNEL", "MESSAGE", "REACTION", "REACTION"],
        });
        this.commands = new discord_js_1.Collection();
        this.supportServer = "https://discord.gg/uP5VV6H";
        this.developers = new discord_js_1.Collection();
        this.events = new discord_js_1.Collection();
    }
}
exports.DiscordBot = DiscordBot;
exports.client = new DiscordBot();
