"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extendMessage = void 0;
const Embeds_1 = require("./Embeds");
const lexure = __importStar(require("lexure"));
const Client_1 = require("./Client");
exports.extendMessage = (Message) => class MadBotMessage extends Message {
    constructor(client, data, channel) {
        super(client, data, channel);
    }
    async say(content) {
        return await this.channel.send(content);
    }
    async getUser(mentionID, send = true) {
        let idArray = mentionID.match(/\d+/);
        let id = idArray?.[0].length > 16 ? idArray?.[0] : mentionID;
        try {
            let User = await this.client.users.fetch(id, `${bigint}`);
            return User;
        }
        catch {
            if (this.client.users.cache.some((user) => user.username.toLowerCase() === mentionID.toLowerCase() ||
                user.tag.toLowerCase() === mentionID.toLowerCase())) {
                return this.client.users.cache.find((user) => user.username.toLowerCase() === id.toLowerCase() ||
                    user.tag === id.toLowerCase());
            }
            send &&
                this.channel.send({
                    embeds: [
                        Embeds_1.invaildUserEmbed(this.client, this.author, this.command, this.prefix),
                    ],
                });
            return null;
        }
    }
    async getMember(mentionID, send = true) {
        let idArray = mentionID.match(/\d+/);
        let id = idArray?.[0].length > 16 ? idArray?.[0] : null;
        let method = "id";
        if (!id) {
            id = mentionID;
            method = "name";
        }
        try {
            let guildMember;
            if (method === "id") {
                guildMember = await this.guild.members.fetch(id, `${bigint}`);
            }
            else {
                guildMember = (await this.guild.members.fetch({
                    query: id.split("#")[0],
                }))
                    .filter((mem) => mem.user.username.toLowerCase() ===
                    id.split("#")[0].toLowerCase())
                    .first();
            }
            return guildMember;
        }
        catch (e) {
            send &&
                this.channel.send({
                    embeds: [
                        Embeds_1.invaildUserEmbed(this.client, this.author, this.command, this.prefix),
                    ],
                });
            return null;
        }
    }
    getGuild(guildID) {
        return (this.client.guilds.cache.get(guildID, `${bigint}`) ??
            this.client.guilds.cache.find((ch) => ch.name.toLowerCase() === guildID.toLowerCase()));
    }
    compareRolePostion(commandRole, otherRole, toReturnMsg) {
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
                this.channel.send({
                    embeds: [
                        Embeds_1.invaildPermissionsCustom(this.client, this.author, `You can't perform this action on this member.`),
                    ],
                });
        }
    }
    _getArgsAll() {
        const lexer = new lexure.Lexer(this.content).setQuotes([
            ['"', '"'],
            ["“", "”"],
        ]);
        const prefix = this.guild
            ? this.guild.prefix?.toLowerCase() ?? Client_1.DiscordBot.DEFUALT_PREFIX()
            : Client_1.DiscordBot.DEFUALT_PREFIX();
        const res = lexer.lexCommand((s) => s.toLowerCase().startsWith(prefix) ? prefix.length : null);
        const CommandName = res && res[0]?.value;
        const commandNameLowerCase = CommandName?.toLowerCase();
        const argsAll = CommandName && res[1]();
        const parser = new lexure.Parser(argsAll).setUnorderedStrategy(lexure.longStrategy());
        let args = new lexure.Args(parser.parse());
        const content = this.content;
        const plainArgs = content
            .trim()
            .slice(prefix.length)
            .split(/ +/g)
            .slice(1);
        args.parserOutput.flags.forEach((flag) => {
            plainArgs.splice(plainArgs.indexOf(`--${flag}`), 1);
        });
        args.parserOutput.options.forEach((option, key) => {
            plainArgs.splice(plainArgs.findIndex((arg) => arg.includes(`--${key}=${option}`)), 1);
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
            command: this.client.commands.get(commandNameLowerCase) ??
                this.client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandNameLowerCase)) ??
                null,
        };
        return obj;
    }
    get commandNameLowerCase() {
        return this._getArgsAll().commandNameLowerCase;
    }
    get args() {
        return this._getArgsAll().args;
    }
    get argsUtil() {
        return this._getArgsAll().argsUtil;
    }
    get plainArgs() {
        return this._getArgsAll().plainArgs;
    }
    get isDM() {
        return this._getArgsAll().isDM;
    }
    get command() {
        return this._getArgsAll().command;
    }
    get prefix() {
        return this._getArgsAll().prefix;
    }
};
