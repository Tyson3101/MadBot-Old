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
const hastebin_1 = __importDefault(require("hastebin"));
async function sendEvaledMessage(message, timeTook, toDisplay, evaled, showBin) {
    const client = message.client;
    const KahootSpam = require("kahoot-spammer");
    let api = KahootSpam;
    let evaledHasteBin;
    try {
        if (showBin) {
            evaledHasteBin = await hastebin_1.default.createPaste(showBin, {
                raw: false,
                contentType: true,
                server: "https://hastebin.com/",
            });
        }
    }
    catch (e) {
        console.log("Bin fail!", e);
    }
    let evaledEmbed = new discord_js_1.MessageEmbed({
        author: {
            name: message.author.tag,
            iconURL: message.author.displayAvatarURL({
                format: "png",
                dynamic: true,
            }),
        },
        color: "DARK_VIVID_PINK",
        title: "Evaled Code",
        description: `**Evaled! Took ${timeTook[0] > 0 ? `${timeTook[0]}s` : ""}${timeTook[1] / 1e6}ms**\n\n**Output**\n${evaled.length < 2000
            ? `\`\`\`js\n${discord_js_1.Util.escapeMarkdown(evaled.slice(0, 2000), {
                underline: false,
                bold: false,
                italic: false,
                inlineCode: false,
            })}\`\`\`\n${evaledHasteBin ? `**${evaledHasteBin}**` : ""}`
            : evaledHasteBin
                ? evaledHasteBin
                : "No Output."}\n`,
        fields: [
            {
                name: "Input",
                value: `\`\`\`js\n${discord_js_1.Util.escapeMarkdown(toDisplay
                    .map((str, i) => {
                    if (i === toDisplay.length - 1)
                        return `${str.trim().replace(/return/g, "")}`;
                    else
                        return `${str}`;
                })
                    .join("\n")
                    .trim(), { underline: false, bold: false, italic: false, inlineCode: false })}\n\`\`\``,
            },
        ],
        footer: {
            text: `${client.user.username} ©`,
            iconURL: client.user.displayAvatarURL({ format: "png" }),
        },
    });
    try {
        let msg = await message.say(evaledEmbed);
        return msg;
    }
    catch (e) {
        console.log(e);
    }
}
const evalStringExample = `const Discord = require('discord.js');\nconst { MessageEmbed, MessageAttachment } = require('discord.js'); const {GuildDataBase} = require("../../structures/DataBase"); function kahootSpam({ code, name, amount}) { console.log("running", { code, name, amount })return api.spam(code, name ?? "Spam", amount) }`;
exports.command = {
    name: "eval",
    aliases: ["code"],
    args: [
        {
            name: "Code To Eval",
            required: true,
        },
    ],
    devOnly: true,
    async run(message) {
        let toEvalFull = message.plainArgs
            .join(" ")
            .replace(/```(js\n)?/g, "")
            .trim();
        let toEval;
        let evaled;
        let toEvaledSpilt;
        try {
            const startTime = process.hrtime();
            toEvaledSpilt = toEvalFull.split(/\n/g);
            console.log(toEvalFull, toEvaledSpilt[0]);
            toEval = toEvaledSpilt.join("\n");
            let aboutToEval;
            if (toEvaledSpilt.length > 1)
                aboutToEval = `(async () => {\n${evalStringExample}\n${toEval}\n})()`;
            else
                aboutToEval = `(async () => {\n${evalStringExample}\nreturn ${toEvaledSpilt[0]}\n})()`;
            evaled = await eval(aboutToEval);
            const timeTook = process.hrtime(startTime);
            let evaledMassed;
            if (typeof evaled !== "string") {
                evaledMassed = (await Promise.resolve().then(() => __importStar(require("util")))).inspect(evaled);
                evaled = (await Promise.resolve().then(() => __importStar(require("util")))).inspect(evaled, {
                    depth: 0,
                });
            }
            else {
                evaled = `"${evaled}"`;
            }
            if (evaled && !message.argsUtil.flag("i")) {
                await sendEvaledMessage(message, timeTook, toEvaledSpilt, evaled, evaledMassed);
            }
        }
        catch (e) {
            message.say(new discord_js_1.MessageEmbed({
                author: {
                    name: message.author.tag,
                    iconURL: message.author.displayAvatarURL({
                        format: "png",
                        dynamic: true,
                    }),
                },
                color: "DARK_VIVID_PINK",
                title: "Evaled Code",
                fields: [
                    {
                        name: "Input",
                        value: `\`\`\`js\n${discord_js_1.Util.escapeMarkdown(toEvaledSpilt
                            .map((str, i) => {
                            if (i === toEvaledSpilt.length - 1)
                                return `${str.trim().replace(/return/g, "")}`;
                            else
                                return `${str}`.trim();
                        })
                            .join("\n")
                            .trim(), {
                            underline: false,
                            bold: false,
                            italic: false,
                            inlineCode: false,
                        })}\n\`\`\``,
                    },
                    {
                        name: "Output",
                        value: `\`\`\`js\n${e}\n\`\`\``,
                    },
                ],
                footer: {
                    text: `${this.client.user.username} ©`,
                    iconURL: this.client.user.displayAvatarURL({ format: "png" }),
                },
            }));
        }
    },
};
