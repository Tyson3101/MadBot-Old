import { MessageEmbed } from "discord.js";
import { MessageDeleteEventInterface } from "../interfaces/Events";

export const event: MessageDeleteEventInterface = {
  event: "messageDelete",
  run(client, message) {},
};
