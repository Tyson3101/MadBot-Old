import { DiscordBot, client } from "../structures/Client";
import { Message } from "discord.js";
import { MessageUpdateEventInterface } from "../interfaces/Events";
const prefix: string = "!";

export const event: MessageUpdateEventInterface = {
  event: "messageUpdate",
  run(oldMessage: Message, newMessage: Message) {
    console.log(newMessage.content);
  },
};
