import { Client } from "discord.js";

export const context: IContext = {
    client: {} as Client,
};

interface IContext {
    client: Client<true>;
}
