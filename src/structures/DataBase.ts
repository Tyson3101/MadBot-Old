import Keyv from "keyv";
import { config } from "dotenv";
config();
export const guildDataBase = new Keyv(process.env.DB); // DataBase Connetction
guildDataBase.on("error", (e: any) => console.log(e?.errors?.[0]?.err ?? e)); // Handles Errors
