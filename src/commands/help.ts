import commands from "commands/index";
import { Message } from "discord.js";
import { CommandReturn } from "types/commands";

export const help = {
    name: "help",
    description: "Affiche la liste des commandes.",
};

export async function run(message: Message, args: string[]): Promise<CommandReturn> {
    const commandsHelp = Object.values(commands).map((command) => {
        const l = ["**", command?.help.name, ":**", "\n", command?.help.description, "\n"];
        if (command?.help.syntax) {
            l.push("```", command?.help.syntax, "```");
        }
        return l.join("");
    });
    message.reply({
        embeds: [
            {
                title: "Commandes:",
                description: commandsHelp.join("\n\n"),
                color: "GREEN",
            },
        ],
    });
    return {
        status: "OK",
        label: "succès",
    };
}
