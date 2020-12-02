import { config } from "dotenv";
config();
import * as shell from "shelljs";
//import userCheck from "./functions/validate";
const { AUTH_USER_LINK, PORT: processPORT, SECRET_SESSION_KEY } = process.env;
// Copy all the view templates
shell.cp("-R", "dashboard/public", "dist/dashboard");
import express from "express";
import path from "path";
import session from "express-session";
import { serverIcon } from "./functions/serverIcon";
const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(
  session({
    secret: SECRET_SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, expires: new Date(Date.now() * 172800000) },
  })
);

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public/views"));

app.use(async (req, res, next) => {
  req.session.user = {
    ...(await import("./functions/getTestData")).OWNERDATA(),
  };
  next();
}); /**/

const PORT = processPORT || 8000;

app.get(
  "/",
  /*userCheck,*/ (req, res) => {
    res.render("home", {
      AUTH_USER_LINK: AUTH_USER_LINK,
      Util: {
        serverIcon,
      },
      user: {
        ...req.session.user,
      },
    });
  }
);

app.get(
  "/validate",
  /*userCheck,*/ (_req, res) => {
    res.redirect("/");
  }
);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
