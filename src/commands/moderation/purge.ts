import Discord from "discord.js";
import { MessageEmbed } from "discord.js";
import { HTTPError } from "discord.js";
import { TextChannel } from "discord.js";
import { commandInterFace } from "../../interfaces/Command";
import { noArgsCommandHelpEmbed } from "../../structures/embeds";

export const command: commandInterFace = {
  name: "purge",
  aliases: ["prune"],
  guildOnly: true,
  args: [
    {
      name: "Message Count",
      required: true,
    },
    {
      name: "Reason",
      required: false,
    },
  ],
  example: ["purge 52 Too many shitpost", "purge 69"],
  permission: ["MANAGE_MESSAGES", true],
  async run(client, message) {
    const amount = parseInt(message.args[0].value);
    if (Number.isNaN(amount))
      return message.say({
        embed: noArgsCommandHelpEmbed(
          client,
          message.author,
          message.command,
          message.guild.prefix
        ),
      });
    if (amount <= 0 && amount >= 100)
      return message.say({
        embed: noArgsCommandHelpEmbed(
          client,
          message.author,
          message.command,
          message.guild.prefix
        ),
      });

    (message.channel as TextChannel)
      .bulkDelete(amount)
      .catch((e: HTTPError) => {
        message.say({
          embed: new MessageEmbed({
            author: {
              name: message.author.tag,
              iconURL: message.author.displayAvatarURL({
                format: "png",
                dynamic: true,
              }),
            },
            title: "Error",
            description: e.message,
            footer: {
              text: `${client.user.username} ©`,
              iconURL: client.user.displayAvatarURL({ format: "png" }),
            },
          }),
        });
      });
  },
};
