import { config } from "context/config";
import { Message } from "discord.js";
import { CommandReturn } from "types/commands";

export const help = {
    name: "clear",
    description: "Supprime un certain nombre de messages.",
    syntax: config.prefix + "clear <count> (@user)",
};

export async function run(message: Message, args: string[]): Promise<CommandReturn> {
    const { channel } = message;

    if (channel.type === "DM")
        return {
            status: "ERROR",
            label: "DM",
        };

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
    const amount = parseInt(args[0]) || 0;
    const target = message.mentions.members?.first();
    if (!amount) {
        await message.reply({
            content: "** **",
            embeds: [
                {
                    title: "Erreur",
                    description: "Vous devez préciser un nombre de messages à supprimer.",
                    color: 0xff0000,
                },
            ],
        });
        return {
            status: "ERROR",
            label: "NO_AMOUNT",
        };
    }

    if (!target) {
        const messages = await channel.messages.fetch({
            limit: parseInt(args[0]),
            before: message.id,
        });

        await channel.bulkDelete(messages);

        message.reply({
            content: `${messages.size} messages on été supprimés`,
        });
    } else {
        const userMessage = [];
        const messages = await channel.messages.fetch({ before: message.id, limit: 100 });
        for (const [_, message] of messages) {
            if (message.author.id === target.id) {
                userMessage.push(message);
                if (userMessage.length >= parseInt(args[0])) {
                    break;
                }
            }
        }
        await channel.bulkDelete(userMessage);
        message.reply({
            content: `${userMessage.length} messages on été supprimés`,
        });
    }
    return {
        status: "OK",
        label: "CLEAR",
    };
}
