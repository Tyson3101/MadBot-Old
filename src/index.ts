import { config } from "dotenv";
config();
import Discord from "discord.js"; // Import syntax
import { DiscordBot } from "./structures/Client";
import { handlerInit } from "./functions/commandHandler";
const { TOKEN: token } = process.env;
const client: DiscordBot = new DiscordBot();
handlerInit(client);
import {
  dmCommandEmbed,
  ownerCommandEmbed,
  invaildPermissionsCommandEmbed,
  errorCommandEmbed,
} from "./structures/embeds";
let prefix: string = "!";

client.on("ready", () => {
  console.log("Ready!");
  client.developers.set("397737988915724310", {
    id: "397737988915724310",
    username: "Tyson",
    tag: "Tyson#3101",
    position: 0,
  });
});

client.on("message", (message: Discord.Message) => {
  if (message.author.bot) return;
  const [commandName, ...args] = message.content
    .toLowerCase()
    .trim()
    .slice(prefix.length)
    .split(/ +/g);
  const command =
    client.commands.get(commandName) ||
    client.commands.find((cmd) => cmd.aliases.includes(commandName));
  if (command) {
    if (command.guildOnly && message.channel.type === "dm")
      return message.channel.send({
        embed: dmCommandEmbed(client, message.author),
      });

    if (command.devOnly && !client.developers.has(message.author.id))
      return message.channel.send({
        embed: ownerCommandEmbed(client, message.author),
      });
    if (
      command.permissions &&
      !message.member.hasPermission([command.permissions, "ADMINISTRATOR"])
    )
      return message.channel.send({
        embed: invaildPermissionsCommandEmbed(
          client,
          message.author,
          command.permissions
        ),
      });
    try {
      command.run(message, client, args);
    } catch (e) {
      return message.channel.send({
        embed: errorCommandEmbed(client, message.author, e),
      });
    }
  }
});

client.login(token);
