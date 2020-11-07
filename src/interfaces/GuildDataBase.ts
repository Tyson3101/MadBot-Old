import { Collection, Snowflake, User } from "discord.js";

type infringementType = "BAN" | "KICK" | "WARN" | "MUTE";
interface infringementInterface {
  victim: User;
  moderator: User;
  reason: string;
  banCaseCount: number;
  caseCount: number;
  infringementType: infringementType;
  endDate?: Date;
}

interface moderationInterface {
  bans: Collection<Snowflake, infringementInterface>;
  kicks: Collection<Snowflake, infringementInterface>;
  warns: Collection<Snowflake, infringementInterface>;
  mutes: Collection<Snowflake, infringementInterface>;
  all: Collection<Snowflake, infringementInterface>;
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
