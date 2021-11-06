import { ICommandList } from "types/commands";
import * as help from "./help";
import { modCommands } from "./moderation";

export default {
    help,
    ...modCommands,
} as ICommandList;
