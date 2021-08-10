"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverIcon = void 0;
const canvas_1 = require("canvas");
function serverIcon(server, size) {
    if (!server.icon) {
        const canvas = canvas_1.createCanvas(200, 200);
        const ctx = canvas.getContext("2d");
        canvas.width = size.width;
        canvas.height = size.height;
        ctx.fillStyle = "#36393f";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#dcddde";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "40px Trebuchet MS";
        ctx.fillText(`${server.name
            .split(/ +/g)
            .map((str) => str[0])
            .join("")}`, canvas.width / 2, canvas.height / 2);
        return canvas.toDataURL();
    }
    else
        return `https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png`;
}
exports.serverIcon = serverIcon;
