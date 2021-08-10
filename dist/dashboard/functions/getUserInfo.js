"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserInfo = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
async function getUserInfo(route, options) {
    return await node_fetch_1.default(route, options).then((res) => res.json());
}
exports.getUserInfo = getUserInfo;
