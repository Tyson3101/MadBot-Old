import { config } from "dotenv";
config();
import * as shell from "shelljs";
import formurlencoded from "form-urlencoded";
import { getUserInfo } from "./functions/getUserInfo";
const {
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
  AUTH_USER_LINK,
  PORT: processPORT,
  SECRET_SESSION_KEY,
} = process.env;
// Copy all the view templates
shell.cp("-R", "dashboard/public", "dist/dashboard");
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import session from "express-session";
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
    cookie: { secure: false },
  })
);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public/views"));
app.use(express.static(path.join(__dirname, "public")));

const PORT = processPORT || 8000;

app.get("/", userCheck, (req, res) => {
  console.log((req.session as any).user);
  res.render("home", {
    user: {
      ...(req.session as any).user,
    },
  });
});

app.get("/user/", userCheck, async (req, res) => {
  res.redirect("/");
});

async function userCheck(req: Request, res: Response, next: NextFunction) {
  const { code } = req.query;
  let data: any;
  let userGuilds: any;
  let userInfo: any;
  if (code) {
    const dataToSend = {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: REDIRECT_URI,
      scope: "identify email connections",
    };
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      body: formurlencoded(dataToSend),
    };

    try {
      data = await getUserInfo(`https://discord.com/api/oauth2/token`, options);
      if (data.error || data.code === 0) throw data;
      if (data.retry_after)
        throw { error: "rateLimited", retry_after: data.retry_after };

      userInfo = await getUserInfo("https://discord.com/api/users/@me", {
        headers: {
          authorization: `${data.token_type} ${data.access_token}`,
        },
      });
      userGuilds = await getUserInfo(
        "https://discord.com/api/users/@me/guilds",
        {
          headers: {
            authorization: `${data.token_type} ${data.access_token}`,
          },
        }
      );
      (req.session as any).user = {
        guilds: userGuilds,
        ...userInfo,
      };
    } catch (e) {
      res.redirect(AUTH_USER_LINK);
    }
  } else {
    if (!(req.session as any).user) {
      res.render(AUTH_USER_LINK);
    }
  }
  next();
}

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
