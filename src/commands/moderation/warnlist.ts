import { config } from "context/config";
import { getWarns } from "db/api/warn";
import { DBWarn } from "db/schemas/warn";
import Discord, {
    EmbedFieldData,
    GuildMember,
    InteractionCollector,
    Message,
    MessageActionRow,
    MessageEmbedOptions,
} from "discord.js";
import { CommandReturn } from "types/commands";

export const help = {
    name: "warnlist",
    description: "Affiche la liste des warns d'un utilisateur.",
    syntax: config.prefix + "warnlist <@user>",
};

const emojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣"];

const warnsCount = 4;

export function generateEmbed(
    message: Message,
    warns: DBWarn[],
    target: GuildMember,
    i: number,
): MessageEmbedOptions {
    const embed: MessageEmbedOptions = {
        title: `Warns de ${target.user.username}`,
        description: `L'utilisateur <@${target.id}> a ${warns.length} warns`,
        color: 13849690,
        footer: {
            icon_url: message.client.user?.avatarURL() || "",
            text: message.client.user?.username,
        },
        thumbnail: {
            url: target.user.avatarURL() || "",
        },
        author: {
            name: message.author?.username,
            icon_url: message.author?.avatarURL() || "",
        },
        fields: [],
    };

    warns.slice(i * warnsCount, i * warnsCount + warnsCount).forEach((warn, i) => {
        embed.fields?.push({
            name: emojis[i] + " " + warn.date.toLocaleDateString("fr-FR"),
            value: `Par: <@${warn.authorUserID}>` + "```" + warn.reason + "```",
        });
    });

    embed.fields?.push({
        name: "page",
        value: `${i + 1}/${Math.ceil(warns.length / warnsCount)}`,
    });

    return embed;
}

function generateComponents(warns: DBWarn[], target: GuildMember, i: number): MessageActionRow[] {
    const components = [];
    let row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton({
                customId: "previous",
                label: "◀",
                style: "SECONDARY",
                disabled: i === 0,
            }),
        )
        .addComponents(
            new Discord.MessageButton({
                customId: "clear",
                label: "🗑️",
                style: "DANGER",
            }),
        )
        .addComponents(
            new Discord.MessageButton({
                customId: "next",
                label: "▶",
                style: "SECONDARY",
                disabled: warns.length === 0 || i + 1 === Math.ceil(warns.length / warnsCount),
            }),
        );

    components.push(row);
    row = new Discord.MessageActionRow();
    warns = warns.slice(i * warnsCount, i * warnsCount + warnsCount);
    for (let i = 0; i < warnsCount; i++) {
        row.addComponents(
            new Discord.MessageButton({
                customId: (i + 1).toString(),
                label: emojis[i],
                style: "DANGER",
                disabled: !warns[i],
            }),
        );
    }
    components.push(row);

    return components;
}

let collector: InteractionCollector<Discord.ButtonInteraction>;
export async function run(message: Message, args: string[]): Promise<CommandReturn> {
    const { member } = message;

    const isAdmin = member?.roles.cache.some((r) => config.ADMIN_ROLES.includes(r.name));
    if (!isAdmin) {
        message.reply({
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
            label: "ERR_PERMISSION_DENIED",
        };
    }

    const target = message.mentions.members?.first() || message.member;
    if (!target) {
        message.reply({
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
            label: "ERR_MEMBER_NOT_FOUND",
        };
    }

    const warns = await getWarns(target);

    let i = 0;
    message.reply({
        embeds: [generateEmbed(message, warns, target, i)],
        components: generateComponents(warns, target, i),
    });

    if (collector) collector.stop();
    collector = message.channel.createMessageComponentCollector({
        time: 30_000,
    });

    collector.on("collect", async (interaction) => {
        switch (interaction.customId) {
            case "previous":
                i--;
                interaction.update({
                    embeds: [generateEmbed(message, warns, target, i)],
                    components: generateComponents(warns, target, i),
                });
                break;

            case "clear":
                warns.splice(0, warns.length);
                interaction.update({
                    embeds: [generateEmbed(message, warns, target, i)],
                    components: generateComponents(warns, target, i),
                });
                break;

            case "next":
                i++;
                interaction.update({
                    embeds: [generateEmbed(message, warns, target, i)],
                    components: generateComponents(warns, target, i),
                });
                break;

            default:
                {
                    if (!interaction.customId.match(/\d/)) return;
                    const warnIndex = 4 * i + (parseInt(interaction.customId) - 1);
                    warns.splice(warnIndex, 1);

                    interaction.update({
                        embeds: [generateEmbed(message, warns, target, i)],
                        components: generateComponents(warns, target, i),
                    });
                }
                break;
        }
    });
    return {
        status: "OK",
        label: "SUCCESS",
    };
}
