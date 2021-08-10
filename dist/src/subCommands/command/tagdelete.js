"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subCommand = void 0;
exports.subCommand = {
    name: "delete",
    description: "Deletes a tag",
    example: ["prices"],
    args: [
        {
            name: "TagName",
            required: true,
        },
    ],
    async run(message) {
        delete message.guild.DB.tags[message.args[1].value.toLowerCase()];
        await this.client.guildDB.set(message.guild.id, message.guild.DB);
        message.say(`The tag "${message.args[1].value}" has been deleted!`);
    },
};
