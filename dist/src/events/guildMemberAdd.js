"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
exports.event = {
    event: "guildMemberAdd",
    async run(client, member) {
        if (member.id === "514696875283185675") {
            await member.setNickname("ladhack had to stay");
            await member.roles.add(member.guild.roles.cache.get("851425700798922772"));
        }
    },
};
