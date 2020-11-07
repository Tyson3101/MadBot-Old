"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventHandlerInit = void 0;
const fs_1 = __importDefault(require("fs"));
exports.EventHandlerInit = (client) => {
    let i = 1;
    const events = fs_1.default
        .readdirSync("./dist/events")
        .filter((file) => file.endsWith(".js"));
    events.forEach((fileEvent) => {
        const event = require(`../events/${fileEvent}`).event;
        if (!event || client.events.has(event.event))
            return;
        client.events.set(event.event, event);
        if (event.event === "ready")
            client.once(event.event, event.run.bind(null, client));
        else
            client.on(event.event, event.run.bind(null, client));
        if (i === 1)
            console.log(`-----------------  Events  ----------------`);
        console.log(`Event ${i}: Loaded ${event.event}!`);
        i++;
    });
};
