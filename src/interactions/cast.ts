import axios from "axios";
import { ButtonInteraction, MessageEmbedOptions } from "discord.js";
import { IMDBCastResult } from "types/cast";
import { CommandReturn } from "types/commands";
import { log } from "utils/log";

export async function run(interaction: ButtonInteraction, id: string): Promise<CommandReturn> {
    await interaction.deferReply();
    const response = await axios
        .get(`https://imdb-api.com/en/API/FullCast/${process.env.IMDBAPIKEY}/${id}`)
        .catch((err) => {
            interaction.editReply({
                embeds: [
                    {
                        title: "Error",
                        color: 0xff0000,
                        description: "Erreur lors de la recherche de cast.",
                    },
                ],
            });
            log("error", "Erreur lors de la recherche de cast.", err);
            return;
        });

    if (!response || response.status !== 200) {
        return {
            status: "ERROR",
            label: response?.statusText,
        };
    }
    const data = response.data as IMDBCastResult;

    const embeds = data.actors.slice(0, 9).map(
        (actor) =>
            ({
                title: actor.name,
                thumbnail: {
                    url: actor.image,
                },
                description: actor.asCharacter,
                footer: {
                    text: `IMDB ID: ${actor.id}`,
                },
                url: `https://www.imdb.com/name/${actor.id}`,
            } as MessageEmbedOptions),
    );

    interaction.editReply({
        content: `Acteurs de ${data.title}.`,
        embeds,
    });
    return {
        status: "OK",
        label: "succès",
    };
}
