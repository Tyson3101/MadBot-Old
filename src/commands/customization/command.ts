import { Command } from "../../interfaces/Command";

export const command: Command = {
  name: "command",
  aliases: ["tag"],
  description: "Create, edit, and delete commands.",
  args: [
    {
      name: "create",
      required: false,
    },
  ],
  run(message) {
    message.say(message.command.subCommands.size);
    if (message?.args?.[0]?.value)
      message.command.subCommands
        .get(message.args[0].value.toLowerCase())
        ?.run(message);
  },
};
