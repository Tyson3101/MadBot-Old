import { Command } from "../../interfaces/Command";
export const command: Command = {
  name: "test",
  args: [
    {
      name: "any",
      required: false,
    },
  ],
  public: false,
  devOnly: true,
  async run(message) {
    //@ts-ignore
    message.say(this.client.constructor.name);
  },
};
