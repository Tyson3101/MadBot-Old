import fs from "fs";
import { DiscordBot } from "../structures/Client";
import { firstCap } from "./FirstCap";

export const CommandHandlerInit = (client: DiscordBot): void => {
  const catergories = fs.readdirSync("./dist/src/commands"); // From root
  let i = 1;
  catergories.forEach((catergory) => {
    const commands = fs
      .readdirSync(`./dist/src/commands/${catergory}`)
      .filter((filename) => filename.endsWith(".js"));
    commands.forEach(async (fileCommand) => {
      const { command } = await import(
        `../commands/${catergory}/${fileCommand}`
      ); // From File
      if (!command || client.commands.has(command.name.toLowerCase())) return;
      command.name = command.name.toLowerCase();
      const addCommand = {
        ...command,
        catergory: catergory, // Adds catergory property here to make it easier, is the folder name of that command file
      };

      if (i === 1) console.log(`-----------------  Commands  ----------------`);
      console.log(`Command ${i}: Loaded ${firstCap(addCommand.name)}!`);
      i++;

      client.commands.set(addCommand.name, addCommand);
    });
  });
};
