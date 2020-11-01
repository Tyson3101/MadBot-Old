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
    client.developers.set("724911238571622422", {
        id: "724911238571622422",
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
        client.commands.get(commandName).run(message, client, args);
    }
});
client.login(token);
//# sourceMappingURL=index.js.map