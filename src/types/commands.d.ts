import { Message } from "discord.js";

export type CommandReturn = {
    status: "OK" | "ERROR" | "IGNORE";
    /** le résultat de la commande, à afficher dans la console */
    label?: string;
};

interface commandModule {
    help: {
        name: string;
        description: string;
        syntax?: string;
    };
    run: (message: Message, args: string[]) => Promise<CommandReturn>;
}

declare interface ICommandList {
    [key: string]: commandModule | undefined;
}
