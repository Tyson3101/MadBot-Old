import { config } from "dotenv";
config();
import { DiscordBot } from "./structures/Client";
import { CommandHandlerInit } from "./functions/commandHandler";
import { eventHandlerInit } from "./functions/eventHandler";
const { TOKEN: token } = process.env;

const client: DiscordBot = new DiscordBot();

CommandHandlerInit(client);
eventHandlerInit(client);

client.login(token);
