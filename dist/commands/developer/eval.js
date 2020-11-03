"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
exports.command = {
    name: "eval",
    description: "Evals Javascript",
    usage: ["eval \\`\\`\\`js code \\`\\`\\`"],
    example: ["eval \\`\\`\\`js console.log(63 + 53) \\`\\`\\`"],
    args: [
        {
            name: "code",
            description: "code to eval",
            type: "Code",
            required: true,
            example: ["\\`\\`\\`js console.log(true)\\`\\`\\`"],
            order: 1,
        },
    ],
    aliases: ["evaljs"],
    guildOnly: false,
    devOnly: true,
    async run(client, message, args) {
        console.log(this.args);
    },
};
