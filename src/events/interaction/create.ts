import chalk from "chalk";
import commands from "commands/index";
import { config } from "context/config";
import { Interaction, Message } from "discord.js";
import { interactions } from "interactions/index";
import { CommandReturn } from "types/commands";
import { log } from "utils/log";

export async function handleInteractionCreate(interaction: Interaction) {
    if (!(interaction.isButton() && interaction.customId.startsWith("event"))) return;

    const commandName = interaction.customId.match(/^event-(\w+)/)?.[1];

    if (!commandName) return /* countXP(message) */;

    const command = interactions[commandName];

    if (!command)
        return log(
            chalk.green(`/${commandName}`),
            "exécuté par",
            chalk.blue(interaction.user.tag),
            "❌",
            chalk.bold(chalk.red("NO_EXIST")),
        );

    const arg = interaction.customId.match(/{(.+?)}/)?.[1] || "";

    let result: CommandReturn = { status: "ERROR", label: "Unknown error" };
    let error: unknown;
    try {
        result = await command.run(interaction, arg);
    } catch (err) {
        error = err;
    }

    log(
        chalk.green(`/${commandName}`),
        "exécuté par",
        chalk.blue(interaction.user.tag),
        result.status === "OK" && !error ? "✔️" : "❌",
        result.label || "",
        error || result.status !== "OK" ? error || chalk.bold(chalk.red(result.label)) : "",
    );
}
