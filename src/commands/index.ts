import { ICommandList } from "types/commands";
import * as help from "./help";
import * as reactionRole from "./reactionRole";
import { modCommands } from "./moderation/index";

export default {
    help,
    reactionRole,
    ...modCommands,
} as ICommandList;
