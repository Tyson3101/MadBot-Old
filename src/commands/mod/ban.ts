import { commandInterFace } from "../../interfaces/Command";

export const command: commandInterFace = {
  name: "Ban",
  description: "Bans a member from the server.",
  usage: "ban [Member] (Reason)",
  args: ["[Member]", "(Reason)"],
  aliases: [],
  guildOnly: true,
  devOnly: false,
  permissions: ["BAN_MEMBERS"],
  run() {},
};
