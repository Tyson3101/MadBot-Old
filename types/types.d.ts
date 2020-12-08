import { User } from "../dashboard/interfaces/User";
import { commandInterFace } from "../src/interfaces/Command";
import { GuildDataBaseInterface } from "../src/interfaces/GuildDataBase";
import { DiscordBot } from "../src/structures/Client";
import * as lexure from "lexure";
import { Collection } from "discord.js";
import { Snowflake } from "discord.js";

declare module "express-session" {
  interface Session {
    user?: User;
  }
}

declare module "discord.js" {
  interface Message {
    client: DiscordBot;
    args?: lexure.Token[];
    argsUtil?: lexure.Args;
    plainArgs?: string[];
    command?: commandInterFace;
    isDM?: boolean;
    prefix?: string;
    initiazlise?: () => Promise<void>;
    getMember?: (id: string) => Promise<GuildMember>;
    getUser?: (id: string) => Promise<User>;
    getGuild?: (id: string) => Guild;
    compareRolePostion?: (
      checkHighestRole: Role,
      CheckLowestRole: Role,
      toReturnMsg?: boolean
    ) => boolean;
    say(
      content:
        | APIMessageContentResolvable
        | (MessageOptions & { split?: false })
        | MessageAdditions
    ): Promise<Message>;
    say(
      options: MessageOptions & { split: true | SplitOptions }
    ): Promise<Message[]>;
    say(options: MessageOptions | APIMessage): Promise<Message | Message[]>;
    say(
      content: StringResolvable,
      options: (MessageOptions & { split?: false }) | MessageAdditions
    ): Promise<Message>;
    say(
      content: StringResolvable,
      options: MessageOptions & { split: true | SplitOptions }
    ): Promise<Message[]>;
    say(
      content: StringResolvable,
      options: MessageOptions
    ): Promise<Message | Message[]>;
  }
  interface Guild {
    DB?: GuildDataBaseInterface;
    prefix?: string;
  }
}
