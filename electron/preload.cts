import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('sportsTracker', {
    getAppInfo: () => ipcRenderer.invoke('app:get-info'),

    scoreboards: {
        get: (leagueId: string) =>
            ipcRenderer.invoke('scoreboard:get', leagueId),
    },
});