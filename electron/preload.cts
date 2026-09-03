import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('sportsTracker', {
    getAppInfo: () => ipcRenderer.invoke('app:get-info')
});