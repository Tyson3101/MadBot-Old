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
    events.forEach((fileEvent) => {
        const { event } = require(`../events/${fileEvent}`);
        client.events.set(event.event, event);
        client.on(event.event, event.run);
        if (i === 1)
            console.log(`-----------------  Events  ----------------`);
        console.log(`Event ${i}: Loaded ${event.event}!`);
        i++;
    });
};