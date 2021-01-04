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
  async run(message) {
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
    userInfo.addField("User Info", `**Username**\n${user.tag}`);
    userInfo.add(0, ["Bot", this.client.firstCap(user.bot.toString())]);
    userInfo.add(0, [
      "Created At",
      `Date: ${moment(user.createdAt).format("MMMM Do YYYY")}
Time ago: ${DiscordBot.getTimeAgo(user.createdAt, new Date())} Days ago`,
    ]);
    userInfo.add(0, ["Status", this.client.firstCap(user.presence.status)]);
    if (user.presence.activities[0])
      userInfo.add(0, [
        "Playing",
        user.presence.activities.map((activitiy) =>
          activitiy.type === "CUSTOM_STATUS" ? activitiy.state : activitiy.name
        ),
      ]);
    userInfo.add(0, ["ID", user.id]);
    if (!message.isDM) {
      userInfo.addField(
        "Member Info",
        "**Nickname**\n" + member.nickname ?? "No Nickname"
      );
      userInfo.add(1, [
        "Owner",
        this.client.firstCap((user.id === message.guild.ownerID).toString()),
      ]);

      userInfo.add(1, [
        "Joined At",
        `Date: ${moment(member.joinedAt).format("MMMM Do YYYY")}
Time ago: ${DiscordBot.getTimeAgo(member.joinedAt, new Date())} Days ago`,
      ]);
      userInfo.add(1, [
        "Server Booster",
        this.client.firstCap((!!member.premiumSince).toString()),
      ]);
      userInfo.add(1, [
        "Roles",
        member.roles.cache.filter((r) => !r.name.startsWith("@")).size
          ? member.roles.cache
              .filter((r) => !r.name.startsWith("@"))
              .map((r) => `\`${r.name}\``)
              .join(" ")
          : "No Roles",
      ]);
    }

    message.say(userInfo);
  },
};
