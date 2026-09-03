import type { Scoreboard } from "../../shared/models/scoreboard.js";

interface AppInfo {
    name: string;
    version: string;
    platform: string;
}

interface SportsTrackerDesktopApi {
    getAppInfo: () => Promise<AppInfo>

    scoreboards: {
        getNfl: () => Promise<Scoreboard>
    }
}

declare global {
    interface Window {
        sportsTracker?: SportsTrackerDesktopApi;
    }
}

export {}