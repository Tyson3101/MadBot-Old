import {
  Message as DiscordMessage,
  APIMessage,
  MessageOptions,
  Role,
  DMChannel,
  TextChannel,
  NewsChannel,
  GuildMember,
} from "discord.js";
import {
  invaildPermissionsCustom,
  invaildUserEmbed,
  noArgsCommandHelpEmbed,
} from "./Embeds";
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
      content: string | APIMessage | (MessageOptions & { split?: false })
    ) {
      return await this.channel.send(content);
    }
    //@ts-ignore
    async getUser(mentionID: string, send: boolean = true): Promise<User> {
      let idArray = mentionID.match(/\d+/);
      let id = idArray?.[0].length > 16 ? idArray?.[0] : mentionID;
      try {
        let User = await this.client.users.fetch(id as `${bigint}`);
        return User;
      } catch {
        if (
          this.client.users.cache.some(
            (user) =>
              user.username.toLowerCase() === mentionID.toLowerCase() ||
              user.tag.toLowerCase() === mentionID.toLowerCase()
          )
        ) {
          return this.client.users.cache.find(
            (user) =>
              user.username.toLowerCase() === id.toLowerCase() ||
              user.tag === id.toLowerCase()
          );
        }
        send &&
          this.channel.send({
            embeds: [
              invaildUserEmbed(
                this.client,
                this.author,
                this.command,
                this.prefix
              ),
            ],
          });
        return null;
      }
    }
    //@ts-ignore
    async getMember(
      mentionID: string,
      send: boolean = true
    ): Promise<GuildMember> {
      let idArray = mentionID.match(/\d+/);
      let id = idArray?.[0].length > 16 ? idArray?.[0] : null;
      let method: string = "id";
      if (!id) {
        id = mentionID;
        method = "name";
      }
      try {
        let guildMember: GuildMember;
        if (method === "id") {
          guildMember = await this.guild.members.fetch(id as `${bigint}`);
        } else {
          guildMember = (
            await this.guild.members.fetch({
              query: id.split("#")[0],
            })
          )
            .filter(
              (mem) =>
                //@ts-ignore
                mem.user.username.toLowerCase() ===
                id.split("#")[0].toLowerCase()
            )
            .first();
        }
        return guildMember;
      } catch (e) {
        send &&
          this.channel.send({
            embeds: [
              invaildUserEmbed(
                this.client,
                this.author,
                this.command,
                this.prefix
              ),
            ],
          });
        return null;
      }
    }
    //@ts-ignore
    getGuild(guildID: string): Guild {
      return (
        this.client.guilds.cache.get(guildID as `${bigint}`) ??
        this.client.guilds.cache.find(
          (ch) => ch.name.toLowerCase() === guildID.toLowerCase()
        )
      );
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
            embeds: [
              invaildPermissionsCustom(
                this.client,
                this.author,
                `You can't perform this action on this member.`
              ),
            ],
          });
      }
    }

    private _getArgsAll() {
      const lexer = new lexure.Lexer(this.content).setQuotes([
        ['"', '"'],
        ["“", "”"],
      ]);
      const prefix = this.guild
        ? this.guild.prefix?.toLowerCase() ?? DiscordBot.DEFUALT_PREFIX()
        : DiscordBot.DEFUALT_PREFIX();
      const res = lexer.lexCommand((s) =>
        s.toLowerCase().startsWith(prefix) ? prefix.length : null
      );
      const CommandName = res && res[0]?.value;
      const commandNameLowerCase = CommandName?.toLowerCase();

      const argsAll = CommandName && res[1]();
      const parser = new lexure.Parser(argsAll).setUnorderedStrategy(
        lexure.longStrategy()
      );

      let args: lexure.Args = new lexure.Args(parser.parse());
      const content = this.content;
      // Util Object
      const plainArgs = content
        .trim()
        .slice(prefix.length)
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

      const obj = {
        args: args.parserOutput.ordered,
        argsUtil: args,
        plainArgs: plainArgs,
        isDM: !this.guild && this.channel.type === "dm",
        prefix: prefix,
        commandNameLowerCase: content
          .trim()
          .slice(prefix.length)
          .split(/ +/g)[0]
          .toLowerCase(),
        command:
          this.client.commands.get(commandNameLowerCase) ??
          this.client.commands.find(
            (cmd) => cmd.aliases && cmd.aliases.includes(commandNameLowerCase)
          ) ??
          null,
      };

      return obj;
    }

    get commandNameLowerCase() {
      return this._getArgsAll().commandNameLowerCase;
    }
    //@ts-ignore
    get args() {
      return this._getArgsAll().args;
    }
    //@ts-ignore
    get argsUtil() {
      return this._getArgsAll().argsUtil;
    }
    //@ts-ignore
    get plainArgs() {
      return this._getArgsAll().plainArgs;
    }
    //@ts-ignore
    get isDM() {
      return this._getArgsAll().isDM;
    }
    //@ts-ignore
    get command() {
      return this._getArgsAll().command;
    }

    get prefix() {
      return this._getArgsAll().prefix;
    }
  };
