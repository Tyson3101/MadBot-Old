"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
exports.event = {
    event: "messageUpdate",
    run(client, oldMessage, newMessage) {
        if (!oldMessage || oldMessage.content === newMessage.content)
            return;
        console.log("Message Edited: ", newMessage.content);
    },
};
