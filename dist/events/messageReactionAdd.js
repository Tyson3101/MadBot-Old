"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
exports.event = {
    event: "messageReactionAdd",
    async run(client, reaction, user) {
        if (reaction.message.partial)
            await reaction.message.fetch();
        console.log(`${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`);
        if (reaction.partial)
            await reaction.fetch();
        console.log(`${reaction.count} user(s) have given the same reaction to this message!`);
    },
};
