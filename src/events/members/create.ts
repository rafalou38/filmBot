import { red } from "chalk";
import { config } from "context/config";
import { GuildMember } from "discord.js";
import { log } from "utils/log";

export async function handleGuildMemberCreate(member: GuildMember) {
    const { guild } = member;

    const channel = await guild.channels.fetch(config.welcomeChanelID);
    if (!channel || !channel.isText()) return log(red("❌ Wrong welcomeChanelID"));

    channel.send({
        embeds: [
            {
                title: `Bienvenue ${member.user.tag}`,
                description: `<@${member.id}> nous a rejoints`,
                color: "GREEN",
                thumbnail: {
                    url: member.user.avatarURL({ dynamic: true }) || "",
                },
            },
        ],
    });
}
