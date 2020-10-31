import dotenv from "dotenv";
dotenv.config();
import { Client, Message } from "discord.js";

const { TOKEN: token } = process.env;

const client = new Client();
let prefix: string = "!";

client.on("ready", () => {
  console.log("Ready!");
});

client.on("message", (message: Message) => {
  if (message.author.bot) return;
  const [command, ...args] = message.content
    .trim()
    .slice(prefix.length)
    .split(/ +/g);
});

client.login(token);
