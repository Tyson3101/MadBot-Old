import { Guild, GuildMember, Message, Role, User } from "discord.js";
import { utilObjInterface } from "../interfaces/Args";
import * as lexure from "lexure";
import { GuildDataBaseInterface } from "../interfaces/GuildDataBase";
import { DiscordBot } from "../structures/Client";
import {
  noArgsCommandHelpEmbed,
  invaildPermissionsCustom,
} from "../structures/embeds";

export function setUpArgs(
  client: DiscordBot,
  message: Message,
  DB: GuildDataBaseInterface
): [string, lexure.Args, utilObjInterface] {
  const lexer = new lexure.Lexer(message.content).setQuotes([
    ['"', '"'],
    ["“", "”"],
  ]);
  let UtilArgs: utilObjInterface;
  let args: lexure.Args;
  const res = lexer.lexCommand((s) => (s.startsWith(DB.prefix) ? 1 : null));
  const CommandName = res && res[0]?.value;
  const commandNameLowerCase = CommandName?.toLowerCase();

  const argsAll = res && res[1]();
  const parser = new lexure.Parser(argsAll).setUnorderedStrategy(
    lexure.longStrategy()
  );

  args = new lexure.Args(parser.parse());

  // Util Object

  UtilArgs = {
    client: client,
    message: message,
    args: args,
    DB: DB,
    prefix: DB.prefix,
    isDM: !message.guild,
    command:
      client.commands.get(commandNameLowerCase) ??
      client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandNameLowerCase)
      ) ??
      null,
    async getUser(mentionID: string): Promise<User> {
      let idArray = mentionID.match(/\d+/);
      if (!idArray) throw "No ID!";
      let id = idArray[0];
      try {
        let User = await this.client.users.fetch(id);
        return User;
      } catch (e) {
        this.message.channel.send({
          embed: noArgsCommandHelpEmbed(
            client,
            message.author,
            this.command,
            this.prefix
          ),
        });
        return null;
      }
    },
    async getMember(mentionID: string): Promise<GuildMember> {
      let idArray = mentionID.match(/\d+/);
      if (!idArray[0]) return null;
      let id = idArray[0];
      if (!id) return null;
      try {
        let guildMember = await this.message.guild.members.fetch(id);
        return guildMember;
      } catch (e) {
        this.message.channel.send({
          embed: noArgsCommandHelpEmbed(
            client,
            message.author,
            this.command,
            this.prefix
          ),
        });
        return null;
      }
    },

    getGuild(guildID: string): Guild {
      return this.client.guilds.cache.get(guildID);
    },

    compareRolePostion(
      commandRole: Role,
      otherRole: Role,
      toReturnMsg: boolean
    ): boolean {
      let { author } = this.message;
      if (toReturnMsg) {
        if (
          commandRole.position <= otherRole.position ||
          otherRole.permissions.has("BAN_MEMBERS")
        )
          return false;
        else return true;
      } else {
        if (
          commandRole.position <= otherRole.position ||
          otherRole.permissions.has("BAN_MEMBERS")
        )
          this.message.channel.send({
            embed: invaildPermissionsCustom(
              client,
              author,
              `You can't perform this action on this member.`
            ),
          });
      }
    },
  };

  // Return
  return [commandNameLowerCase, args, UtilArgs];
}

export function getToEval(filterd: string[]): string {
  let testArray = filterd.filter(
    (str) => str.length && !str.match(/^(\})?(\])?(\})?(\))?$/g)
  );
  console.log(testArray);
  let checkArray = testArray.map((str, i) => {
    if (i === testArray.length - 1) {
      if (str.includes("return")) return str;
      else return `return ${str}`;
    } else return `${str}\n`;
  });
  console.log(checkArray);
  for (let i = 0; i < filterd.length; i++) {
    if (checkArray[i] && filterd[i] !== checkArray[i])
      filterd[i] = checkArray[i];
  }
  //console.log(filterd);
  return filterd
    .map((x) => x)
    .join(" ")
    .trim();
}
