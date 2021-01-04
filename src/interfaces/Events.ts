import {
  GuildMember,
  Message,
  MessageReaction,
  Speaking,
  User,
  VoiceState,
} from "discord.js";
import { DiscordBot } from "../structures/Client";

export type ClientEvents =  // List of client events (I may be dumb i couldnt see it in the types of djs)
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

export interface DiscordEvent {
  event: ClientEvents;
  client?: DiscordBot;
  run: (...args: any) => Promise<any> | any;
}

export interface MessageUpdateEvent extends DiscordEvent {
  run: (oldMessage: Message, newMessage: Message) => Promise<any> | any; // Function typechecking
}

export interface ReadyEvent extends DiscordEvent {
  run: () => Promise<any> | any;
}

export interface guildMemberSpeakingEvent extends DiscordEvent {
  run: (member: GuildMember, speaking: Speaking) => Promise<any> | any;
}

export interface voiceStateEvent extends DiscordEvent {
  run: (oldState: VoiceState, newState: VoiceState) => Promise<any> | any;
}

export interface MessageEvent extends DiscordEvent {
  event: ClientEvents;
  run: (message: Message) => Promise<any> | any;
}

export interface MessageDeleteEvent {
  event: ClientEvents;
  run: (client: DiscordBot, DeleteDmessage: Message) => Promise<any> | any;
}

export interface messageReactionAddEvent {
  event: ClientEvents;
  run: (
    client: DiscordBot,
    reaction: MessageReaction,
    user: User
  ) => Promise<any> | any;
}

export type EventInterface =  // Union Types, used to check at least event is one of these
  | MessageUpdateEvent
  | MessageEvent
  | ReadyEvent
  | messageReactionAddEvent
  | MessageDeleteEvent
  | guildMemberSpeakingEvent
  | voiceStateEvent;
