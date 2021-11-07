import dotenv from "dotenv";
dotenv.config();

import chalk from "chalk";
import Discord from "discord.js";

import { log } from "utils/log";
import { initDB } from "db/initialize";
import { context } from "context/context";

import { handleMessageCreate } from "events/message/create";
import { handleGuildMemberCreate } from "events/members/create";
import { handleGuildMemberRemove } from "events/members/remove";
import { handleMessageReactionAdd } from "events/reactions/create";
import { handleMessageReactionRemove } from "events/reactions/remove";
import { handleInteractionCreate } from "events/interaction/create";

const intents: Discord.IntentsString[] = [
    "GUILDS",
    "GUILD_MESSAGES",
    "DIRECT_MESSAGES",
    "GUILD_MEMBERS",
    "GUILD_MESSAGE_REACTIONS",
];
const client = new Discord.Client({
    intents: intents,
});
context.client = client;

client.once("ready", async () => {
    log("🤖 Bot started as", chalk.blue(client.user?.tag), " 🚀");
});

client.on("messageCreate", handleMessageCreate);
client.on("interactionCreate", handleInteractionCreate);

client.on("guildMemberAdd", handleGuildMemberCreate);
client.on("guildMemberRemove", handleGuildMemberRemove);

client.on("messageReactionAdd", handleMessageReactionAdd);
client.on("messageReactionRemove", handleMessageReactionRemove);

initDB().then(() => {
    client.login(process.env.BOT_TOKEN);
});
