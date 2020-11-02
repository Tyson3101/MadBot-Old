import { Message, MessageReaction, User, ClientEvents } from "discord.js";
import { DiscordBot } from "../structures/Client";

export interface MessageUpdateEventInterface {
  event: string;
  run: (client: DiscordBot, oldMessage: Message, newMessage: Message) => void; // Function typechecking
}

export interface ReadyEventInterface {
  event: string;
  run: (client: DiscordBot) => void;
}

export interface MessageEventInterface {
  event: string;
  run: (client: DiscordBot, message: Message) => void;
}

export interface messageReactionAddEventInterface {
  event: string;
  run: (client: DiscordBot, reaction: MessageReaction, user: User) => void;
}

export type EventInterface =
  | MessageUpdateEventInterface
  | MessageEventInterface
  | ReadyEventInterface;
