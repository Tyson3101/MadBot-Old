"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const form_urlencoded_1 = __importDefault(require("form-urlencoded"));
const getUserInfo_1 = require("./getUserInfo");
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, AUTH_USER_LINK } = process.env;
async function userCheck(req, res, next) {
    const { code } = req.query;
    console.log(code);
    let data;
    let userGuilds;
    let userInfo;
    if (req.session.user)
        return next();
    if (code) {
        const dataToSend = {
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            grant_type: "authorization_code",
            code: code,
            redirect_uri: REDIRECT_URI,
            scope: "identify email guilds guilds.join",
        };
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/x-www-form-urlencoded",
            },
            body: form_urlencoded_1.default(dataToSend),
        };
        try {
            data = await getUserInfo_1.getUserInfo(`https://discord.com/api/oauth2/token`, options);
            if (data.error || data.code === 0)
                throw data;
            if (data.retry_after)
                throw { error: "rateLimited", retry_after: data.retry_after };
            userInfo = await getUserInfo_1.getUserInfo("https://discord.com/api/users/@me", {
                headers: {
                    authorization: `${data.token_type} ${data.access_token}`,
                },
            });
            userGuilds = await getUserInfo_1.getUserInfo("https://discord.com/api/users/@me/guilds", {
                headers: {
                    authorization: `${data.token_type} ${data.access_token}`,
                },
            });
            req.session.user = {
                guilds: userGuilds,
                ...userInfo,
            };
            return next();
        }
        catch (e) {
            console.error(e);
            return res.redirect(AUTH_USER_LINK);
        }
    }
    else {
        if (!req.session.user?.guilds?.length) {
            return res.redirect(AUTH_USER_LINK);
        }
        else {
            return next();
        }
    }
}
exports.default = userCheck;
