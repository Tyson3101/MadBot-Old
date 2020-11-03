import Keyv from "keyv";
import { config } from "dotenv";
config();
export const guildDataBase = new Keyv(process.env.MONGODBPassword);
guildDataBase.on("error", console.error);
