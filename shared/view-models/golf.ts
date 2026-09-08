import type { League } from "../models/league.ts";

export type GolfEventStatus = 'scheduled' | 'live' | 'final'

export interface GolfLeaderSummaryViewModel {
    athleteId: string
    position: string
    name: string
    country: string
    scoreToPar: string
    today: string
    thru: string
}

export interface GolfHoleViewModel {
    number: number
    par: number
    yardage: number
    score: number
}

export interface GolfRoundViewModel {
    round: number
    label: string
    holes: GolfHoleViewModel[]
    frontNine: number
    backNine: number
    total: number
}

export interface GolfLeaderboardEntryViewModel
    extends GolfLeaderSummaryViewModel {
    rounds: Array<number | null>
    totalStrokes: number
    scorecards: GolfRoundViewModel[]
}

export interface GolfEventViewModel {
    id: string
    league: League
    name: string
    venue: string
    location: string
    startTime: string
    endTime: string
    status: GolfEventStatus
    statusText: string
    roundText: string
    purse: string
    defendingChampion: string
    leaders: GolfLeaderboardEntryViewModel[]
}