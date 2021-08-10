console.log(`-----------------  Starting Up...  ----------------`);
import { config } from "dotenv";
config(); // Allows for reading .env file
import { DiscordBot } from "./structures/Client";
import { Intents } from "discord.js";
import { extendStructures } from "./functions/extendStructures";
const { TOKEN: token } = process.env;

extendStructures(); //Extends Discord

const client: DiscordBot = new DiscordBot({
  // Creates the client
  intents: Intents.ALL,
  partials: ["REACTION", "CHANNEL", "USER", "GUILD_MEMBER"],
}); // Client Options (Partials));

client.login(token); // Logs into the bot
