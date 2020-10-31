"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const discord_js_1 = __importDefault(require("discord.js")); // Import syntax
const fs_1 = __importDefault(require("fs"));
const { TOKEN: token } = process.env;
const client = new discord_js_1.default.Client();
client.commands = new discord_js_1.default.Collection(); // Type Assertion
const catergories = fs_1.default.readdirSync("./dist/commands");
for (let catergory of catergories) {
    const commands = fs_1.default
        .readdirSync(`./dist/commands/${catergory}`)
        .filter((filename) => filename.endsWith(".js"));
    for (let command of commands) {
        const commandFile = require(`./commands/${catergory}/${command}`);
        const addCommand = {
            ...commandFile,
            catergory: catergory,
        };
        client.commands.set(addCommand.name, addCommand);
    }
}
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