"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.guildDataBase = void 0;
const keyv_1 = __importDefault(require("keyv"));
const dotenv_1 = require("dotenv");
dotenv_1.config();
exports.guildDataBase = new keyv_1.default(process.env.MONGODBPassword);
exports.guildDataBase.on("error", console.error);
