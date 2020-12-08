import { Structures } from "discord.js";
import { extendMessage } from "../structures/Message";

export const extendStructures = (): void => {
  //@ts-ignore (I am sorrry)
  Structures.extend("Message", (Message) => {
    return extendMessage(Message);
  });
};
