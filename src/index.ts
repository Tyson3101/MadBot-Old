console.log(`-----------------  Starting Up...  ----------------`);
import { config } from "dotenv";
config();
import { DiscordBot } from "./structures/Client";
import { CommandHandlerInit } from "./functions/CommandHandler";
import { EventHandlerInit } from "./functions/EventHandler";
const { TOKEN: token } = process.env;

const client: DiscordBot = new DiscordBot(); // Creates the client

CommandHandlerInit(client); // Handles Command
EventHandlerInit(client); // Handles Events

client.login(token); // Logs into the bot
