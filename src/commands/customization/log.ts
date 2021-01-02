import { commandInterFace } from "../../interfaces/Command";
import { guildDataBase } from "../../structures/DataBase";

export const command: commandInterFace = {
  name: "log",
  description: "Sets up the logging for the server!",
  run(client, message) {
    message.say(message.command.subCommands.size);
    if (message?.args?.[0]?.value)
      message.command.subCommands
        .get(message.args[0].value.toLowerCase())
        ?.run(client, message);
  },
};
