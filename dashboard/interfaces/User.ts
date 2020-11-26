import { Guild } from "./Guild";

export interface User {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
  public_flags: number;
  flags: number;
  email: string;
  verified: true;
  locale: string;
  mfa_enabled: boolean;
  premium_type: number;
  guilds: Guild[];
}
