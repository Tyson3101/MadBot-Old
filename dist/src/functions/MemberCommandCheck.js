"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Embeds_1 = require("../structures/Embeds");
function default_1(client, message, command) {
    if (command.permission && command.permission[0]) {
        if (command.permission[1] === true) {
            command.permission[1] = command.permission[0];
        }
    }
    if (!message.content.toLowerCase().startsWith(message.prefix.toLowerCase()))
        return;
    if (command.devOnly && !client.developers.has(message.author.id))
        return message.channel.send({
            embed: Embeds_1.ownerCommandEmbed(client, message.author),
        });
    if (command.guildOnly && message.isDM)
        return message.channel.send({
            embed: Embeds_1.dmCommandEmbed(client, message.author),
        });
    if (!message.isDM && command.nsfw && message.channel.nsfw)
        return message.channel.send({
            embed: Embeds_1.nsfwCommandEmbed(client, message.author),
        });
    if (!message.isDM &&
        command.permission &&
        command.permission[0] &&
        !message.member.hasPermission(command.permission[0]) &&
        !message.channel
            .permissionsFor(message.member)
            .has(command.permission[0]))
        return message.channel.send({
            embed: Embeds_1.invaildPermissionsMemberCommandEmbed(client, message.author, command.permission[0]),
        });
    if (!message.isDM &&
        command.permission &&
        command.permission[1] !== false &&
        !message.guild.me.hasPermission(command.permission.slice(1)) &&
        !message.channel
            .permissionsFor(message.guild.me)
            .has(command.permission.slice(1)))
        return message.channel.send({
            embed: Embeds_1.invaildPermissionsBotCommandEmbed(client, message.author, command.permission.slice(1)),
        });
    if (command.args &&
        command.args.filter((arg) => arg.required).length > message.args.length)
        return message.channel.send({
            embed: Embeds_1.noArgsCommandHelpEmbed(client, message.author, command, message.prefix),
        });
    return true;
}
exports.default = default_1;
