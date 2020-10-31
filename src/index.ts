import dotenv from "dotenv";
dotenv.config();
import Discord from "discord.js"; // Import syntax
import fs from "fs";

const { TOKEN: token } = process.env;
const client = new Discord.Client();
(client as any).commands = new Discord.Collection(); // Type Assertion
const catergories = fs.readdirSync("./dist/commands");
for (let catergory of catergories) {
  const commands = fs
    .readdirSync(`./dist/commands/${catergory}`)
    .filter((filename) => filename.endsWith(".js"));
  for (let command of commands) {
    const commandFile = require(`./commands/${catergory}/${command}`);
    const addCommand = {
      ...commandFile,
      catergory: catergory,
    };
    (client as any).commands.set(addCommand.name, addCommand);
  }
}
let prefix: string = "!";
console.log((client as any).commands);

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
