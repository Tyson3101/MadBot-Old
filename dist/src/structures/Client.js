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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordBot = void 0;
const discord_js_1 = require("discord.js");
const date_fns_1 = require("date-fns");
const fs_1 = __importDefault(require("fs"));
const DataBase_1 = require("./DataBase");
const getGuildDB_1 = require("../functions/getGuildDB");
const Embeds_1 = require("./Embeds");
const keyv_1 = __importDefault(require("keyv"));
const dotenv_1 = require("dotenv");
dotenv_1.config();
class DiscordBot extends discord_js_1.Client {
    constructor(clientOptions) {
        super(clientOptions);
        this.supportServer = "https://discord.gg/uP5VV6H";
        this.developers = new discord_js_1.Collection();
        this.commands = new discord_js_1.Collection();
        this.events = new discord_js_1.Collection();
        this.tips = [
            `**Have 2 or more words for one argument?** Join them with " ".\n**Eg:** ?tagcreate "name stillName" response to command *Don't need to for last argument.*`,
        ];
        this.DBs = new discord_js_1.Collection();
        this.guildDB = new keyv_1.default(process.env.DB);
    }
    static DEFUALT_PREFIX() {
        return "m!";
    }
    static getDaysAgo(oldDate, newDate = new Date()) {
        return Number(((newDate.getTime() - oldDate.getTime()) / (1000 * 60 * 60 * 24)).toFixed(0));
    }
    static getTimeAgo(oldDate, newDate = new Date()) {
        let past = new Date(oldDate);
        let now = new Date(newDate);
        let days = date_fns_1.differenceInDays(now, past);
        let hours = date_fns_1.differenceInHours(now, past);
        let minutes = date_fns_1.differenceInMinutes(now, past);
        let secends = date_fns_1.differenceInSeconds(now, past);
        if (days >= 1) {
            if (days === 1)
                return `${days} Day ago`;
            else
                return `${days} Days ago`;
        }
        else if (hours >= 1) {
            if (hours === 1)
                return `${hours} Hour ago`;
            else
                return `${hours} Hours ago`;
        }
        else if (minutes >= 1) {
            if (minutes === 1)
                return `${minutes} Minute ago`;
            else
                return `${minutes} Minutes ago`;
        }
        else {
            return `${secends} Seconds ago`;
        }
    }
    firstCap(string) {
        return string[0].toUpperCase() + string.slice(1).toLowerCase();
    }
    getGuildDB(message, inputtedDB = null) {
        return getGuildDB_1.getGuildDB(message, inputtedDB);
    }
    handleMutes(client) {
        return Promise.all([
            ...this.guilds.cache.map((guild) => {
                return this.guildDB.get(guild.id).then((DB) => {
                    if (!DB || !DB.moderation)
                        return [];
                    return [
                        ...Object.values(DB.moderation.mutes).flatMap((Cases) => Cases.filter((Case) => Case.active)),
                    ];
                });
            }),
        ]);
    }
    async handleEndMute(member, MutedRole, oldRoles, DB, CaseNumber) {
        if (!DB.moderation.mutes[member.id].some((Case) => Case.caseCount === CaseNumber))
            return false;
        DB.moderation.activeCases -= 1;
        DB.moderation.mutes[member.id].find((Case) => Case.caseCount === CaseNumber).active = false;
        DB.moderation.all[member.id]
            .filter((Case) => Case.infringementType === "MUTE")
            .find((Case) => Case.caseCount === CaseNumber).active = false;
        try {
            await this.guildDB.set(member.guild.id, { ...DB });
            await member.roles.remove(MutedRole, "Time End!");
            await member.roles.add(oldRoles, "Time End!");
            return true;
        }
        catch {
            return false;
        }
    }
    getTypeCaseCount(type, DB) {
        let toLoop = DB.moderation[`${type.toLowerCase()}s`];
        let caseCount = 0;
        for (let key in toLoop) {
            if (Array.isArray(toLoop[key])) {
                caseCount += toLoop[key].length;
            }
            else
                caseCount++;
        }
        return caseCount;
    }
    async getUser(message, mentionID, send = true) {
        let idArray = mentionID.match(/\d+/);
        let id = idArray?.[0].length > 16 ? idArray[0] : mentionID;
        try {
            let User = await this.users.fetch(id, `${bigint}`);
            return User;
        }
        catch (e) {
            if (this.users.cache.some((user) => user.username.toLowerCase() === id.toLowerCase() ||
                user.tag.toLowerCase() === id.toLowerCase())) {
                return this.users.cache.find((user) => user.username.toLowerCase() === id.toLowerCase() ||
                    user.tag.toLowerCase() === mentionID.toLowerCase());
            }
            send &&
                message.channel.send({
                    embeds: [
                        Embeds_1.invaildUserEmbed(this, message.author, message.command, message.prefix),
                    ],
                });
            return null;
        }
    }
    async getMember(message, mentionID, send = true) {
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
                guildMember = await message.guild.members.fetch(id, `${bigint}`);
            }
            else {
                guildMember = (await message.guild.members.fetch({
                    query: id.split("#")[0],
                }))
                    .filter((mem) => mem.user.username.toLowerCase() === id.split("#")[0].toLowerCase())
                    .first();
            }
            return guildMember;
        }
        catch (e) {
            send &&
                message.say({
                    embed: Embeds_1.invaildUserEmbed(this, message.author, message.command, message.prefix),
                });
            return null;
        }
    }
    getGuild(guildID) {
        return (this.guilds.cache.get(guildID, `${bigint}`) ??
            this.guilds.cache.find((ch) => ch.name.toLowerCase() === guildID.toLowerCase()));
    }
    compareRolePostion(commandRole, otherRole, message, toReturnMsg) {
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
                message.channel.send({
                    embeds: [
                        Embeds_1.invaildPermissionsCustom(this, message.author, `You can't perform this action on this member.`),
                    ],
                });
        }
    }
    getAllGuildsDBs() {
        return Promise.all(this.guilds.cache.map((_, id) => this.guildDB.get(id)));
    }
    _eventHandlerInit() {
        let i = 1;
        const events = fs_1.default
            .readdirSync("./dist/src/events")
            .filter((file) => file.endsWith(".js"));
        events.forEach(async (fileEvent) => {
            const event = (await Promise.resolve().then(() => __importStar(require(`../events/${fileEvent}`))))
                .event;
            if (!event || this.events.has(event.event))
                return;
            this.events.set(event.event, event);
            if (event.event === "ready") {
                this.once(event.event, event.run.bind(null, this));
            }
            else {
                this.on(event.event, event.run.bind(null, this));
            }
            if (i === 1)
                console.log(`-----------------  Events  ----------------`);
            console.log(`Event ${i}: Loaded ${event.event}!`);
            i++;
        });
    }
    async _subCommands(command) {
        const subCommandsFolder = fs_1.default
            .readdirSync("./dist/src/subCommands")
            .find((folder) => folder.toLowerCase() === command.name.toLowerCase());
        if (!subCommandsFolder)
            return;
        const subCommandsFiles = fs_1.default
            .readdirSync(`./dist/src/subCommands/${subCommandsFolder}`)
            .filter((file) => file.endsWith(".js"));
        if (!subCommandsFiles.length)
            return;
        const subCommandsPromise = subCommandsFiles.map((file) => Promise.resolve().then(() => __importStar(require(`../subCommands/${subCommandsFolder}/${file}`))));
        const subCommands = (await Promise.all(subCommandsPromise)).map((sub) => sub.subCommand);
        return subCommands?.length ? subCommands.filter((sub) => sub) : undefined;
    }
    _commandHandlerInit() {
        const catergories = fs_1.default.readdirSync("./dist/src/commands");
        let i = 1;
        catergories.forEach((catergory) => {
            const commands = fs_1.default
                .readdirSync(`./dist/src/commands/${catergory}`)
                .filter((filename) => filename.endsWith(".js"));
            commands.forEach(async (fileCommand) => {
                const { command } = await Promise.resolve().then(() => __importStar(require(`../commands/${catergory}/${fileCommand}`)));
                if (!command || this.commands.has(command.name.toLowerCase()))
                    return;
                command.name = command.name.toLowerCase();
                const AllsubCommands = (await this._subCommands(command)) ?? [];
                const subCommands = new discord_js_1.Collection();
                AllsubCommands.forEach((subCommand) => {
                    subCommand.client = this;
                    subCommands.set(subCommand.name, subCommand);
                });
                let usage = command.name + " ";
                let usageargs;
                if (command.args?.length) {
                    usageargs = command.args.map((arg) => arg.required ? `[${arg.name}]` : `(${arg.name})`);
                    usage += usageargs.join(" ");
                }
                const addCommand = {
                    ...command,
                    catergory: catergory,
                    client: this,
                    subCommands,
                };
                if (!command.usage)
                    addCommand["usage"] = usage.trim();
                if (command.args?.length)
                    addCommand["usageargs"] = usageargs;
                if (i === 1)
                    console.log(`-----------------  Commands  ----------------`);
                console.log(`Command ${i}: Loaded ${this.firstCap(addCommand.name)}! | SubCommands: ${subCommands.size}`);
                i++;
                this.commands.set(addCommand.name, addCommand);
            });
        });
    }
    async handleAllDBs() {
        let allDBs = await this.getAllGuildsDBs();
        allDBs
            .filter((DB) => DB)
            .forEach((DB) => {
            this.DBs.set(DB.id, new DataBase_1.GuildDataBase(DB, DB));
        });
        this.guilds.cache.forEach(async (guild, id) => {
            let DB;
            if (this.DBs.has(id)) {
                DB = this.DBs.get(id);
                for (let key of Object.keys(DB).filter((keyStr) => ["name", "id", "ownerID", "memberCount"].includes(keyStr))) {
                    if (DB[key] !== guild[key]) {
                        DB[key] = guild[key];
                        await this.guildDB.set(id, DB);
                    }
                }
                this.DBs.set(id, DB);
            }
            else {
                await this.guildDB.set(id, new DataBase_1.GuildDataBase(guild));
                this.DBs.set(id, new DataBase_1.GuildDataBase(guild));
                DB = new DataBase_1.GuildDataBase(guild);
            }
            guild.DB = DB;
            guild.prefix = guild.DB.prefix;
        });
    }
    async login(token) {
        if (!this.user) {
            this._commandHandlerInit();
            this._eventHandlerInit();
            this.guildDB.on("error", (e) => console.log("error from keyv!", e));
            try {
                let TOKEN = await super.login(token);
                try {
                    await this.handleAllDBs();
                }
                catch (e) {
                    console.error(e);
                }
                setInterval(async () => {
                    try {
                        await this.handleAllDBs();
                    }
                    catch (e) {
                        console.error(e);
                    }
                }, 1000);
                return TOKEN;
            }
            catch (e) {
                throw e;
            }
        }
        else
            throw new TypeError("Already logged In!");
    }
}
exports.DiscordBot = DiscordBot;
