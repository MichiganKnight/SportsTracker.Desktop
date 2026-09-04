import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('sportsTracker', {
    getAppInfo: () => ipcRenderer.invoke('app:get-info'),

    scoreboards: {
        get: (leagueId: string, requestedDate?: string) =>
            ipcRenderer.invoke(
                'scoreboard:get',
                leagueId,
                requestedDate,
            ),

        getAll: (requestedDate?: string) =>
            ipcRenderer.invoke(
                'scoreboard:get-all',
                requestedDate,
            ),
    },
});