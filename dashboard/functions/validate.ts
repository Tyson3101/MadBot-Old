import formurlencoded from "form-urlencoded";
import { getUserInfo } from "./getUserInfo";
import { NextFunction, Request, Response } from "express";
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, AUTH_USER_LINK } = process.env;

export default async function userCheck(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { code } = req.query;
  console.log(code);
  let data: any;
  let userGuilds: any;
  let userInfo: any;
  if ((req.session as any).user) return next();
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
      return next();
    } catch (e) {
      console.error(e);
      return res.redirect(AUTH_USER_LINK);
    }
  } else {
    if (!(req.session as any).user?.guilds?.length) {
      return res.redirect(AUTH_USER_LINK);
    } else {
      return next();
    }
  }
}
