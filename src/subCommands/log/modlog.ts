import { SubCommand } from "../../interfaces/Command";

export const subCommand: SubCommand = {
  name: "modlog",
  run(this.client, message) {
    message.say("Worked!");
  },
};
