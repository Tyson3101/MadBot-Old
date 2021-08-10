"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
exports.event = {
    event: "guildMemberUpdate",
    async run(client, oldMember, newMember) {
        if (newMember.id === "514696875283185675") {
            if (oldMember.nickname !== newMember.nickname &&
                newMember.nickname !== "ladhack had to stay") {
                newMember.setNickname("ladhack had to stay");
            }
        }
    },
};
