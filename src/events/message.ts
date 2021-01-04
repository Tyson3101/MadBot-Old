import commandCheck from "../functions/MemberCommandCheck";
import { errorCommandEmbed, clientInfo } from "../structures/Embeds";
import { MessageEvent } from "../interfaces/Events";
import { GuildDataBase } from "../structures/DataBase";
import { TextChannel } from "discord.js";

export const event: MessageEvent = {
  event: "message",
  async run(message) {
    if (message.author.bot || message.webhookID) return;

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
      (!message.isDM && message.mentions.users.has(this.client.user.id))
    ) {
      if (
        !message.guild.me.hasPermission("EMBED_LINKS") &&
        !message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS")
      ) {
        return message.say(`:x: I need the "EMBED_LINKS" Permission :x:`);
      }
    }
    if (command) {
      console.log("Hey! Command starting");
      let vaildMember = commandCheck(this.client, message, command);
      command.client = this.client;
      if (vaildMember !== true) return console.log("Hey! Not a Vaild Member");
      try {
        await command.run(message);
        return;
      } catch (e) {
        console.log(e);
        return message.say({
          embed: errorCommandEmbed(this.client, message.author, e),
        });
      }
    }
    if (!message.isDM) {
      console.log(
        `${message.commandNameLowerCase} ${message.plainArgs
          .map((str) => str.toLowerCase())
          .join(" ")}`,
        message.guild.DB.tags[
          `${message.commandNameLowerCase} ${message.plainArgs
            .map((str) => str.toLowerCase())
            .join(" ")}`
        ]
      );
      if (
        message.guild.DB.tags &&
        message.content.toLowerCase().startsWith(prefix.toLowerCase()) &&
        message.guild.DB.tags[
          `${message.commandNameLowerCase} ${message.plainArgs
            .map((str) => str.toLowerCase())
            .join(" ")}`
        ]
      ) {
        const tag =
          message.guild.DB.tags[
            `${message.commandNameLowerCase} ${message.plainArgs
              .map((str) => str.toLowerCase())
              .join(" ")}`
          ];
        message.guild.DB.tags[
          `${message.commandNameLowerCase} ${message.plainArgs
            .map((str) => str.toLowerCase())
            .join(" ")}`
        ].uses++;
        await this.client.guildDB.set(message.guild.id, message.guild.DB);
        return message
          .say(tag.replies[Math.floor(Math.random() * tag.replies.length)])
          .catch(console.log);
      }
    }
    if (message.mentions.users.has(this.client.user.id))
      return message.say(
        !message.isDM
          ? `Your prefix for this server is \`${message.prefix}\``
          : "",
        {
          embed: clientInfo(this.client, message.author, message.prefix),
        }
      );
  },
};
