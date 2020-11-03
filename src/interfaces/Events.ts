import { Message, MessageReaction, User } from "discord.js";
import { DiscordBot } from "../structures/Client";
import { ClientEvents } from "../interfaces/EventList";

export interface MessageUpdateEventInterface {
  event: ClientEvents;
  run: (client: DiscordBot, oldMessage: Message, newMessage: Message) => void; // Function typechecking
}

export interface ReadyEventInterface {
  event: ClientEvents;
  run: (client: DiscordBot) => void;
}

export interface MessageEventInterface {
  event: ClientEvents;
  run: (client: DiscordBot, message: Message) => void;
}

export interface messageReactionAddEventInterface {
  event: ClientEvents;
  run: (client: DiscordBot, reaction: MessageReaction, user: User) => void;
}

export type EventInterface =
  | MessageUpdateEventInterface
  | MessageEventInterface
  | ReadyEventInterface
  | messageReactionAddEventInterface;
