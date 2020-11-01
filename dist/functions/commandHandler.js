"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlerInit = void 0;
const fs_1 = __importDefault(require("fs"));
exports.handlerInit = (client) => {
    const catergories = fs_1.default.readdirSync("./dist/commands"); // From root
    catergories.forEach((catergory) => {
        const commands = fs_1.default
            .readdirSync(`./dist/commands/${catergory}`)
            .filter((filename) => filename.endsWith(".js"));
        for (let i = 0; i < commands.length; i++) {
            const commandFile = require(`../commands/${catergory}/${commands[i]}`); // From File
            const addCommand = {
                ...commandFile,
                catergory: catergory,
            };
            i += 1;
            console.log(`Command ${i}: Loaded ${addCommand.name}!`);
            client.commands.set(addCommand.name, addCommand);
        }
    });
};
//# sourceMappingURL=commandHandler.js.map