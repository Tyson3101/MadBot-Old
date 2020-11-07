"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const embeds_1 = require("../structures/embeds");
function setUpArgs(client, message, DB) {
    const [commandNameUPPERCASE, ...argsArray] = message.content
        .trim()
        .slice(DB.prefix.length)
        .split(/ +/g);
    const UtilArgs = {
        client: client,
        message: message,
        args: argsArray,
        DB: DB,
        prefix: DB.prefix,
        isDM: !message.guild,
        command: client.commands.get(commandNameUPPERCASE.toLowerCase())
            ? client.commands.get(commandNameUPPERCASE.toLowerCase())
            : null,
        async getUser(mentionID) {
            let idArray = mentionID.match(/\d+/);
            if (!idArray)
                throw "No ID!";
            let id = idArray[0];
            try {
                let User = await message.client.users.fetch(id);
                return User;
            }
            catch (e) {
                this.message.channel.send({
                    embed: embeds_1.noArgsCommandHelpEmbed(client, message.author, this.command, this.prefix),
                });
                return null;
            }
        },
        async getMember(mentionID) {
            let idArray = mentionID.match(/\d+/);
            if (!idArray[0])
                return null;
            let id = idArray[0];
            if (!id)
                return null;
            try {
                let guildMember = await message.guild.members.fetch(id);
                return guildMember;
            }
            catch (e) {
                this.message.channel.send({
                    embed: embeds_1.noArgsCommandHelpEmbed(client, message.author, this.command, this.prefix),
                });
                return null;
            }
        },
        compareRolePostion(commandRole, otherRole, toReturnMsg) {
            let { author } = this.message;
            if (toReturnMsg) {
                if (commandRole.position <= otherRole.position ||
                    otherRole.permissions.has("BAN_MEMBERS"))
                    return false;
                else
                    return true;
            }
            else {
                if (commandRole.position <= otherRole.position ||
                    otherRole.permissions.has("BAN_MEMBERS"))
                    this.message.channel.send({
                        embed: embeds_1.invaildPermissionsCustom(client, author, `You can't perform this action on this member.`),
                    });
            }
        },
    };
    return [commandNameUPPERCASE, argsArray, UtilArgs];
}
exports.default = setUpArgs;
