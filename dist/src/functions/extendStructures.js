"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extendStructures = void 0;
const discord_js_1 = require("discord.js");
const Message_1 = require("../structures/Message");
exports.extendStructures = () => {
    discord_js_1.Structures.extend("Message", (Message) => {
        return Message_1.extendMessage(Message);
    });
};
