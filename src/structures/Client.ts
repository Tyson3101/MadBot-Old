import {
  Client,
  Collection,
  Snowflake,
  ClientOptions,
  GuildMember,
  Guild,
  Message,
  Role,
} from "discord.js";
import { commandInterFace } from "../interfaces/Command";
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
  async getUser(message: Message, mentionID: string): Promise<User> {
    let idArray = mentionID.match(/\d+/);
    if (!idArray) throw "No ID!";
    let id = idArray[0];
    try {
      let User = await this.users.fetch(id);
      return User;
    } catch (e) {
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
  async getMember(message: Message, mentionID: string): Promise<GuildMember> {
    let idArray = mentionID.match(/\d+/);
    if (!idArray[0]) return null;
    let id = idArray[0];
    if (!id) return null;
    try {
      let guildMember = await message.guild.members.fetch(id);
      return guildMember;
    } catch (e) {
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
  getGuild(guildID: string): Guild {
    return this.guilds.cache.get(guildID);
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
    return Promise.all(
      this.guilds.cache.map(async (guild) => await guildDataBase.get(guild.id))
    );
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
  private _commandHandlerInit(client: this) {
    const catergories = fs.readdirSync("./dist/src/commands"); // From root
    let i = 1;
    catergories.forEach((catergory) => {
      const commands = fs
        .readdirSync(`./dist/src/commands/${catergory}`)
        .filter((filename) => filename.endsWith(".js"));
      commands.forEach(async (fileCommand) => {
        const { command } = await import(
          `../commands/${catergory}/${fileCommand}`
        ); // From File
        if (!command || client.commands.has(command.name.toLowerCase())) return;
        command.name = command.name.toLowerCase();
        const addCommand = {
          ...command,
          catergory: catergory, // Adds catergory property here to make it easier, is the folder name of that command file
        };

        if (i === 1)
          console.log(`-----------------  Commands  ----------------`);
        console.log(
          `Command ${i}: Loaded ${client.firstCap(addCommand.name)}!`
        );
        i++;

        client.commands.set(addCommand.name, addCommand);
      });
    });
  }

  public async startUp(token: string) {
    if (!this.user) {
      // Checks if logged in!
      this._commandHandlerInit(this); // Handles Commands
      this._eventHandlerInit(this); // Handles Events
      try {
        let TOKEN = await this.login(token);
        let allDBs = await this.getAllGuildsDBs();
        allDBs.forEach((DB) => {
          this.DBs.set(DB.id, DB);
        });
        this.guilds.cache.forEach((guild) => {
          const DB = this.DBs.get(guild.id);
          guild.DB = DB;
          guild.prefix = DB.prefix;
        });
        setInterval(async () => {
          allDBs = await this.getAllGuildsDBs();
          allDBs.forEach((DB) => {
            this.DBs.set(DB.id, DB);
          });
          this.guilds.cache.forEach((guild) => {
            const DB = this.DBs.get(guild.id);
            guild.DB = DB;
            guild.prefix = DB.prefix;
          }, 1);
        });

        return TOKEN;
      } catch (e) {
        throw e;
      }
    } else throw new TypeError("Already logged In!");
  }
}
