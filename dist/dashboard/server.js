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
const dotenv_1 = require("dotenv");
dotenv_1.config();
const shell = __importStar(require("shelljs"));
const { AUTH_USER_LINK, PORT: processPORT, SECRET_SESSION_KEY } = process.env;
shell.cp("-R", "dashboard/public", "dist/dashboard");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const express_session_1 = __importDefault(require("express-session"));
const serverIcon_1 = require("./functions/serverIcon");
const app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: false,
}));
app.use(express_session_1.default({
    secret: SECRET_SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, expires: new Date(Date.now() * 172800000) },
}));
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "public/views"));
app.use(async (req, res, next) => {
    req.session.user = {
        ...(await Promise.resolve().then(() => __importStar(require("./functions/getTestData")))).OWNERDATA(),
    };
    next();
});
const PORT = processPORT || 8000;
app.get("/", (req, res) => {
    res.render("home", {
        AUTH_USER_LINK: AUTH_USER_LINK,
        Util: {
            serverIcon: serverIcon_1.serverIcon,
        },
        user: {
            ...req.session.user,
        },
    });
});
app.get("/validate", (_req, res) => {
    res.redirect("/");
});
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
