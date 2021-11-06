import { config } from "context/config";
import { Message } from "discord.js/typings/index";
import { CommandReturn } from "types/commands";

export const help = {
    name: "unban",
    description: "Dé-bannis un utilisateur du serveur.",
    syntax: config.prefix + "unban <@user>",
};

export async function run(message: Message, args: string[]): Promise<CommandReturn> {
    const { author, guild } = message;
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

    try {
        await guild?.members.unban(target);
        await message.reply({
            content: "** **",
            embeds: [
                {
                    title: "Unban",
                    description: `${target.user.tag} a été dé-banni.`,
                    color: 0x00ff00,
                    author: {
                        name: author.username,
                        icon_url: author.avatarURL({ dynamic: true }) || "",
                    },
                },
            ],
        });
    } catch (error) {
        console.error(error);
        await message.reply({
            content: "** **",
            embeds: [
                {
                    title: "Erreur",
                    description: "Une erreur est survenue.",
                    color: 0xff0000,
                },
            ],
        });
        return {
            status: "ERROR",
            label: "ERROR",
        };
    }
    return {
        status: "OK",
        label: "unban",
    };
}
