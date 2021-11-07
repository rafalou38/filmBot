import { ICommandList } from "types/commands";
import * as help from "./help";
import * as reactionRole from "./reactionRole";
import * as film from "./film";
import { modCommands } from "./moderation/index";

export default {
    help,
    film,
    reactionRole,
    ...modCommands,
} as ICommandList;
