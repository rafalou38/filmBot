import { red } from "chalk";
import { config } from "context/config";
import { GuildMember, PartialGuildMember } from "discord.js";
import { log } from "utils/log";

export async function handleGuildMemberRemove(member: GuildMember | PartialGuildMember) {
    const { guild } = member;

    const channel = await guild.channels.fetch(config.welcomeChanelID);
    if (!channel || !channel.isText()) return log(red("❌ Wrong welcomeChanelID"));

    channel.send({
        embeds: [
            {
                title: `Au-revoir **${member.user?.tag}**`,
                description: `${member.user?.username} nous a quittées 😭`,
                color: "RED",
                thumbnail: {
                    url: member.user?.avatarURL({ dynamic: true }) || "",
                },
            },
        ],
    });
}
