import chalk from "chalk";
import commands from "commands/index";
import { config } from "context/config";
import {
    DiscordAPIError,
    Message,
    MessageReaction,
    PartialMessageReaction,
    PartialUser,
    User,
} from "discord.js";
import { CommandReturn } from "types/commands";
import { log } from "utils/log";

export async function handleMessageReactionRemove(
    reaction: MessageReaction | PartialMessageReaction,
    user: User | PartialUser,
) {
    if (user.id === reaction.client.user?.id) return;
    if (reaction.partial || user.partial) return;

    const embed = reaction.message.embeds[0];
    if (!embed.title?.includes("obtenir le role") || !embed.description) return;

    const roles = embed.description
        .trim()
        .split("\n")
        .map((role) => role.split(":"));

    const emoji = reaction.emoji.name || "";

    const roleString = roles.find((r) => r[0].trim() === emoji.trim())?.[1];
    if (!roleString) {
        reaction.users.remove(user);
        return;
    }

    const roleID = roleString.match(/\d+/)?.[0];

    if (!roleID) {
        reaction.message.channel.send(`Le role correspondant a ${emoji} est introuvable.`);
        reaction.users.remove(user);
        return;
    }

    const member = await reaction.message.guild?.members.fetch(user.id);
    try {
        await member?.roles.remove(roleID);
        log(`role ${roleString} retiré de ${user.tag}`);
    } catch (error) {
        if ((error as DiscordAPIError).code === 50013) {
            reaction.message.channel.send("Je n'ai pas la permission de retirer ce role");
            log(
                `${chalk.red(
                    "Erreur",
                )} : Je n'ai pas la permission de retirer le role ${roleString}`,
            );
        }
    }
}
