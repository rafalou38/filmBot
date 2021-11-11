import { GuildMember } from "discord.js";
import { DBMember } from "../schemas/member";

export async function getMember(member: GuildMember): Promise<DBMember | null> {
    return await DBMember.findOne({
        discordID: member.id,
    });
}
/**
 *  Get a member by their discordID
 *
 * ⚠️ the member is not saved to the database ⚠️
 */
export function createMember(member: GuildMember): DBMember {
    return new DBMember({
        userID: member.user.id,
        username: member.user.username,
    });
}

export async function createOrGetMember(member: GuildMember, save = false): Promise<DBMember> {
    let dbMember = await getMember(member);
    if (!dbMember) {
        dbMember = createMember(member);
        if (save) await dbMember.save();
    }
    return dbMember;
}
