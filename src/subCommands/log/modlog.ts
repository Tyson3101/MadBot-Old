import { SubCommand } from "../../interfaces/Command";

export const subCommand: SubCommand = {
  name: "modlog",
  run(client, message) {
    message.say("Worked!");
  },
};
