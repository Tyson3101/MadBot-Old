import { SubCommand } from "../../interfaces/Command";

export const subCommand: SubCommand = {
  name: "modlog",
  run(message) {
    message.say("Worked!");
  },
};
