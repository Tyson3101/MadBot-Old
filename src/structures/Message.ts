import {
  Message as DiscordMessage,
  APIMessage,
  StringResolvable,
  MessageOptions,
  MessageAdditions,
  Role,
  DMChannel,
  TextChannel,
  NewsChannel,
} from "discord.js";
import { invaildPermissionsCustom, noArgsCommandHelpEmbed } from "./embeds";
import * as lexure from "lexure";
import { DiscordBot } from "./Client";

export const extendMessage = (Message: typeof DiscordMessage) =>
  class MadBotMessage extends Message {
    constructor(
      client: DiscordBot,
      data: object,
      channel: DMChannel | TextChannel | NewsChannel
    ) {
      super(client, data, channel);
    }
    //@ts-ignore (I am sorrry)
    async say(
      content: StringResolvable | APIMessage,
      options: MessageOptions | MessageAdditions
    ) {
      return await this.channel.send(content, options as any);
    }
    //@ts-ignore
    async getUser(mentionID: string): Promise<User> {
      let idArray = mentionID.match(/\d+/);
      if (!idArray) throw "No ID!";
      let id = idArray[0];
      try {
        let User = await this.client.users.fetch(id);
        return User;
      } catch (e) {
        this.channel.send({
          embed: noArgsCommandHelpEmbed(
            this.client,
            this.author,
            this.command,
            this.prefix
          ),
        });
        return null;
      }
    }
    //@ts-ignore
    async getMember(mentionID: string): Promise<GuildMember> {
      let idArray = mentionID.match(/\d+/);
      if (!idArray[0]) return null;
      let id = idArray[0];
      if (!id) return null;
      try {
        let guildMember = await this.guild.members.fetch(id);
        return guildMember;
      } catch (e) {
        this.channel.send({
          embed: noArgsCommandHelpEmbed(
            this.client,
            this.author,
            this.command,
            this.prefix
          ),
        });
        return null;
      }
    }
    //@ts-ignore
    getGuild(guildID: string): Guild {
      return this.client.guilds.cache.get(guildID);
    }
    //@ts-ignore
    compareRolePostion(
      commandRole: Role,
      otherRole: Role,
      toReturnMsg: boolean
    ): boolean {
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
          this.channel.send({
            embed: invaildPermissionsCustom(
              this.client,
              this.author,
              `You can't perform this action on this member.`
            ),
          });
      }
    }

    private getArgsAll() {
      const lexer = new lexure.Lexer(this.content).setQuotes([
        ['"', '"'],
        ["“", "”"],
      ]);
      const res = lexer.lexCommand((s) =>
        s.startsWith(this.guild.prefix) ? this.guild.prefix.length : null
      );
      const CommandName = res && res[0]?.value;
      const commandNameLowerCase = CommandName?.toLowerCase();

      const argsAll = res && res[1]();
      const parser = new lexure.Parser(argsAll).setUnorderedStrategy(
        lexure.longStrategy()
      );

      let args: lexure.Args = new lexure.Args(parser.parse());

      // Util Object
      const plainArgs = this.content
        .trim()
        .slice(this.guild.prefix.length)
        .split(/ +/g)
        .slice(1);

      args.parserOutput.flags.forEach((flag) => {
        plainArgs.splice(plainArgs.indexOf(`--${flag}`), 1);
      });
      args.parserOutput.options.forEach((option, key) => {
        plainArgs.splice(
          plainArgs.findIndex((arg) => arg.includes(`--${key}=${option}`)),
          1
        );
      });

      return {
        args: args.parserOutput.ordered,
        argsUtil: args,
        plainArgs: plainArgs,
        isDM: !this.guild && this.channel.type === "dm",
        prefix: this.guild.prefix,
        command:
          this.client.commands.get(commandNameLowerCase) ??
          this.client.commands.find(
            (cmd) => cmd.aliases && cmd.aliases.includes(commandNameLowerCase)
          ) ??
          null,
      };
    }

    //@ts-ignore
    get args() {
      return this.getArgsAll().args;
    }
    //@ts-ignore
    get argsUtil() {
      return this.getArgsAll().argsUtil;
    }
    //@ts-ignore
    get plainArgs() {
      return this.getArgsAll().plainArgs;
    }
    //@ts-ignore
    get isDM() {
      return this.getArgsAll().isDM;
    }
    //@ts-ignore
    get command() {
      return this.getArgsAll().command;
    }

    get prefix() {
      return this.getArgsAll().prefix;
    }
  };
