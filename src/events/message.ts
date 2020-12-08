import commandCheck from "../functions/MemberCommandCheck";
import { guildDataBase } from "../structures/DataBase";
import { errorCommandEmbed, clientInfo } from "../structures/Embeds";
import { MessageEventInterface } from "../interfaces/Events";
import { GuildDataBaseInterface } from "../interfaces/GuildDataBase";
import { TextChannel } from "discord.js";

export const event: MessageEventInterface = {
  event: "message",
  async run(client, message) {
    if (message.author.bot) return;
    const prefix = message.prefix;
    if (!message.isDM && message.guild) {
      if (
        !(message.channel as TextChannel)
          .permissionsFor(message.guild.me)
          .has(["SEND_MESSAGES"])
      )
        return;
    }
    const command = message.command;

    if (
      (!message.isDM && command) ||
      (!message.isDM && message.mentions.users.has(client.user.id))
    ) {
      if (
        !message.guild.me.hasPermission("EMBED_LINKS") &&
        !message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS")
      ) {
        return message.say(`:x: I need the "EMBED_LINKS" Permission :x:`);
      }
    }
    if (command) {
      let vaildMember = commandCheck(client, message, command);
      if (vaildMember !== true) return;
      try {
        await command.run(client, message);
        return;
      } catch (e) {
        console.log(e);
        return message.say({
          embed: errorCommandEmbed(client, message.author, e),
        });
      }
    }
    if (
      message.guild.DB.tags &&
      message.content.startsWith(prefix) &&
      message.guild.DB.tags[
        command.name.toLowerCase() +
          " " +
          message.args
            .map((x) => x.raw)
            .join(" ")
            .toLowerCase()
      ]
    ) {
      const tag =
        message.guild.DB.tags[
          command.name.toLowerCase() +
            " " +
            message.args
              .map((x) => x.raw)
              .join(" ")
              .toLowerCase()
        ];
      message.guild.DB.tags[
        command.name.toLowerCase() +
          " " +
          message.args
            .map((x) => x.raw)
            .join(" ")
            .toLowerCase()
      ].uses++;
      await guildDataBase.set(message.guild.id, message.guild.DB);
      return message
        .say(tag.replies[Math.floor(Math.random() * tag.replies.length)])
        .catch(console.log);
    }
    if (message.mentions.users.has(client.user.id))
      return message.say({
        embed: clientInfo(client, message.author, message.prefix),
      });
  },
};
