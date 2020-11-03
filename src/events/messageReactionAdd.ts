import { messageReactionAddEventInterface } from "../interfaces/Events";

export const event: messageReactionAddEventInterface = {
  event: "messageReactionAdd",
  async run(client, reaction, user) {
    if (reaction.message.partial) await reaction.message.fetch();
    // Now the message has been cached and is fully available:
    console.log(
      `${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`
    );
    // Fetches and caches the reaction itself, updating resources that were possibly defunct.
    if (reaction.partial) await reaction.fetch();
    // Now the reaction is fully available and the properties will be reflected accurately:
    console.log(
      `${reaction.count} user(s) have given the same reaction to this message!`
    );
  },
};
