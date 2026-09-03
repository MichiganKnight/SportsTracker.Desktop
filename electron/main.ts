import { app, BrowserWindow } from 'electron';
import { join } from 'node:path';

const developmentUrl = 'http://localhost:5173';

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1440,
        height: 900,
        minWidth: 1000,
        minHeight: 650,
        backgroundColor: '#10141c',
        webPreferences: {
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