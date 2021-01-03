export type InfringementType =
  | "BAN"
  | "KICK"
  | "WARN"
  | "MUTE"
  | "UNBAN"
  | "UNMUTE";

export type ModerationUser = string;

export interface Infringement {
  guildID: string;
  victim: ModerationUser;
  moderator: ModerationUser;
  reason: string;
  typeCaseCount: number;
  caseCount: number;
  infringementType: InfringementType;
  startDate: Date;
  endDate?: Date;
  active?: boolean;
  muteRoleID?: string;
  oldRolesID?: string[];
}

export interface Tag {
  name: string;
  replies: string[];
  author: string;
  createdAt: Date;
  uses: number;
}

export interface DataBaseMethods {
  set: (key: string, value: any) => Promise<boolean>;
  get: (key: string) => Promise<any>;
  clear: () => Promise<undefined>;
  delete: (key: string) => Promise<boolean>;
}

export interface Moderation {
  bans: { [key: string]: Infringement[] };
  kicks: { [key: string]: Infringement[] };
  warns: { [key: string]: Infringement[] };
  mutes: { [key: string]: Infringement[] };
  all: { [key: string]: Infringement[] };
  unbans: { [key: string]: Infringement[] };
  unmutes: { [key: string]: Infringement[] };
  caseCount: number;
  activeCases: number;
  logChannel: string;
}
