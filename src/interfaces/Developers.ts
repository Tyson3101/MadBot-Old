import { User } from "discord.js";

enum Position {
  OWNER,
  DEVELOPER,
  TESTER,
}

export interface developerInterface {
  User: User;
  position: Position;
}
