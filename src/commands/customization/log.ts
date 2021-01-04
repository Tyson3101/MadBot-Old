import { Command } from "../../interfaces/Command";

export const command: Command = {
  name: "log",
  description: "Sets up the logging for the server!",
  run(this.client, message) {
    message.say(message.command.subCommands.size);
    if (message?.args?.[0]?.value)
      message.command.subCommands
        .get(message.args[0].value.toLowerCase())
        ?.run(this.client, message);
  },
};
