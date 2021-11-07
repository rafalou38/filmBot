import { config } from "context/config";
import { Message, MessageEmbedOptions, SelectMenuInteraction } from "discord.js";
import { CommandReturn } from "types/commands";
import axios from "axios";
import { IMDBSearchApiResult, IMDBWikiResult } from "types/movie";
import { log } from "utils/log";

export const help = {
    name: "film",
    description: "Recherche un film par nom (et date).",
    syntax: config.prefix + "film <recherche>",
};

export async function run(message: Message, args: string[]): Promise<CommandReturn> {
    const { channel } = message;

    const response = await axios
        .get(
            `https://imdb-api.com/fr/API/Search/${process.env.IMDBAPIKEY}/${encodeURI(
                args.join(" "),
            )}`,
        )
        .catch((err) => {
            channel.send("Une erreur est survenue.");
            log("error", "Erreur lors de la recherche de film.", err);
            return null;
        });

    if (!response || response.status !== 200) {
        return {
            status: "ERROR",
            label: response?.statusText,
        };
    }

    const results = response.data as IMDBSearchApiResult;

    const embeds = results.results
        .map(
            (result) =>
                ({
                    title: result.title,
                    description: result.description,
                    thumbnail: {
                        url: result.image,
                    },
                } as MessageEmbedOptions),
        )
        .slice(0, 5);
    const resultListMessage = await message.reply({
        content: "Voici les résultats de votre recherche :",
        embeds,
        components: [
            {
                type: "ACTION_ROW",
                components: [
                    {
                        type: "SELECT_MENU",
                        customId: "selectMenu",
                        options: results.results.map((result) => ({
                            value: result.id,
                            description: result.description,
                            label: result.title,
                        })),
                    },
                ],
            },
        ],
    });

    const selected = (await channel.awaitMessageComponent({
        componentType: "SELECT_MENU",
        time: 10000,
    })) as SelectMenuInteraction;
    const selectedID = selected.values[0];

    if (!selectedID) {
        return {
            status: "IGNORE",
            label: "Aucun résultat n'a été sélectionné.",
        };
    }
    await selected.deferReply();
    const selectedBaseData = results.results.find((result) => result.id === selectedID);

    const detailedResponse = await axios.get(
        `https://imdb-api.com/fr/API/Wikipedia/${process.env.IMDBAPIKEY}/${selectedID}`,
    );
    if (detailedResponse.status !== 200) {
        await selected.editReply({
            content: "Une erreur est survenue lors de la récupération des données détaillées.",
        });
        return {
            status: "ERROR",
            label: detailedResponse.statusText,
        };
    }
    const detailedData = detailedResponse.data as IMDBWikiResult;

    await selected.editReply({
        content: "Voici les détails du film :",
        embeds: [
            {
                title: detailedData.title,
                description: detailedData.plotShort.plainText,
                url: detailedData.url,
                image: {
                    url: selectedBaseData?.image,
                },
                fields: [
                    {
                        name: "Année:",
                        value: detailedData.year,
                        inline: true,
                    },
                    {
                        name: "Titre original:",
                        value: detailedData.titleInLanguage,
                        inline: true,
                    },
                    {
                        name: "Langue originale:",
                        value: detailedData.language,
                        inline: true,
                    },
                ],
                footer: {
                    text: `IMDbID: ${selectedID}`,
                },
            },
        ],
        components: [
            {
                type: "ACTION_ROW",
                components: [
                    {
                        type: "BUTTON",
                        style: "PRIMARY",
                        label: "Acteurs",
                        customId: `event-cast-{${selectedID}}`,
                    },
                    {
                        type: "BUTTON",
                        style: "LINK",
                        label: "Wikipedia",
                        url: detailedData.url,
                    },
                    {
                        type: "BUTTON",
                        style: "LINK",
                        label: "IMDb",
                        url: `https://www.imdb.com/title/${selectedID}`,
                    },
                ],
            },
        ],
    });

    return {
        status: "OK",
        label: "SUCESS",
    };
}
