interface AppInfo {
    name: string;
    version: string;
    platform: string;
}

interface SportsTrackerDesktopApi {
    getAppInfo: () => Promise<AppInfo>;
}

declare global {
    interface Window {
        sportsTracker?: SportsTrackerDesktopApi;
    }
}

export {}