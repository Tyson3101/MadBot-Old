"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordBot = void 0;
const discord_js_1 = require("discord.js");
class DiscordBot extends discord_js_1.Client {
    constructor() {
        super({
            partials: ["GUILD_MEMBER", "CHANNEL", "MESSAGE", "REACTION", "REACTION"],
        });
        this.commands = new discord_js_1.Collection();
        this.supportServer = "https://discord.gg/uP5VV6H";
    }
}
exports.DiscordBot = DiscordBot;
//# sourceMappingURL=Client.js.map