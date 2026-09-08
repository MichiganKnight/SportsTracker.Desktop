import type { League } from '../../shared/models/league.js'
import type { LiveScoreboardViewModel } from "../../shared/view-models/live-scoreboard.ts";

interface AppInfo {
    name: string
    version: string
    platform: string
}

interface SportsTrackerDesktopApi {
    getAppInfo: () => Promise<AppInfo>

    scoreboards: {
        get: (league: League, requestedDate?: string) => Promise<LiveScoreboardViewModel>
        getAll: (requestedDate?: string) => Promise<LiveScoreboardViewModel[]>
    }
}

declare global {
    interface Window {
        sportsTracker?: SportsTrackerDesktopApi
    }
}

export {}