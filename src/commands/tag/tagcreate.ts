import { Command } from "../../interfaces/Command";
import { GuildDataBase } from "../../structures/DataBase";

export const command: Command = {
  name: "tagcreate",
  description: `Creates a tag`,
  note: 'This command allows random responses. Wrap each response with " "',
  usage:
    "tagcreate [TagName] [First Text to Reply Back With] (2nd Reply) (3rd Reply) (...)",
  example: [
    "tagcreate 5+5 it equals 6",
    `tagcreate "new rules" Check the #rules here`,
    `tagcreate joke "9+10" "21" "19"`,
  ],
  args: [
    {
      name: "TagName",
      required: true,
    },
    {
      name: "Text to Reply Back With",
      required: true,
    },
  ],
  async run(client, message) {
    const replies: string[] = [];
    for (let i = 1; i < message.args.length; i++) {
      if (message.args[i].raw.startsWith('"')) {
        replies.push(message.args[i].value);
      } else {
        replies.push(
          message.args
            .slice(i)
            .map((x) => x.raw)
            .join(" ")
        );
        break;
      }
    }
    message.guild.DB.tags[message.args[0].value.toLowerCase()] = {
      name: message.args[0].value.toLowerCase(),
      replies: replies,
      createdAt: new Date(),
      author: message.author.id,
      uses: 0,
    };
    const newDB = {
      ...message.guild.DB,
    };
    await client.guildDB.set(
      message.guild.id,
      new GuildDataBase(message.guild, newDB)
    );
    message.say(`The tag "${message.args[0].value}" has been created!`);
  },
};
