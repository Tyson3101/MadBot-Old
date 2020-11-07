import fs from "fs";
import { commandInterFace } from "../interfaces/Command";
import { DiscordBot } from "../structures/Client";

export const CommandHandlerInit = (client: DiscordBot): void => {
  const catergories = fs.readdirSync("./dist/commands"); // From root
  let i = 1;
  catergories.forEach((catergory) => {
    const commands = fs
      .readdirSync(`./dist/commands/${catergory}`)
      .filter((filename) => filename.endsWith(".js"));
    commands.forEach((fileCommand) => {
      const { command } = require(`../commands/${catergory}/${fileCommand}`); // From File
      if (!command || client.commands.has(command.name)) return;
      const addCommand = {
        ...command,
        catergory: catergory, // Adds catergory property here to make it easier, is the folder name of that command file
      };
      if (i === 1) console.log(`-----------------  Commands  ----------------`);
      console.log(`Command ${i}: Loaded ${addCommand.name}!`);
      i++;
      client.commands.set(addCommand.name, addCommand);
    });
  });
};
