"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
const prefix = "!";
exports.event = {
    event: "messageUpdate",
    run(oldMessage, newMessage) {
        console.log(newMessage.content);
    },
};
