import { messageReactionAddEventInterface } from "../interfaces/Events";

export const event: messageReactionAddEventInterface = {
  event: "messageReactionAdd",
  run(client, reaction, user) {
    console.log(reaction.message.id);
  },
};
