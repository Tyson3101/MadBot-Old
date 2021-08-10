"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
exports.command = {
    name: "tagdelete",
    description: "Deletes a tag",
    example: ["prices"],
    args: [
        {
            name: "TagName",
            required: true,
        },
    ],
    async run(message) {
        delete message.guild.DB.tags[message.args[0].value.toLowerCase()];
        await this.client.guildDB.set(message.guild.id, message.guild.DB);
        message.say(`The tag "${message.args[0].value}" has been deleted!`);
    },
};
