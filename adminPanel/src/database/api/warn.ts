import { DBWarn } from "db/schemas/warn";
import { GuildMember } from "discord.js";

export async function getWarns(member: GuildMember, limit = 0) {
    return DBWarn.find({
        user: member.id,
    })
        .sort({
            date: -1,
        })
        .limit(limit)
        .exec();
}
export async function addWarn(
    member: GuildMember,
    author: GuildMember,
    reason: string,
): Promise<DBWarn> {
    const warn = new DBWarn({
        userID: member.id,
        username: member.user.username,
        authorUserID: author.id,
        authorUsername: author.user.username,
        reason: reason,
        date: new Date(),
    });
    await warn.save();
    return warn;
}
export async function clearWarns(member: GuildMember) {
    await DBWarn.deleteMany({
        user: member.id,
    });
}
