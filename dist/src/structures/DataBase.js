"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildDataBase = void 0;
const dotenv_1 = require("dotenv");
dotenv_1.config();
const Client_1 = require("./Client");
class GuildDataBase {
    constructor(guild = null, obj) {
        this.name = guild?.name ?? null;
        this.id = guild?.id ?? null;
        this.ownerID = guild?.ownerID ?? null;
        this.memberCount = guild?.memberCount ?? null;
        this.prefix = obj?.prefix ?? Client_1.DiscordBot.DEFUALT_PREFIX();
        this.moderation = obj?.moderation ?? {
            bans: guild ? {} : null,
            kicks: guild ? {} : null,
            mutes: guild ? {} : null,
            warns: guild ? {} : null,
            all: guild ? {} : null,
            unbans: guild ? {} : null,
            unmutes: guild ? {} : null,
            activeCases: guild ? 0 : null,
            caseCount: guild ? 0 : null,
            logChannel: null,
        };
        this.tags = obj?.tags ?? guild ? {} : null;
        this.logChannel = obj?.logChannel ?? null;
    }
}
exports.GuildDataBase = GuildDataBase;
