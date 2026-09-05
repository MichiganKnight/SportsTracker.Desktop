import type { League } from "../models/league.ts";

export interface DashboardLeagueSummaryViewModel {
    league: League;
    leagueName: string;
    icon?: string;
}

export interface DashboardOverviewViewModel {
    liveEvents: number;
    leagues: DashboardLeagueSummaryViewModel[];
}