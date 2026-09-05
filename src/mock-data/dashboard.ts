import type { DashboardOverviewViewModel } from "../../shared/view-models/dashboard-overview.ts";
import { LeagueConfiguration } from "../../shared/models/league.ts";

export const dashboardOverviewMock: DashboardOverviewViewModel = {
    liveEvents: 3,

    leagues: LeagueConfiguration.getAll().map((league) => {
        const configuration = LeagueConfiguration.get(league)

        return {
            league,
            leagueName: configuration.displayName,
            icon: configuration.icon,
        }
    })
}