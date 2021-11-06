import chalk from "chalk";
import commands from "commands";
import { config } from "context/config";
import { Message } from "discord.js";
import { CommandReturn } from "types/commands";
import { log } from "utils/log";

export async function handleMessageCreate(message: Message) {
    const commandName = message.content.match("^" + config.prefix + "(\\w+)\\s*")?.[1];

    if (!commandName) return /* countXP(message) */;

    const command = commands[commandName];

    if (!command)
        return log(
            chalk.green(`/${commandName}`),
            "exécuté par",
            chalk.blue(message.author.tag),
            "❌",
            chalk.bold(chalk.red("NO_EXIST")),
        );

    const args = message.content.match(/(?<=(!\w+)?)(?<=\s+)[\w\d@<>]+/g);

    let result: CommandReturn = { status: "ERROR", label: "Unknown error" };
    let error: unknown;
    try {
        result = await command.run(message, args || []);
    } catch (err) {
        error = err;
    }

    log(
        chalk.green(`/${commandName}`),
        "exécuté par",
        chalk.blue(message.author.tag),
        result.status === "OK" && !error ? "✔️" : "❌",
        result.label || "",
        error || result.status !== "OK" ? error || chalk.bold(chalk.red(result.label)) : "",
    );
}
