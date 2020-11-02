"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
exports.event = {
    event: "messageReactionAdd",
    run(client, reaction, user) {
        console.log(reaction.message.id);
    },
};
