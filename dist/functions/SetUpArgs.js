"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function setUpArgs(client, message, DB) {
    const [commandNameUPPERCASE, ...argsArray] = message.content
        .trim()
        .slice(DB.prefix.length)
        .split(/ +/g);
    const UtilArgs = {
        args: argsArray,
        DB: DB,
        prefix: DB.prefix,
        isDM: !message.guild,
        command: client.commands.get(commandNameUPPERCASE.toLowerCase())
            ? client.commands.get(commandNameUPPERCASE.toLowerCase())
            : null,
        async getUser(mentionID) {
            let idArray = mentionID.match(/\d+/);
            if (!idArray)
                throw "No ID!";
            let id = idArray[0];
            try {
                let User = await message.client.users.fetch(id);
                return User;
            }
            catch (e) {
                throw e;
            }
        },
        async getMember(mentionID) {
            console.log(mentionID);
            let idArray = mentionID.match(/\d+/);
            if (!idArray)
                throw "No ID!";
            let id = idArray[0];
            try {
                let guildMember = await message.guild.members.fetch(id);
                return guildMember;
            }
            catch (e) {
                throw e;
            }
        },
    };
    return [commandNameUPPERCASE, argsArray, UtilArgs];
}
exports.default = setUpArgs;
