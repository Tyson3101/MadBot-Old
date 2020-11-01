import { Snowflake } from "discord.js";

enum Position {
  OWNER,
  DEVELOPER,
  TESTER,
}

export interface developerObject {
  username: string;
  id: Snowflake;
  tag: string;
  position: Position;
}
