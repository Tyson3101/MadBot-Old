import { Collection, Message, Snowflake, User } from "discord.js";

export type infringementType =
  | "BAN"
  | "KICK"
  | "WARN"
  | "MUTE"
  | "UNBAN"
  | "UNMUTE";

export interface ModerationUser {
  id: string;
  username: string;
  tag: string;
}
export interface infringementInterface {
  guildID: string;
  victim: ModerationUser;
  moderator: ModerationUser;
  reason: string;
  typeCaseCount: number;
  caseCount: number;
  infringementType: infringementType;
  endDate?: Date;
  active?: boolean;
  muteRoleID?: string;
  oldRolesID?: string[];
}

export interface tagInterface {
  name: string;
  reply: string;
}

export interface moderationInterface {
  bans: { [key: string]: infringementInterface[] };
  kicks: { [key: string]: infringementInterface[] };
  warns: { [key: string]: infringementInterface[] };
  mutes: { [key: string]: infringementInterface[] };
  all: { [key: string]: infringementInterface[] };
  unbans: { [key: string]: infringementInterface[] };
  unmutes: { [key: string]: infringementInterface[] };
  caseCount: number;
  activeCases: number;
  logChannel: string;
}

export interface GuildDataBaseInterface {
  name: string;
  id: string;
  ownerID: string;
  memberCount: number;
  prefix: string;
  moderation: moderationInterface;
  tags: { [key: string]: tagInterface };
  logChannel: string;
}
// Setup for GuildDataBase, like Mongoose Schemas (...lol)
