import { MessageEmbed } from "discord.js";
import { commandInterFace } from "../../interfaces/Command";
import { pingEmbed } from "../../structures/Embeds"; // Import Syntax

export const command: commandInterFace = {
  name: "test",
  devOnly: true,
  public: false,
  async run(client, message) {
    let attachemnts = message.attachments.array();
    message.channel.send({
      files: attachemnts,
      embed: new MessageEmbed().setTimestamp().setTitle("Test"),
    });
  },
};
