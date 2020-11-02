import { DiscordBot } from "../structures/Client";
import { Message } from "discord.js";
import { MessageUpdateEventInterface } from "../interfaces/Events";
const prefix: string = "!";

export const event: MessageUpdateEventInterface = {
  event: "messageUpdate",
  run(client, oldMessage, newMessage) {
    console.log(newMessage.content);
  },
};
