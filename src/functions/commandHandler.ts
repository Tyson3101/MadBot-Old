import fs from "fs";
import { DiscordBot } from "../interfaces/Client";

export const handlerInit = (client: DiscordBot) => {
  const catergories = fs.readdirSync("./dist/commands"); // From root
  catergories.forEach((catergory) => {
    const commands = fs
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
