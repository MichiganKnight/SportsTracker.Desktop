import { app, BrowserWindow, ipcMain,  } from 'electron';
import { dirname, join } from 'node:path';
import { fileURLToPath } from "node:url";
import Menu = Electron.Menu;

const currentDirectory = dirname(fileURLToPath(import.meta.url));
const developmentUrl = 'http://localhost:5173';

function createWindow() {
    const windowIconPath = app.isPackaged
        ? join(app.getAppPath(), 'dist', 'favicon.ico')
        : join(app.getAppPath(), 'public', 'favicon.ico')

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

app.whenReady().then(() => {
    Menu.setApplicationMenu(null);

    ipcMain.handle('app:get-info', () => {
        return {
            version: app.getVersion(),
        }
    })

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