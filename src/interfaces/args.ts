import { Channel, GuildChannel, GuildMember, User } from "discord.js";
import { argsType } from "./Argstype"; // Import syntax
import { commandInterFace } from "./Command";
import { GuildDataBaseInterface } from "./GuildDataBase";

export interface argsInterface {
  // Args Interface makes it easier to follow
  // Interface
  name: string;
  type: argsType | argsType[];
  required: boolean;
  description: string;
  example: string[];
  order: number;
}

export interface utilObjInterface {
  args: string[];
  DB: GuildDataBaseInterface;
  prefix: string;
  command: commandInterFace;
  isDM: boolean;
  getMember: (id: string) => Promise<GuildMember>;
  getUser: (id: string) => Promise<User>;
}
