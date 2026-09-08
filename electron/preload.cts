import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('sportsTracker', {
    getAppInfo: () => ipcRenderer.invoke('app:get-info'),

    scoreboards: {
        get: (league: string, requestedDate?: string) => ipcRenderer.invoke('scoreboard:get', league, requestedDate),
        getAll: (requestedDate?: string) => ipcRenderer.invoke('scoreboard:get-all', requestedDate)
    },
});