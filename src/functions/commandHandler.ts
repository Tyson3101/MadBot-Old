import fs from "fs";
import { DiscordBot } from "../structures/Client";

export const handlerInit = (client: DiscordBot) => {
  const catergories = fs.readdirSync("./dist/commands"); // From root
  let i = 1;
  catergories.forEach((catergory) => {
    const commands = fs
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
