"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
dotenv_1.config();
const Client_1 = require("./structures/Client");
const commandHandler_1 = require("./functions/commandHandler");
const { TOKEN: token } = process.env;
const client = new Client_1.DiscordBot();
commandHandler_1.handlerInit(client);
const embeds_1 = require("./structures/embeds");
let prefix = "!";
client.on("ready", () => {
    console.log("Ready!");
    client.developers.set("397737988915724310", {
        id: "397737988915724310",
        username: "Tyson",
        tag: "Tyson#3101",
        position: 0,
    });
});
client.on("message", (message) => {
    if (message.author.bot)
        return;
    const [commandName, ...args] = message.content
        .toLowerCase()
        .trim()
        .slice(prefix.length)
        .split(/ +/g);
    const command = client.commands.get(commandName) ||
        client.commands.find((cmd) => cmd.aliases.includes(commandName));
    if (command) {
        if (command.guildOnly && message.channel.type === "dm")
            return message.channel.send({
                embed: embeds_1.dmCommandEmbed(client, message.author),
            });
        if (command.devOnly && !client.developers.has(message.author.id))
            return message.channel.send({
                embed: embeds_1.ownerCommandEmbed(client, message.author),
            });
        if (command.permissions &&
            !message.member.hasPermission([command.permissions, "ADMINISTRATOR"]))
            return message.channel.send({
                embed: embeds_1.invaildPermissionsCommandEmbed(client, message.author, command.permissions),
            });
        try {
            command.run(message, client, args);
        }
        catch (e) {
            return message.channel.send({
                embed: embeds_1.errorCommandEmbed(client, message.author, e),
            });
        }
    }
});
client.login(token);
//# sourceMappingURL=index.js.map