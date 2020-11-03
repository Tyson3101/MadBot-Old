console.log(`-----------------  Starting Up...  ----------------`);
import { config } from "dotenv";
config();
import { DiscordBot } from "./structures/Client";
import { CommandHandlerInit } from "./functions/CommandHandler";
import { EventHandlerInit } from "./functions/EventHandler";
const { TOKEN: token } = process.env;

const client: DiscordBot = new DiscordBot();

CommandHandlerInit(client);
EventHandlerInit(client);

client.login(token);
