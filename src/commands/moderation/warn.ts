import { config } from "context/config";
import { addWarn } from "db/api/warn";
import Discord, { GuildMember, Message } from "discord.js";
import { CommandReturn } from "types/commands";

export const help = {
    name: "warn",
    description: "Avertis un membre d'une faute",
    syntax: config.prefix + "warn <@user> <raison>",
};

export async function run(message: Message, args: string[]): Promise<CommandReturn> {
    const isAdmin = message.member?.roles.cache.some((r) => config.ADMIN_ROLES.includes(r.name));
    if (!isAdmin) {
        await message.reply({
            content: "** **",
            embeds: [
                {
                    title: "Erreur",
                    description: "Vous n'avez pas la permission d'utiliser cette commande.",
                    color: 0xff0000,
                },
            ],
        });
        return {
            status: "ERROR",
            label: "NO_PERMISSION",
        };
    }
    const target = message.mentions.members?.first();
    if (!target) {
        await message.reply({
            content: "** **",
            embeds: [
                {
                    title: "Erreur",
                    description: "Vous devez mentionner un membre.",
                    color: 0xff0000,
                },
            ],
        });
        return {
            status: "ERROR",
            label: "WRONG_ARGS",
        };
    }

    await addWarn(target, message.member as GuildMember, args.slice(1).join(" "));

    await message.reply({
        content: "** **",
        embeds: [
            {
                title: "Avertissement",
                description: `L'utilisateur ${target.user.username} a été warn.`,
                color: 0x00ff00,
            },
        ],
    });
    return {
        status: "OK",
        label: "WARNED",
    };
}
