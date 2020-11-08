"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const getGuildDB_1 = require("../../functions/getGuildDB");
const embeds_1 = require("../../structures/embeds");
exports.command = {
    name: "help",
    usage: ["help (command/catergory)"],
    example: ["help moderation", "help", "help info"],
    aliases: [],
    public: false,
    args: [
        {
            name: `Command/Catergory`,
            required: false,
            example: ["ban", "moderation"],
            description: "Command Or Catergory to help with",
            type: "Text",
        },
    ],
    async run(client, message, { args, ...util }) {
        const guildDB = await getGuildDB_1.getGuildDB(client, message.guild);
        const prefix = guildDB.prefix;
        if (!args[0]) {
            message.channel.send({
                embed: embeds_1.helpEmbed(client, message.author, prefix),
            });
        }
        else {
            let inputted = client.commands.get(args[0].toLowerCase());
            if (!inputted) {
                let check = client.commands
                    .filter((cmd) => cmd.catergory.toLowerCase() === args[0].toLowerCase())
                    .first();
                if (check) {
                    inputted = args[0];
                    message.channel.send({
                        embed: embeds_1.helpCatergoryEmbed(client, message.author, args[0].toLowerCase(), prefix),
                    });
                }
            }
            else {
                message.channel.send({
                    embed: embeds_1.CommandHelpEmbed(client, message.author, inputted.name, prefix),
                });
            }
        }
    },
};
