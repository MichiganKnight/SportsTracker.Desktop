import type { League } from "../models/league.ts";

export interface AthleteQuickStatViewModel {
    label: string
    value: string
    rank?: string
}

export interface AthleteBioItemViewModel {
    label: string
    value: string
}

export interface AthleteDetailsViewModel {
    id: string
    league: League
    displayName: string
    initials: string
    status: string
    isActive: boolean
    jersey?: string
    position?: string
    teamId?: string
    teamName?: string
    teamAbbreviation?: string
    quickStatsTitle: string
    quickStats: AthleteQuickStatViewModel[]
    bio: AthleteBioItemViewModel[]
    overviewTitle: string
    overviewDescription: string
}