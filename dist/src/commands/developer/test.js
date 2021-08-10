"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
exports.command = {
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
        message.say(this.client.constructor.name);
    },
};
