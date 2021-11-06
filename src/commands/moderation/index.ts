import { ICommandList } from "types/commands";

import * as warn from "./warn";
import * as warnlist from "./warnlist";
import * as clear from "./clear";
import * as kick from "./kick";
import * as ban from "./ban";

export const modCommands = {
    warn,
    warnlist,
    clear,
    kick,
    ban,
} as ICommandList;
