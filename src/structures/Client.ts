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
import {
  differenceInSeconds,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
} from "date-fns";

import { Command, SubCommand } from "../interfaces/Command";
import fs from "fs";
import { Developer } from "../interfaces/Developers";
import { DiscordEvent } from "../interfaces/Events";
import {
  Infringement,
  DataBaseMethods,
  InfringementType,
  GuildDataBaseMethods,
} from "../interfaces/GuildDataBase";
import { GuildDataBase } from "./DataBase";
import { getGuildDB } from "../functions/getGuildDB";
import {
  invaildPermissionsCustom,
  invaildUserEmbed,
  noArgsCommandHelpEmbed,
} from "./Embeds";
import Keyv from "keyv";
import { config } from "dotenv";
config();

export class DiscordBot extends Client {
  // Extending Client

  static DEFUALT_PREFIX() {
    return "m!";
  }

  static getDaysAgo(oldDate: Date, newDate: Date = new Date()): number {
    return Number(
      ((newDate.getTime() - oldDate.getTime()) / (1000 * 60 * 60 * 24)).toFixed(
        0
      )
    );
  }
  static getTimeAgo(
    oldDate: Date | number,
    newDate: Date | number = new Date()
  ): string {
    let past = new Date(oldDate);
    let now = new Date(newDate);
    let days = differenceInDays(now, past);
    let hours = differenceInHours(now, past);
    let minutes = differenceInMinutes(now, past);
    let secends = differenceInSeconds(now, past);
    if (days >= 1) {
      if (days === 1) return `${days} Day ago`;
      else return `${days} Days ago`;
    } else if (hours >= 1) {
      if (hours === 1) return `${hours} Hour ago`;
      else return `${hours} Hours ago`;
    } else if (minutes >= 1) {
      if (minutes === 1) return `${minutes} Minute ago`;
      else return `${minutes} Minutes ago`;
    } else {
      return `${secends} Seconds ago`;
    }
  }

  events: Collection<string, DiscordEvent>; // Key, Value
  commands: Collection<string, Command>; // Key, Value
  developers: Collection<Snowflake, Developer>; // Key, Value
  DBs: Collection<Snowflake, GuildDataBase>;
  supportServer: string;
  prefix: string;
  tips: string[];
  guildDB: GuildDataBaseMethods;
  constructor(clientOptions?: ClientOptions) {
    super(clientOptions);
    this.supportServer = "https://discord.gg/uP5VV6H"; // Support Server
    this.developers = new Collection();
    this.commands = new Collection();
    this.events = new Collection();
    this.tips = [
      `**Have 2 or more words for one argument?** Join them with " ".\n**Eg:** ?tagcreate "name stillName" response to command *Don't need to for last argument.*`,
    ];
    this.DBs = new Collection();
    this.guildDB = new Keyv(process.env.DB);
  }
  public firstCap(string: string) {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
  }

  public getGuildDB(message: Message, inputtedDB: any = null) {
    return getGuildDB(message, inputtedDB);
  }

  public handleMutes(client: DiscordBot): Promise<Infringement[][]> {
    return Promise.all([
      //@ts-ignore
      ...this.guilds.cache.map((guild) => {
        return this.guildDB.get(guild.id).then((DB: GuildDataBase) => {
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
    DB: GuildDataBase,
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
      await this.guildDB.set(member.guild.id, { ...DB });
      await member.roles.remove(MutedRole, "Time End!");
      await member.roles.add(oldRoles, "Time End!");
      return true;
    } catch {
      return false;
    }
  }

  public getTypeCaseCount(type: InfringementType, DB: GuildDataBase): number {
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
    let id = idArray?.[0].length > 16 ? idArray[0] : mentionID;
    try {
      let User = await this.users.fetch(id as `${bigint}`);
      return User;
    } catch (e) {
      if (
        this.users.cache.some(
          (user) =>
            user.username.toLowerCase() === id.toLowerCase() ||
            user.tag.toLowerCase() === id.toLowerCase()
        )
      ) {
        return this.users.cache.find(
          (user) =>
            user.username.toLowerCase() === id.toLowerCase() ||
            user.tag.toLowerCase() === mentionID.toLowerCase()
        );
      }
      send &&
        message.channel.send({
          embeds: [
            invaildUserEmbed(
              this,
              message.author,
              message.command,
              message.prefix
            ),
          ],
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
    let id = idArray?.[0].length > 16 ? idArray?.[0] : null;
    let method: string = "id";
    if (!id) {
      id = mentionID;
      method = "name";
    }
    try {
      let guildMember: GuildMember;
      if (method === "id") {
        guildMember = await message.guild.members.fetch(id as `${bigint}`);
      } else {
        guildMember = (
          await message.guild.members.fetch({
            query: id.split("#")[0],
          })
        )
          .filter(
            (mem) =>
              //@ts-ignore
              mem.user.username.toLowerCase() === id.split("#")[0].toLowerCase()
          )
          .first();
      }
      return guildMember;
    } catch (e) {
      send &&
        message.say({
          embed: invaildUserEmbed(
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
      this.guilds.cache.get(guildID as `${bigint}`) ??
      this.guilds.cache.find(
        (ch) => ch.name.toLowerCase() === guildID.toLowerCase()
      )
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
          embeds: [
            invaildPermissionsCustom(
              this,
              message.author,
              `You can't perform this action on this member.`
            ),
          ],
        });
    }
  }

  private getAllGuildsDBs(): Promise<GuildDataBase[]> {
    return Promise.all(this.guilds.cache.map((_, id) => this.guildDB.get(id)));
  }

  private _eventHandlerInit(): void {
    let i = 1; // Counter for console logging
    const events = fs
      .readdirSync("./dist/src/events")
      .filter((file) => file.endsWith(".js"));
    events.forEach(async (fileEvent) => {
      const event: DiscordEvent = (await import(`../events/${fileEvent}`))
        .event;
      if (!event || this.events.has(event.event)) return;
      this.events.set(event.event, event);
      if (event.event === "ready") {
        this.once(<any>event.event, event.run.bind(null, this));
      } else {
        this.on(<any>event.event, event.run.bind(null, this));
      } // Type Casting (Can also do `(event as any).event`) and Function Bind() <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind>
      if (i === 1) console.log(`-----------------  Events  ----------------`);

      console.log(`Event ${i}: Loaded ${event.event}!`);
      i++;
    });
  }
  // Array<[string, subCommand]>
  private async _subCommands(
    command: Command
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

    return subCommands?.length ? subCommands.filter((sub) => sub) : undefined;
  }
  private _commandHandlerInit() {
    const catergories = fs.readdirSync("./dist/src/commands"); // From root
    let i = 1;
    catergories.forEach((catergory) => {
      const commands = fs
        .readdirSync(`./dist/src/commands/${catergory}`)
        .filter((filename) => filename.endsWith(".js"));
      commands.forEach(async (fileCommand) => {
        const { command }: { command: Command } = await import(
          `../commands/${catergory}/${fileCommand}`
        ); // From File
        if (!command || this.commands.has(command.name.toLowerCase())) return;
        command.name = command.name.toLowerCase();
        const AllsubCommands = (await this._subCommands(command)) ?? [];
        const subCommands: Collection<string, SubCommand> = new Collection();
        AllsubCommands.forEach((subCommand) => {
          subCommand.client = this;
          subCommands.set(subCommand.name, subCommand);
        });
        let usage = command.name + " ";
        let usageargs: string[];
        if (command.args?.length) {
          usageargs = command.args.map((arg) =>
            arg.required ? `[${arg.name}]` : `(${arg.name})`
          );
          usage += usageargs.join(" ");
        }
        const addCommand = {
          ...command,
          catergory: catergory, // Adds catergory property here to make it easier, is the folder name of that command file
          client: this,
          subCommands,
        };
        if (!command.usage) addCommand["usage"] = usage.trim();
        if (command.args?.length) addCommand["usageargs"] = usageargs;
        if (i === 1)
          console.log(`-----------------  Commands  ----------------`);
        console.log(
          `Command ${i}: Loaded ${this.firstCap(
            addCommand.name
          )}! | SubCommands: ${subCommands.size}`
        );
        i++;

        this.commands.set(addCommand.name, addCommand);
      });
    });
  }

  private async handleAllDBs() {
    let allDBs = await this.getAllGuildsDBs();
    allDBs
      .filter((DB) => DB)
      .forEach((DB) => {
        //@ts-ignore
        this.DBs.set(DB.id, new GuildDataBase(DB as Guild, DB));
      });
    this.guilds.cache.forEach(async (guild, id) => {
      let DB: GuildDataBase;
      if (this.DBs.has(id)) {
        DB = this.DBs.get(id);
        for (let key of Object.keys(DB).filter((keyStr) =>
          ["name", "id", "ownerID", "memberCount"].includes(keyStr)
        )) {
          if (DB[key] !== guild[key]) {
            DB[key] = guild[key];
            await this.guildDB.set(id, DB);
          }
        }
        this.DBs.set(id, DB);
      } else {
        await this.guildDB.set(id, new GuildDataBase(guild));
        this.DBs.set(id, new GuildDataBase(guild));
        DB = new GuildDataBase(guild);
      }
      //@ts-ignore
      guild.DB = DB;
      guild.prefix = guild.DB.prefix;
    });
  }
  public async login(token: string) {
    if (!this.user) {
      // Checks if logged in!
      this._commandHandlerInit(); // Handles Commands
      this._eventHandlerInit(); // Handles Events
      this.guildDB.on("error", (e: any) => console.log("error from keyv!", e));
      try {
        let TOKEN = await super.login(token);
        try {
          await this.handleAllDBs();
        } catch (e) {
          console.error(e);
        }
        setInterval(async () => {
          try {
            await this.handleAllDBs();
          } catch (e) {
            console.error(e);
          }
        }, 1000);
        return TOKEN;
      } catch (e) {
        throw e;
      }
    } else throw new TypeError("Already logged In!");
  }
}
