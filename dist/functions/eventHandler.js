"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventHandlerInit = void 0;
const fs_1 = __importDefault(require("fs"));
exports.eventHandlerInit = (client) => {
    let i = 1;
    const events = fs_1.default
        .readdirSync("./dist/events")
        .filter((file) => file.endsWith(".js"));
    events.forEach((event) => {
        const eventListener = require(`../events/${event}`).event;
        client.events.set(eventListener.event, eventListener);
        client.on(eventListener.event, eventListener.run);
        console.log(`Event ${i}: Loaded ${eventListener.event}!`);
        i++;
    });
};
