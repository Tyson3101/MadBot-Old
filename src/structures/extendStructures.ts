import { DiscordBot } from "./Client";
import {
  DMChannel,
  NewsChannel,
  Structures,
  TextChannel,
  MessageAdditions,
  APIMessage,
  StringResolvable,
} from "discord.js";
import { MessageOptions } from "child_process";

export const extendStructures = (): void => {
  //@ts-ignore (I am sorrry)
  Structures.extend("Message", (Message) => {
    class sayMessage extends Message {
      constructor(
        client: DiscordBot,
        data: object,
        channel: DMChannel | TextChannel | NewsChannel
      ) {
        super(client, data, channel);
      }
      //@ts-ignore (I am sorrry)
      async say(
        content: StringResolvable | APIMessage,
        options: MessageOptions | MessageAdditions
      ) {
        return await this.channel.send(content, options as any);
      }
    }
    return sayMessage;
  });
};
