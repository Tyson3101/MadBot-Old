import { Guild, GuildMember, Message, Role, User } from "discord.js";
import { utilObjInterface } from "../interfaces/Args";
import { commandInterFace } from "../interfaces/Command";
import { GuildDataBaseInterface } from "../interfaces/GuildDataBase";
import { DiscordBot } from "../structures/Client";
import {
  noArgsCommandHelpEmbed,
  invaildPermissionsCustom,
} from "../structures/embeds";
import { getGuildDB } from "./getGuildDB";

export function setUpArgs(
  client: DiscordBot,
  message: Message,
  DB: GuildDataBaseInterface
): [string, string[], utilObjInterface] {
  const [commandNameUPPERCASE, ...argsArray] = message.content
    .trim()
    .slice(DB.prefix.length)
    .split(/ +/g);

  // Util Object

  const UtilArgs: utilObjInterface = {
    client: client,
    message: message,
    args: argsArray,
    DB: DB,
    prefix: DB.prefix,
    isDM: !message.guild,
    command: client.commands.get(commandNameUPPERCASE.toLowerCase())
      ? client.commands.get(commandNameUPPERCASE.toLowerCase())
      : null,

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
  return [commandNameUPPERCASE, argsArray, UtilArgs];
}
