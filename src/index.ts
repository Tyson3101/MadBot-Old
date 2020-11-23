console.log(`-----------------  Starting Up...  ----------------`);
import { config } from "dotenv";
config(); // Allows for reading .env file
import { DiscordBot } from "./structures/Client";
import { CommandHandlerInit } from "./functions/CommandHandler";
import { EventHandlerInit } from "./functions/EventHandler";
import { Intents } from "discord.js";
const { TOKEN: token } = process.env;

const client: DiscordBot = new DiscordBot({
  // Creates the client
  ws: {
    intents: Intents.ALL,
  }, // Intents
  partials: ["REACTION", "CHANNEL", "USER", "GUILD_MEMBER"],
}); // Client Options (Partials));

CommandHandlerInit(client); // Handles Command
EventHandlerInit(client); // Handles Events

client.login(token); // Logs into the bot
