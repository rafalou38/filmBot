import dotenv from "dotenv";
dotenv.config();

import Discord from "discord.js";
import { handleMessageCreate } from "events/message/create";
import { context } from "context/context";
import { initDB } from "db/initialize";
import { log } from "utils/log";
import chalk from "chalk";

const intents: Discord.IntentsString[] = ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"];
const client = new Discord.Client({
    intents: intents,
});
context.client = client;

client.once("ready", async () => {
    log("🤖 Bot started as", chalk.blue(client.user?.tag), " 🚀");
});

client.on("messageCreate", handleMessageCreate);

initDB().then(() => {
    client.login(process.env.BOT_TOKEN);
});
