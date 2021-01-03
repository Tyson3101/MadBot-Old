import { User } from "../dashboard/interfaces/User";
import { Command } from "../src/interfaces/Command";
import { DiscordBot } from "../src/structures/Client";
import * as lexure from "lexure";
import { GuildDataBase } from "../src/structures/DataBase";

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
    command?: Command;
    isDM?: boolean;
    prefix?: string;
    commandNameLowerCase: string;
    initiazlise?: () => Promise<void>;
    getMember?: (id: string, send?: boolean) => Promise<GuildMember>;
    getUser?: (id: string, send?: boolean) => Promise<User>;
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
    DB?: GuildDataBase;
    prefix?: string;
  }
}
