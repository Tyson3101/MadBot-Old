"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const Embeds_1 = require("../../structures/Embeds");
exports.command = {
    name: "help",
    example: ["help moderation", "help", "help info"],
    args: [
        {
            name: `Command/Catergory`,
            required: false,
        },
    ],
    async run(message) {
        const { prefix } = message;
        if (!message.args[0]?.value) {
            message.say({
                embed: Embeds_1.helpEmbed(this.client, message.author, prefix),
            });
        }
        else {
            let inputted = this.client.commands.get(message.args[0]?.value.toLowerCase());
            if (!inputted) {
                let check = this.client.commands
                    .filter((cmd) => cmd.catergory.toLowerCase() ===
                    message.args[0]?.value.toLowerCase())
                    .first();
                if (check) {
                    inputted = message.args[0]?.value;
                    message.say({
                        embed: Embeds_1.helpCatergoryEmbed(this.client, message.author, message.args[0]?.value.toLowerCase(), prefix),
                    });
                }
            }
            else {
                message.say({
                    embed: Embeds_1.CommandHelpEmbed(this.client, message.author, inputted.name, prefix),
                });
            }
        }
    },
};
