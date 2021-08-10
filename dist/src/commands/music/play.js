"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
exports.command = {
    name: "play",
    description: "Plays Song",
    args: [
        {
            name: "Song",
            type: "STRING",
            description: "Song to play",
            required: true,
        },
    ],
    async run(message) { },
};
