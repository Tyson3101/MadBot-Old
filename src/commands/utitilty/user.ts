import { Command } from "../../interfaces/Command";
import { DiscordBot } from "../../structures/Client";
import { TemplatedEmbed } from "../../structures/TemplateEmbed";
import moment from "moment";

export const command: Command = {
  name: "user",
  example: ["user 96396396346737437", "user @Tyson", "user"],
  args: [
    {
      name: "User",
      required: false,
    },
  ],
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
    userInfo.addField("Username", user.tag, !message.isDM ? true : false);
    if (!message.isDM) {
      userInfo.addField(
        "Nickname",
        member.nickname || "No Nickname",
        !message.isDM ? true : false
      );
      userInfo.addField("\u200B", "\u200B", !message.isDM ? true : false);
    }
    if (!message.isDM) {
      userInfo.addField(
        "Owner",
        client.firstCap((user.id === message.guild.ownerID).toString()),
        true
      );
      userInfo.addField(
        "Bot",
        client.firstCap(user.bot.toString()),
        !message.isDM ? true : false
      );
      userInfo.addField("\u200B", "\u200B", !message.isDM ? true : false);
    }
    userInfo.addField(
      "Created At",
      `Date: ${moment(user.createdAt).format("MMMM Do YYYY")}
Time ago: ${DiscordBot.getTimeAgo(user.createdAt, new Date())} Days ago`,
      true
    );
    if (!message.isDM) {
      userInfo.addField(
        "Joined At",
        `Date: ${moment(member.joinedAt).format("MMMM Do YYYY")}
Time ago: ${DiscordBot.getTimeAgo(member.joinedAt, new Date())} Days ago`,
        true
      );
      userInfo.addField("\u200B", "\u200B", !message.isDM ? true : false);
    }
    userInfo.addField(
      "Status",
      client.firstCap(user.presence.status),
      !message.isDM ? true : false
    );
    if (!message.isDM) {
      userInfo.addField(
        "Server Booster",
        client.firstCap((!!member.premiumSince).toString()),
        true
      );
      userInfo.addField("\u200B", "\u200B", !message.isDM ? true : false);
    }
    if (user.presence.activities[0])
      userInfo.addField(
        "Playing",
        user.presence.activities.map((activitiy) =>
          activitiy.type === "CUSTOM_STATUS" ? activitiy.state : activitiy.name
        ),
        !message.isDM ? true : false
      );
    userInfo.addField("ID", user.id, !message.isDM ? true : false);
    if (!message.isDM) {
      userInfo.addField("\u200B", "\u200B", !message.isDM ? true : false);
      userInfo.addField(
        "Roles",
        member.roles.cache.filter((r) => !r.name.startsWith("@")).size
          ? member.roles.cache
              .filter((r) => !r.name.startsWith("@"))
              .map((r) => `\`${r.name}\``)
              .join(" ")
          : "No Roles",
        true
      );
    }
    message.say(userInfo);
  },
};
