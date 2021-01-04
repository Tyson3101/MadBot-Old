import { MessageUpdateEvent } from "../interfaces/Events";
const prefix: string = "!";

export const event: MessageUpdateEvent = {
  event: "messageUpdate",
  run(oldMessage, newMessage) {
    if (!oldMessage || oldMessage.content === newMessage.content) return; // Checks if they are same or 1 is null, Because embeds rendering fire the event
    console.log("Message Edited: ", newMessage.content);
  },
};
