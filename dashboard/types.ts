import { User } from "./interfaces/User";

declare module "express-session" {
  interface Session {
    user?: User;
  }
}
