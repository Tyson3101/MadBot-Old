import { Message } from "discord.js";

export interface MessageUpdateEventInterface {
  event: string;
  run: (oldMessage: Message, newMessage: Message) => void; // Function typechecking
}

export interface ReadyEventInterface {
  event: string;
  run: () => void;
}

export interface MessageEventInterface {
  event: string;
  run: (message: Message) => void;
}

export interface EventInterface {
  MessageUpdateEventInterface;
  MessageEventInterface;
  ReadyEventInterface;
}
