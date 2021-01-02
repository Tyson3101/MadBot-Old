import { commandInterFace, SubCommand } from "../../interfaces/Command";
import { guildDataBase } from "../../structures/DataBase";

export const subCommand: SubCommand = {
  name: "modlog",
  run(client, message) {
    message.say("Worked!");
  },
};
