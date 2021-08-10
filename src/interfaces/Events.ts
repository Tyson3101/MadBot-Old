import {
  GuildMember,
  Message,
  MessageReaction,
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
  | "guildMemberUpdate"
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
  run: (client: DiscordBot, ...args: any) => Promise<any> | any;
}

export interface MessageUpdateEvent extends DiscordEvent {
  run: (
    client: DiscordBot,
    oldMessage: Message,
    newMessage: Message
  ) => Promise<any> | any; // Function typechecking
}

export interface ReadyEvent extends DiscordEvent {
  run: (client: DiscordBot) => Promise<any> | any;
}

export interface voiceStateEvent extends DiscordEvent {
  run: (
    client: DiscordBot,
    oldState: VoiceState,
    newState: VoiceState
  ) => Promise<any> | any;
}

export interface MessageEvent extends DiscordEvent {
  run: (client: DiscordBot, message: Message) => Promise<any> | any;
}

export interface MessageDeleteEvent extends DiscordEvent {
  run: (client: DiscordBot, DeleteDmessage: Message) => Promise<any> | any;
}

export interface MessageReactionAddEvent extends DiscordEvent {
  run: (
    client: DiscordBot,
    reaction: MessageReaction,
    user: User
  ) => Promise<any> | any;
}

export interface GuildMemberUpdate extends DiscordEvent {
  run: (
    client: DiscordBot,
    oldMember: GuildMember,
    newMember: GuildMember
  ) => Promise<any> | any;
}

export interface GuildMemberAdd extends DiscordEvent {
  run: (client: DiscordBot, member: GuildMember) => Promise<any> | any;
}

export type EventInterface =  // Union Types, used to check at least event is one of these
  | MessageUpdateEvent
  | MessageEvent
  | ReadyEvent
  | MessageReactionAddEvent
  | MessageDeleteEvent
  | voiceStateEvent
  | GuildMemberUpdate;
