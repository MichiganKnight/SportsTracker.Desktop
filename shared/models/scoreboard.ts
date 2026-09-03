import type { LeagueId } from './league'

export type GameState =
    | 'scheduled'
    | 'in-progress'
    | 'halftime'
    | 'final'
    | 'postponed'
    | 'delayed'
    | 'cancelled'

export interface TeamSummary {
    id: string
    displayName: string
    abbreviation: string
    logoUrl?: string
    score: string
    record?: string
}

interface BaseEventSummary {
    id: string
    league: LeagueId
    name: string
    startTime: string
    state: GameState
    statusText: string
}

export interface TeamGameSummary extends BaseEventSummary {
    eventType: 'team'
    homeTeam: TeamSummary
    awayTeam: TeamSummary
}

export interface GolfLeaderboardEntry {
    athleteId: string
    name: string
    shortName: string
    position?: number
    scoreToPar: string
    country?: string
    flagUrl?: string
}

export interface GolfEventSummary extends BaseEventSummary {
    eventType: 'golf'
    endTime?: string
    leaders: GolfLeaderboardEntry[]
}

export type GameSummary = TeamGameSummary | GolfEventSummary

export interface Scoreboard {
    league: LeagueId
    leagueName: string
    leagueLogoUrl?: string
    games: GameSummary[]
    updatedAt: string
}