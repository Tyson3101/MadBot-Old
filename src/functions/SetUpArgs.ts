import { GuildMember, Message, Role } from "discord.js";
import { utilObjInterface } from "../interfaces/Args";
import { DiscordBot } from "../structures/Client";
import {
  noArgsCommandHelpEmbed,
  invaildPermissionsCustom,
} from "../structures/embeds";
import { getGuildDB } from "./getGuildDB";

function setUpArgs(
  client: DiscordBot,
  message: Message,
  DB: any
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

    async getUser(mentionID: string) {
      let idArray = mentionID.match(/\d+/);
      if (!idArray) throw "No ID!";
      let id = idArray[0];
      try {
        let User = await message.client.users.fetch(id);
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

    async getMember(mentionID: string) {
      let idArray = mentionID.match(/\d+/);
      if (!idArray) throw "No ID!";
      let id = idArray[0];
      try {
        let guildMember = await message.guild.members.fetch(id);
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

    compareRolePostion(commandRole, otherRole, toReturnMsg): boolean {
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
              `You can't kick a Moderator.`
            ),
          });
      }
    },
  };

  // Return
  return [commandNameUPPERCASE, argsArray, UtilArgs];
}

export default setUpArgs;
