import { Command, SubCommand } from "../../interfaces/Command";
import { GuildDataBase } from "../../structures/DataBase";

export const subCommand: SubCommand = {
  name: "modlog",
  run(this.client, message) {
    message.say("Worked!");
  },
};
