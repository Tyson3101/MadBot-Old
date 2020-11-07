import { Collection, Snowflake, User } from "discord.js";

export type infringementType = "BAN" | "KICK" | "WARN" | "MUTE";
export interface infringementInterface {
  victim: User;
  moderator: User;
  reason: string;
  banCaseCount: number;
  caseCount: number;
  infringementType: infringementType;
  endDate?: Date;
}

export interface moderationInterface {
  bans: Map<Snowflake, infringementInterface>;
  kicks: Map<Snowflake, infringementInterface>;
  warns: Map<Snowflake, infringementInterface>;
  mutes: Map<Snowflake, infringementInterface>;
  all: Map<Snowflake, infringementInterface>;
  caseCount: number;
  activeCases: number;
}

export interface GuildDataBaseInterface {
  name: string;
  id: string;
  ownerID: string;
  memberCount: number;
  prefix: string;
  moderation: moderationInterface;
}
// Setup for GuildDataBase, like Mongoose Schemas (...lol)
