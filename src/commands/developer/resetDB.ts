import { Guild } from "discord.js";
import { commandInterFace } from "../../interfaces/Command";
import { GuildDataBaseInterface } from "../../interfaces/GuildDataBase";
import { guildDataBase } from "../../structures/DataBase";
export const command: commandInterFace = {
  name: "resetdb",
  args: [
    {
      name: "GuildID",
      type: "GuildID",
      required: false,
    },
  ],
  public: false,
  devOnly: true,

  async run(
    client,
    {
      argsUtil: {
        parserOutput: { flags, options },
        flag,
        option,
      },
      args,
      ...message
    }
  ) {
    let guild: Guild;
    if (args[0]?.value) guild = message.getGuild(args[0]?.value);
    if (!guild) guild = message.guild;
    const DBObj: GuildDataBaseInterface = {
      name: guild.name,
      id: guild.id,
      ownerID: guild.ownerID,
      memberCount: guild.memberCount,
      prefix: client.prefix,
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
    await guildDataBase.set(args[0]?.value || guild.id, DBObj);
    message.say(JSON.stringify(DBObj, null, 4), {
      split: true,
      code: "json",
    });
  },
};
