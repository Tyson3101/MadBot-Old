import {
  Client,
  Collection,
  Snowflake,
  ClientOptions,
  GuildMember,
  Guild,
  Message,
  Role,
  User,
} from "discord.js";
import { commandInterFace, SubCommand } from "../interfaces/Command";
import fs from "fs";
import { developerInterface } from "../interfaces/Developers";
import { EventInterface } from "../interfaces/Events";
import { guildDataBase } from "./DataBase";
import {
  GuildDataBaseInterface,
  infringementInterface,
  infringementType,
} from "../interfaces/GuildDataBase";
import { getGuildDB } from "../functions/getGuildDB";
import { invaildPermissionsCustom, noArgsCommandHelpEmbed } from "./embeds";

export class DiscordBot extends Client {
  // Extending Client

  static DEFUALT_PREFIX() {
    return "m!";
  }

  static getTimeAgo(oldDate: Date, newDate: Date): number {
    return Number(
      ((newDate.getTime() - oldDate.getTime()) / (1000 * 60 * 60 * 24)).toFixed(
        0
      )
    );
  }

  static DEFUALT_DB(guild: Guild) {
    const DBObj: GuildDataBaseInterface = {
      name: guild.name,
      id: guild.id,
      ownerID: guild.ownerID,
      memberCount: guild.memberCount,
      prefix: DiscordBot.DEFUALT_PREFIX(),
      moderation: {
        bans: {},
        kicks: {},
        mutes: {},
        warns: {},
        all: {},
        unbans: {},
        unmutes: {},
        activeCases: 0,
        caseCount: 0,
        logChannel: null,
      },
      tags: {},
      logChannel: null,
    };
    return DBObj;
  }

  events: Collection<string, EventInterface>; // Key, Value
  commands: Collection<string, commandInterFace>; // Key, Value
  developers: Collection<Snowflake, developerInterface>; // Key, Value
  DBs: Collection<Snowflake, GuildDataBaseInterface>;
  supportServer: string;
  prefix: string;
  tips: string[];
  constructor(clientOptions?: ClientOptions) {
    super(clientOptions ?? {});
    this.supportServer = "https://discord.gg/uP5VV6H"; // Support Server
    this.developers = new Collection();
    this.commands = new Collection();
    this.events = new Collection();
    this.prefix = "m!";
    this.tips = [
      `**Have 2 or more words for one argument?** Join them with " ".\n**Eg:** ?tagcreate "name stillName" response to command`,
    ];
    this.DBs = new Collection();
  }

  public firstCap(string: string) {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
  }

  public async getGuildDB(message: Message, inputtedDB: any = null) {
    return await getGuildDB(message, inputtedDB);
  }

  public getToEval(filterd: string[]): string {
    let testArray = filterd.filter(
      (str) => str.length && !str.match(/^(\})?(\])?(\})?(\))?$/g)
    );
    let checkArray = testArray.map((str, i) => {
      if (i === testArray.length - 1) {
        if (str.includes("return")) return str;
        else return `return ${str}`;
      } else return `${str}\n`;
    });
    for (let i = 0; i < filterd.length; i++) {
      if (checkArray[i] && filterd[i] !== checkArray[i])
        filterd[i] = checkArray[i];
    }
    return filterd
      .map((x) => x)
      .join(" ")
      .trim();
  }

  public handleMutes(client: DiscordBot): Promise<infringementInterface[][]> {
    return Promise.all([
      //@ts-ignore
      ...client.guilds.cache.map((guild) => {
        return guildDataBase
          .get(guild.id)
          .then((DB: GuildDataBaseInterface) => {
            if (!DB || !DB.moderation) return [];
            return [
              ...Object.values(DB.moderation.mutes).flatMap((Cases) =>
                Cases.filter((Case) => Case.active)
              ),
            ];
          });
      }),
    ]);
  }

  public async handleEndMute(
    member: GuildMember,
    MutedRole: string,
    oldRoles: string[],
    DB: GuildDataBaseInterface,
    CaseNumber: number
  ): Promise<boolean> {
    if (
      !DB.moderation.mutes[member.id].some(
        (Case) => Case.caseCount === CaseNumber
      )
    )
      return false;
    DB.moderation.activeCases -= 1;
    DB.moderation.mutes[member.id].find(
      (Case) => Case.caseCount === CaseNumber
    ).active = false;
    DB.moderation.all[member.id]
      .filter((Case) => Case.infringementType === "MUTE")
      .find((Case) => Case.caseCount === CaseNumber).active = false;
    try {
      await guildDataBase.set(member.guild.id, { ...DB });
      await member.roles.remove(MutedRole, "Time End!");
      await member.roles.add(oldRoles, "Time End!");
      return true;
    } catch {
      return false;
    }
  }

  public getTypeCaseCount(
    type: infringementType,
    DB: GuildDataBaseInterface
  ): number {
    let toLoop = DB.moderation[`${type.toLowerCase()}s`];
    let caseCount = 0;
    for (let key in toLoop) {
      if (Array.isArray(toLoop[key])) {
        caseCount += toLoop[key].length;
      } else caseCount++;
    }
    return caseCount;
  }

  //@ts-ignore
  async getUser(
    message: Message,
    mentionID: string,
    send: boolean = true
  ): Promise<User> {
    let idArray = mentionID.match(/\d+/);
    if (!idArray) throw "No ID!";
    let id = idArray[0];
    try {
      let User = await this.users.fetch(id);
      return User;
    } catch (e) {
      send &&
        message.channel.send({
          embed: noArgsCommandHelpEmbed(
            message.client,
            message.author,
            message.command,
            message.prefix
          ),
        });
      return null;
    }
  }
  //@ts-ignore
  async getMember(
    message: Message,
    mentionID: string,
    send: boolean = true
  ): Promise<GuildMember> {
    let idArray = mentionID.match(/\d+/);
    let id = idArray?.[0];
    let method: string = "id";
    if (!id) {
      id = mentionID;
      method = "name";
    }
    try {
      let guildMember: GuildMember;
      if (method === "id") {
        guildMember = await message.guild.members.fetch(id);
      } else {
        guildMember = (
          await message.guild.members.fetch({
            query: id.split("#")[1].length <= 4 ? id.split("#")[0] : id,
          })
        )
          .filter((mem) =>
            //@ts-ignore
            mem.user.username === id.split("#")[1].length <= 4
              ? id.split("#")[0]
              : id
          )
          .first();
      }
      return guildMember;
    } catch (e) {
      send &&
        message.channel.send({
          embed: noArgsCommandHelpEmbed(
            this,
            message.author,
            message.command,
            message.prefix
          ),
        });
      return null;
    }
  }
  //@ts-ignore
  getGuild(guildID: string): Guild {
    return (
      this.guilds.cache.get(guildID) ??
      this.guilds.cache.find((ch) => ch.name === guildID)
    );
  }
  //@ts-ignore
  compareRolePostion(
    commandRole: Role,
    otherRole: Role,
    message: Message,
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
        message.channel.send({
          embed: invaildPermissionsCustom(
            this,
            message.author,
            `You can't perform this action on this member.`
          ),
        });
    }
  }

  private getAllGuildsDBs(): Promise<GuildDataBaseInterface[]> {
    return Promise.all(this.guilds.cache.map((_, id) => guildDataBase.get(id)));
  }

  private _eventHandlerInit(client: this): void {
    let i = 1; // Counter for console logging
    const events = fs
      .readdirSync("./dist/src/events")
      .filter((file) => file.endsWith(".js"));
    events.forEach(async (fileEvent) => {
      const event: EventInterface = (await import(`../events/${fileEvent}`))
        .event;
      if (!event || client.events.has(event.event)) return;
      client.events.set(event.event, event);
      if (event.event === "ready") {
        client.once(<any>event.event, event.run.bind(null, client));
      } else {
        client.on(<any>event.event, event.run.bind(null, client));
      } // Type Casting (Can also do `(event as any).event`) and Function Bind() <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind>
      if (i === 1) console.log(`-----------------  Events  ----------------`);

      console.log(`Event ${i}: Loaded ${event.event}!`);
      i++;
    });
  }
  // Array<[string, subCommand]>
  private async _subCommands(
    command: commandInterFace
  ): Promise<SubCommand[] | undefined> {
    const subCommandsFolder = fs
      .readdirSync("./dist/src/subCommands")
      .find((folder) => folder.toLowerCase() === command.name.toLowerCase());
    if (!subCommandsFolder) return;
    const subCommandsFiles = fs
      .readdirSync(`./dist/src/subCommands/${subCommandsFolder}`)
      .filter((file) => file.endsWith(".js"));
    if (!subCommandsFiles.length) return;
    const subCommandsPromise = subCommandsFiles.map(
      (file) => import(`../subCommands/${subCommandsFolder}/${file}`)
    );

    const subCommands: SubCommand[] = (
      await Promise.all(subCommandsPromise)
    ).map((sub) => sub.subCommand);

    return subCommands?.length ? subCommands : undefined;
  }
  private _commandHandlerInit(client: this) {
    const catergories = fs.readdirSync("./dist/src/commands"); // From root
    let i = 1;
    catergories.forEach((catergory) => {
      const commands = fs
        .readdirSync(`./dist/src/commands/${catergory}`)
        .filter((filename) => filename.endsWith(".js"));
      commands.forEach(async (fileCommand) => {
        const { command }: { command: commandInterFace } = await import(
          `../commands/${catergory}/${fileCommand}`
        ); // From File
        if (!command || client.commands.has(command.name.toLowerCase())) return;
        command.name = command.name.toLowerCase();
        const AllsubCommands = (await this._subCommands(command)) ?? [];
        const subCommands: Collection<string, SubCommand> = new Collection();
        AllsubCommands.forEach((subCommand) =>
          subCommands.set(subCommand.name, subCommand)
        );
        let usage = command.name + " ";
        if (command.args?.length)
          usage += command.args
            .map((arg) => (arg.required ? `[${arg.name}]` : `(${arg.name})`))
            .join(" ");
        const addCommand = {
          ...command,
          catergory: catergory,
          subCommands, // Adds catergory property here to make it easier, is the folder name of that command file
        };
        if (!command.usage) addCommand["usage"] = usage.trim();
        if (i === 1)
          console.log(`-----------------  Commands  ----------------`);
        console.log(
          `Command ${i}: Loaded ${client.firstCap(
            addCommand.name
          )}! | SubCommands: ${subCommands.size}`
        );
        i++;

        client.commands.set(addCommand.name, addCommand);
      });
    });
  }

  private async handleAllDBs() {
    let allDBs = await this.getAllGuildsDBs();
    allDBs
      .filter((DB) => DB)
      .forEach((DB) => {
        this.DBs.set(DB.id, DB);
      });
    this.guilds.cache.forEach(async (guild, id) => {
      let DB: GuildDataBaseInterface;
      if (this.DBs.has(id)) {
        DB = this.DBs.get(id);
        for (let key of Object.keys(DB).filter((keyStr) =>
          ["name", "id", "ownerID", "memberCount"].includes(keyStr)
        )) {
          if (DB[key] !== guild[key]) {
            DB[key] = guild[key];
            await guildDataBase.set(id, DB);
          }
        }
        this.DBs.set(id, DB);
      } else {
        await guildDataBase.set(id, DiscordBot.DEFUALT_DB(guild));
        this.DBs.set(id, DiscordBot.DEFUALT_DB(guild));
        DB = DiscordBot.DEFUALT_DB(guild);
      }
      guild.DB = DB;
      guild.prefix = DB.prefix;
    });
  }
  public async login(token: string) {
    if (!this.user) {
      // Checks if logged in!
      this._commandHandlerInit(this); // Handles Commands
      this._eventHandlerInit(this); // Handles Events
      try {
        let TOKEN = await super.login(token);
        await this.handleAllDBs();
        setInterval(async () => await this.handleAllDBs(), 1);
        return TOKEN;
      } catch (e) {
        throw e;
      }
    } else throw new TypeError("Already logged In!");
  }
}
