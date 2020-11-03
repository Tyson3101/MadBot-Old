import { DiscordBot } from "../structures/Client";
import { Message } from "discord.js";
import { MessageUpdateEventInterface } from "../interfaces/Events";
const prefix: string = "!";

export const event: MessageUpdateEventInterface = {
  event: "messageUpdate",
  run(client, oldMessage, newMessage) {
    if (!oldMessage || oldMessage.content === newMessage.content) return; // Checks if they are same or 1 is null, Because embeds rendering fire the event
    console.log(newMessage.content);
  },
};
