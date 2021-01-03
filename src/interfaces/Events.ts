import {
  GuildMember,
  Message,
  MessageReaction,
  Speaking,
  User,
  VoiceState,
} from "discord.js";
import { DiscordBot } from "../structures/Client";

export type ClientEvents =  // List of client events
  | "rateLimit"
  | "ready"
  | "resumed"
  | "guildCreate"
  | "guildDelete"
  | "guildUpdate"
  | "inviteCreate"
  | "inviteDelete"
  | "guildUnavailable"
  | "guildMemberAdd"
  | "guildMemberRemove"
  | "guildMemberAvailable"
  | "guildMemberSpeaking"
  | "guildMembersChunk"
  | "guildIntegrationsUpdate"
  | "roleCreate"
  | "roleDelete"
  | "roleUpdate"
  | "emojiCreate"
  | "emojiDelete"
  | "emojiUpdate"
  | "guildBanAdd"
  | "guildBanRemove"
  | "channelCreate"
  | "channelDelete"
  | "channelUpdate"
  | "channelPinsUpdate"
  | "message"
  | "messageDelete"
  | "messageUpdate"
  | "messageDeleteBulk"
  | "messageReactionAdd"
  | "messageReactionRemove"
  | "messageReactionRemoveAll"
  | "userUpdate"
  | "presenceUpdate"
  | "voiceStateUpdate"
  | "subscribe"
  | "unsubscribe"
  | "typingStart"
  | "webhookUpdate"
  | "disconnect"
  | "reconnecting"
  | "error"
  | "warn"
  | "debug"
  | "shardDisconnect"
  | "shardError"
  | "shardReconnecting"
  | "shardReady"
  | "shardResume"
  | "invalidated"
  | "raw";
export interface MessageUpdateEvent {
  event: ClientEvents;
  run: (client: DiscordBot, oldMessage: Message, newMessage: Message) => void; // Function typechecking
}

export interface ReadyEvent {
  event: ClientEvents;
  run: (client: DiscordBot) => void;
}

export interface guildMemberSpeakingEvent {
  event: ClientEvents;
  run: (client: DiscordBot, member: GuildMember, speaking: Speaking) => void;
}

export interface voiceStateEvent {
  event: ClientEvents;
  run: (client: DiscordBot, oldState: VoiceState, newState: VoiceState) => void;
}

export interface MessageEvent {
  event: ClientEvents;
  run: (client: DiscordBot, message: Message) => void;
}

export interface MessageDeleteEvent {
  event: ClientEvents;
  run: (client: DiscordBot, DeleteDmessage: Message) => void;
}

export interface messageReactionAddEvent {
  event: ClientEvents;
  run: (client: DiscordBot, reaction: MessageReaction, user: User) => void;
}

export type EventInterface =  // Union Types, used to check at least event is one of these
  | MessageUpdateEvent
  | MessageEvent
  | ReadyEvent
  | messageReactionAddEvent
  | MessageDeleteEvent
  | guildMemberSpeakingEvent
  | voiceStateEvent;
