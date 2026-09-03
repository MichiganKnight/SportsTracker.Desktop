import type { LeagueId } from '../../shared/models/league.js'
import type { Scoreboard } from '../../shared/models/scoreboard.js'

interface AppInfo {
    name: string
    version: string
    platform: string
}

interface SportsTrackerDesktopApi {
    getAppInfo: () => Promise<AppInfo>

    scoreboards: {
        get: (leagueId: LeagueId) => Promise<Scoreboard>
        getAll: () => Promise<Scoreboard[]>
    }
}

declare global {
    interface Window {
        sportsTracker?: SportsTrackerDesktopApi
    }
}

export {}