import Keyv from "keyv";
import { config } from "dotenv";
config();
import { Guild } from "discord.js";
import { DiscordBot } from "./Client";
import { Moderation, Tag } from "../interfaces/GuildDataBase";
export class GuildDataBase {
  name: string;
  id: string;
  ownerID: string;
  memberCount: number;
  prefix: string;
  moderation: Moderation;
  tags: { [key: string]: Tag };
  logChannel: string;
  constructor(
    guild: Guild = null,
    obj?: {
      prefix: string;
      moderation: Moderation;
      tags: { [key: string]: Tag };
      logChannel: string;
    }
  ) {
    this.name = guild?.name ?? null;
    this.id = guild?.id ?? null;
    this.ownerID = guild?.ownerID ?? null;
    this.memberCount = guild?.memberCount ?? null;
    this.prefix = obj?.prefix ?? DiscordBot.DEFUALT_PREFIX();
    this.moderation = obj.moderation ?? {
      bans: guild ? {} : null,
      kicks: guild ? {} : null,
      mutes: guild ? {} : null,
      warns: guild ? {} : null,
      all: guild ? {} : null,
      unbans: guild ? {} : null,
      unmutes: guild ? {} : null,
      activeCases: guild ? 0 : null,
      caseCount: guild ? 0 : null,
      logChannel: null,
    };
    this.tags = obj?.tags ?? guild ? {} : null;
    this.logChannel = obj?.logChannel ?? null;
  }
}
