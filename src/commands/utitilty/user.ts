import { MessageEmbed } from "discord.js";
import { commandInterFace } from "../../interfaces/Command";
import { DiscordBot } from "../../structures/Client";
import { TemplatedEmbed } from "../../structures/TemplateEmbed";
import moment from "moment";

export const command: commandInterFace = {
  name: "user",
  async run(client, message) {
    const member = !message.isDM
      ? (await message.getMember(message.plainArgs.join(" "), false)) ??
        message.member
      : undefined;
    const user = member?.user ?? message.author;

    const userInfo = new TemplatedEmbed(user, {
      title: `${user.tag}'s Info`,
      thumbnail: {
        url: user.displayAvatarURL({
          dynamic: true,
          format: "png",
        }),
      },
    });
    if (user.id !== message.author.id)
      userInfo.description = `${user.username}'s Info Requested by ${message.author.username}`;
    userInfo.addField("Username", user.tag, true);
    if (!message.isDM)
      userInfo.addField("Nickname", member.nickname || "No Nickname", true);
    userInfo.addField("\u200B", "\u200B", true);
    if (!message.isDM) {
      userInfo.addField(
        "Owner",
        client.firstCap((user.id === message.guild.ownerID).toString()),
        true
      );
      userInfo.addField("Bot", user.bot, true);
      userInfo.addField("\u200B", "\u200B", true);
    }
    userInfo.addField(
      "Created At",
      moment(user.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
      true
    );
    if (!message.isDM)
      userInfo.addField(
        "Joined At",
        moment(member.joinedAt).format("MMMM Do YYYY, h:mm:ss a"),
        true
      );
    userInfo.addField("\u200B", "\u200B", true);
    userInfo.addField("Status", client.firstCap(user.presence.status), true);
    if (!message.isDM)
      userInfo.addField(
        "Server Booster",
        client.firstCap((!!member.premiumSince).toString()),
        true
      );
    userInfo.addField("\u200B", "\u200B", true);
    if (user.presence.activities[0])
      userInfo.addField(
        "Playing",
        [
          ...user.presence.activities.map((activitiy) =>
            activitiy.type === "CUSTOM_STATUS"
              ? activitiy.state
              : activitiy.name
          ),
        ],
        true
      );
    userInfo.addField("ID", user.id, true);
    userInfo.addField("\u200B", "\u200B", true);
    if (!message.isDM) {
      userInfo.addField(
        "Roles",
        member.roles.cache.filter((r) => !r.name.startsWith("@")).size
          ? member.roles.cache
              .filter((r) => !r.name.startsWith("@"))
              .map((r) => `\`${r.name}\``)
              .join(" ")
          : "No Roles"
      );
    }
    message.say(userInfo);
  },
};
