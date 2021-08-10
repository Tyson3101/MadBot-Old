"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
const node_fetch_1 = __importDefault(require("node-fetch"));
const moment = __importStar(require("moment"));
require("moment-duration-format");
const DATE_FORMAT_WITH_SECONDS = "YYYY/MM/DD HH:mm:ss";
exports.command = {
    name: "npm",
    public: false,
    async run(client, message) {
        const res = await node_fetch_1.default(`https://registry.npmjs.com/${message.plainArgs.join(" ")
            ? encodeURIComponent(message.plainArgs.join(" ").replace(/ /g, "-"))
            : "----------------------------"}`);
        if (res.status === 404) {
            return message.say("NPM Package Not Found");
        }
        const body = await res.json();
        if (body.time?.unpublished) {
            return message.say("NPM Package Unpublished");
        }
        const version = body["dist-tags"]
            ? body.versions[body["dist-tags"]?.latest]
            : {};
        const maintainers = body.maintainers
            .map((user) => user.name)
            .slice(0, 12);
        const dependencies = version.dependencies
            ? Object.keys(version.dependencies).slice(0, 12)
            : null;
        const embed = new discord_js_1.MessageEmbed()
            .setColor(0xcb0000)
            .setAuthor("NPM", "https://i.imgur.com/ErKf5Y0.png", "https://www.npmjs.com/")
            .setTitle(body.name)
            .setURL(`https://www.npmjs.com/package/${message.plainArgs.join(" ")
            ? encodeURIComponent(message.plainArgs.join(" ").replace(/ /g, "-"))
            : null}`)
            .setDescription(body.description || "No description.")
            .addField("❯ Version", body["dist-tags"]?.latest ?? "Unknown", true)
            .addField("❯ License", body.license || "None", true)
            .addField("❯ Author", body.author ? body.author.name : "Unknown", true)
            .addField("❯ Creation Date", moment.utc(body.time.created).format(DATE_FORMAT_WITH_SECONDS), true)
            .addField("❯ Modification Date", moment.utc(body.time.modified).format(DATE_FORMAT_WITH_SECONDS), true)
            .addField("❯ Main File", version.main || "index.js", true)
            .addField("❯ Dependencies", dependencies?.length ? dependencies.join(", ") : "None")
            .addField("❯ Maintainers", maintainers.join(", "));
        return message.say(embed);
    },
};
