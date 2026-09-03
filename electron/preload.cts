import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('sportsTracker', {
    getAppInfo: () => ipcRenderer.invoke('app:get-info'),

    scoreboards: {
        getNfl: () => ipcRenderer.invoke('scoreboard:get-nfl'),
    }
});