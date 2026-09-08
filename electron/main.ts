import { app, BrowserWindow, ipcMain, Menu } from 'electron';
import { dirname, join } from 'node:path';
import { fileURLToPath } from "node:url";
import { getAllScoreboards, getScoreboard } from "./services/espn-scoreboard-service.js";
import { League, LeagueConfiguration } from "../shared/models/league.js";

const currentDirectory = dirname(fileURLToPath(import.meta.url));
const developmentUrl = 'http://localhost:5173';

function createWindow() {
    const windowIconPath = app.isPackaged ? join(app.getAppPath(), 'dist', 'favicon.ico') : join(app.getAppPath(), 'public', 'favicon.ico')

    const mainWindow = new BrowserWindow({
        title: 'SportsTracker',
        icon: windowIconPath,
        width: 1280,
        height: 700,
        minWidth: 1000,
        minHeight: 650,
        show: false,
        webPreferences: {
            preload: join(currentDirectory, 'preload.cjs'),
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: true
        }
    });

    mainWindow.maximize();
    mainWindow.show();

    if (app.isPackaged) {
        const rendererPath = join(app.getAppPath(), 'dist', 'index.html');

        void mainWindow.loadFile(rendererPath);

        return;
    }

    void mainWindow.loadURL(developmentUrl);
}

function registerIpcHandlers() {
    ipcMain.handle('app:get-info', () => {
        return {
            name: app.getName(),
            version: app.getVersion(),
            platform: process.platform
        }
    })

    ipcMain.handle('scoreboard:get', async (_event, leagueValue: unknown, requestedDateValue?: unknown) => {
        const league = resolveLeague(leagueValue)
        const requestedDate = resolveRequestedDate(requestedDateValue)

        return getScoreboard(league, requestedDate)
    })

    ipcMain.handle('scoreboard:get-all', async (_event, requestedDateValue?: unknown) => {
        const requestedDate = resolveRequestedDate(requestedDateValue)

        return getAllScoreboards(requestedDate)
    })
}

function resolveLeague(value: unknown): League {
    if (typeof value !== 'string') {
        throw new Error('League is Required')
    }

    const configuration = LeagueConfiguration.getFromRoute(value)

    if (!configuration) {
        throw new Error(`Unsupported League: ${value}`)
    }

    return configuration.league
}

function resolveRequestedDate(value: unknown): string | undefined {
    if (value === undefined || value === '') {
        return undefined
    }

    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        throw new Error('Requested Date Must Use YYYY-MM-DD')
    }

    return value
}

app.whenReady().then(() => {
    Menu.setApplicationMenu(null);

    registerIpcHandlers()
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});