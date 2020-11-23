import { GuildMember, Role } from "discord.js";
import {
  GuildDataBaseInterface,
  infringementInterface,
} from "../interfaces/GuildDataBase";
import { DiscordBot } from "../structures/Client";
import { guildDataBase } from "../structures/DataBase";

export async function handleEndMute(
  member: GuildMember,
  MutedRole: string,
  oldRoles: string[],
  DB: GuildDataBaseInterface,
  CaseNumber: number
): Promise<boolean> {
  DB.moderation.activeCases -= 1;
  DB.moderation.mutes[member.id].find(
    (Case) => Case.caseCount === CaseNumber
  ).active = false;
  DB.moderation.all[member.id]
    .filter((Case) => Case.infringementType === "MUTE")
    .find((Case) => Case.caseCount === CaseNumber).active = false;
  await member.roles.remove(MutedRole, "Time End!");
  await member.roles.add(oldRoles, "Time End!");
  await guildDataBase.set(member.guild.id, { ...DB });
  return true;
}

export function handleMutes(client: DiscordBot) {
  const infringements: any[] = [];
  infringements.push(
    ...client.guilds.cache.map(async (guild) => {
      const DB: GuildDataBaseInterface = await guildDataBase.get(guild.id);
      return await Object.values(DB.moderation.mutes).flatMap((Cases) =>
        Cases.filter((Case) => Case.active)
      );
    })
  );
  return Promise.all(infringements);
}
