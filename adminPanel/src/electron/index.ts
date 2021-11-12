import { config } from "dotenv";
config();

import electron from "electron";
import { dbLoad } from "./database/initialize";
const { app, BrowserWindow } = electron;

import "./ipc";

let mainWindow;

app.on("ready", async () => {
    mainWindow = new BrowserWindow({
        width: 400,
        height: 700,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    //hide toolbar
    mainWindow.setMenu(null);

    mainWindow.setTitle("Panel");
    mainWindow.setIcon("public/favicon.png");
    await dbLoad;
    mainWindow.loadFile("../public/index.html");
    // mainWindow.loadURL(`http://localhost:5000/`);
    if (!app.isPackaged) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.on("closed", () => {
        mainWindow = null;
        app.exit();
    });
});
