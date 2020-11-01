import { config } from "dotenv";
config();
import Discord from "discord.js"; // Import syntax
import { DiscordBot } from "./interfaces/Client";
import { handlerInit } from "./functions/commandHandler";
const { TOKEN: token } = process.env;
const client: DiscordBot = new DiscordBot(); // Type Assertion
handlerInit(client);
let prefix: string = "!";
console.log(client.commands);

client.on("ready", () => {
  console.log("Ready!");
});

client.on("message", (message: Discord.Message) => {
  if (message.author.bot) return;
  const [command, ...args] = message.content
    .trim()
    .slice(prefix.length)
    .split(/ +/g);
});

client.login(token);
