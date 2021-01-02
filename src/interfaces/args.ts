import { Guild, GuildMember, Message, Role, User } from "discord.js";
import * as lexure from "lexure";
import { DiscordBot } from "../structures/Client"; // Import syntax
import { commandInterFace } from "./Command";
import { GuildDataBaseInterface } from "./GuildDataBase";

export type argsType =  // ALl possible args type.
  | "User Mention"
  | "Role Mention"
  | "Channel Mention"
  | "GuildID"
  | "UserID"
  | "ChannelID"
  | "RoleID"
  | "Text"
  | "Number"
  | "Time"
  | "Color"
  | "Code"
  | "Reason"
  | "Prefix"
  | "other"; // Union Types

export interface argsInterface {
  // Args Interface makes it easier to follow
  // Interface
  name: string;
  required: boolean;
}
