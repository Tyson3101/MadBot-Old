import { config } from "dotenv";
config();
import { DiscordBot, client } from "./structures/Client";
import { CommandHandlerInit } from "./functions/commandHandler";
import { eventHandlerInit } from "./functions/eventHandler";
const { TOKEN: token } = process.env;
CommandHandlerInit(client);
eventHandlerInit(client);

client.login(token);
