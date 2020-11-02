"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandlerInit = void 0;
const fs_1 = __importDefault(require("fs"));
exports.CommandHandlerInit = (client) => {
    const catergories = fs_1.default.readdirSync("./dist/commands");
    let i = 1;
    catergories.forEach((catergory) => {
        const commands = fs_1.default
            .readdirSync(`./dist/commands/${catergory}`)
            .filter((filename) => filename.endsWith(".js"));
        commands.forEach((fileCommand) => {
            const { command } = require(`../commands/${catergory}/${fileCommand}`);
            const addCommand = {
                ...command,
                catergory: catergory,
            };
            if (i === 1)
                console.log(`-----------------  Commands  ----------------`);
            console.log(`Command ${i}: Loaded ${addCommand.name}!`);
            i++;
            client.commands.set(addCommand.name, addCommand);
        });
    });
};
