import { Guild, GuildMember, Message, Role, User } from "discord.js";
import * as lexure from "lexure";
import { DiscordBot } from "../structures/Client";
import { argsType } from "./Argstype"; // Import syntax
import { commandInterFace } from "./Command";
import { GuildDataBaseInterface } from "./GuildDataBase";

export interface argsInterface {
  // Args Interface makes it easier to follow
  // Interface
  name: string;
  type: argsType | argsType[];
  required: boolean;
  description?: string;
  example?: string[];
}

export interface utilObjInterface {
  client: DiscordBot;
  message: Message;
  args: lexure.Args;
  DB: GuildDataBaseInterface;
  prefix: string;
  command: commandInterFace;
  isDM: boolean;
  getMember: (id: string) => Promise<GuildMember>;
  getUser: (id: string) => Promise<User>;
  getGuild: (id: string) => Guild;
  compareRolePostion: (
    checkHighestRole: Role,
    CheckLowestRole: Role,
    toReturnMsg?: boolean
  ) => boolean;
}
