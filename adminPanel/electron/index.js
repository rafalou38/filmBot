"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const electron_1 = __importDefault(require("electron"));
const initialize_1 = require("./database/initialize");
const { app, BrowserWindow } = electron_1.default;
require("./ipc");
let mainWindow;
app.on("ready", () => __awaiter(void 0, void 0, void 0, function* () {
    mainWindow = new BrowserWindow({
        width: 400,
        height: 700,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    mainWindow.setTitle("Panel");
    yield initialize_1.dbLoad;
    mainWindow.loadFile("../public/index.html");
    // mainWindow.loadURL(`http://localhost:5000/`);
    mainWindow.webContents.openDevTools();
    mainWindow.on("closed", () => {
        mainWindow = null;
        app.exit();
    });
}));
