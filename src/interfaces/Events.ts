import {
  GuildMember,
  Message,
  MessageReaction,
  Speaking,
  User,
  VoiceState,
} from "discord.js";
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

export interface guildMemberSpeakingEventInterface {
  event: ClientEvents;
  run: (client: DiscordBot, member: GuildMember, speaking: Speaking) => void;
}

export interface voiceStateEventInterface {
  event: ClientEvents;
  run: (client: DiscordBot, oldState: VoiceState, newState: VoiceState) => void;
}

export interface MessageEventInterface {
  event: ClientEvents;
  run: (client: DiscordBot, message: Message) => void;
}

export interface MessageDeleteEventInterface {
  event: ClientEvents;
  run: (client: DiscordBot, DeleteDmessage: Message) => void;
}

export interface messageReactionAddEventInterface {
  event: ClientEvents;
  run: (client: DiscordBot, reaction: MessageReaction, user: User) => void;
}

export type EventInterface =  // Union Types, used to check at least event is one of these
  | MessageUpdateEventInterface
  | MessageEventInterface
  | ReadyEventInterface
  | messageReactionAddEventInterface
  | MessageDeleteEventInterface
  | guildMemberSpeakingEventInterface
  | voiceStateEventInterface;
