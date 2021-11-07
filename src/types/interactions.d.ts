import { Message } from "discord.js";

export type CommandReturn = {
    status: "OK" | "ERROR" | "IGNORE";
    /** le résultat de la commande, à afficher dans la console */
    label?: string;
};

interface commandModule {
    run: (interaction: Interaction, arg: string) => Promise<CommandReturn>;
}

declare interface IInteractionList {
    [key: string]: commandModule | undefined;
}
