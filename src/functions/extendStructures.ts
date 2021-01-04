import { Structures } from "discord.js";
import { extendMessage } from "../structures/Message";

export const extendStructures = (): void => {
  //@ts-ignore
  Structures.extend("Message", (Message) => {
    return extendMessage(Message);
  });
};
