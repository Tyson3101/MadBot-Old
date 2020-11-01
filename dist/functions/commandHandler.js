"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlerInit = void 0;
const fs_1 = __importDefault(require("fs"));
exports.handlerInit = (client) => {
    const catergories = fs_1.default.readdirSync("./dist/commands"); // From root
    let i = 1;
    catergories.forEach((catergory) => {
        const commands = fs_1.default
            .readdirSync(`./dist/commands/${catergory}`)
            .filter((filename) => filename.endsWith(".js"));
        commands.forEach((fileCommand) => {
            const { command } = require(`../commands/${catergory}/${fileCommand}`); // From File
            const addCommand = {
                ...command,
                catergory: catergory,
            };
            console.log(`Command ${i}: Loaded ${addCommand.name}!`);
            i++;
            client.commands.set(addCommand.name, addCommand);
        });
    });
};
//# sourceMappingURL=commandHandler.js.map