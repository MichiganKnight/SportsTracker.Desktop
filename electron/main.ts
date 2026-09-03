import { app, BrowserWindow, ipcMain } from 'electron';
import { dirname, join } from 'node:path';
import { fileURLToPath } from "node:url";
import { getNflScoreboard } from "./services/scoreboard-service.js";

const currentDirectory = dirname(fileURLToPath(import.meta.url));
const developmentUrl = 'http://localhost:5173';

function createWindow() {
    const windowIconPath = app.isPackaged
        ? join(app.getAppPath(), 'dist', 'favicon.ico')
        : join(app.getAppPath(), 'public', 'favicon.ico')

    const mainWindow = new BrowserWindow({
        title: 'SportsTracker',
        icon: windowIconPath,
        width: 1440,
        height: 900,
        minWidth: 1000,
        minHeight: 650,
        backgroundColor: '#10141c',
        webPreferences: {
            preload: join(currentDirectory, 'preload.cjs'),
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: true
        }
    });

    if (app.isPackaged) {
        const rendererPath = join(app.getAppPath(), 'dist', 'index.html');

        void mainWindow.loadFile(rendererPath);

        return;
    }

    void mainWindow.loadURL(developmentUrl);
}

app.whenReady().then(() => {
    ipcMain.handle('app:get-info', () => ({
        name: app.getName(),
        version: app.getVersion(),
        platform: process.platform,
    }));

    ipcMain.handle('scoreboard:get-nfl', () => getNflScoreboard());

    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});