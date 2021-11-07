import { config } from "context/config";
import { Message } from "discord.js";
import { CommandReturn } from "types/commands";

export const help = {
    name: "reactRole",
    description: "Crée un embed pour choisir ces roles.",
    syntax: config.prefix + "reactRole <emoji>:<RoleID> <emoji>:<RoleID> ...",
};

export async function run(message: Message, args: string[]): Promise<CommandReturn> {
    const { channel } = message;

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

    const roles = new Map<string, string>();
    args.forEach((arg) => {
        const [emoji, roleID] = arg.split(":");
        if (!emoji || !roleID) {
            return;
        }
        roles.set(emoji, roleID);
    });

    const sentMessage = await channel.send({
        content: "** **",
        embeds: [
            {
                title: "Réagis pour obtenir le role.",
                description: [...roles.entries()]
                    .map(([emoji, roleID]) => `${emoji} : <@&${roleID}>`)
                    .join("\n"),
                color: config.uniqueReactEmbedColor,
            },
        ],
    });

    for (const [emoji, _] of roles) {
        await sentMessage.react(emoji);
    }

    return {
        status: "OK",
        label: "SUCESS",
    };
}
