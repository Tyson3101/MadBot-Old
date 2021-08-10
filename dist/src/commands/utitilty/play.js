"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const ytdl_core_1 = __importDefault(require("ytdl-core"));
exports.command = {
    name: "play",
    description: "Plays Song",
    async run(message) {
        message?.member?.voice?.channel?.join().then((connection) => {
            try {
                connection.play(ytdl_core_1.default(message.plainArgs[0]));
            }
            catch {
            }
        });
    },
};
