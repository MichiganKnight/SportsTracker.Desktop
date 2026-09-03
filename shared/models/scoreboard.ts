export type LeagueId =
    | 'nfl'
    | 'college-football'
    | 'nba'
    | 'mens-college-basketball'
    | 'mlb'
    | 'nhl'
    | 'pga'

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

export interface GameSummary {
    id: string
    league: LeagueId
    name: string
    startTime: string
    state: GameState
    statusText: string
    homeTeam: TeamSummary
    awayTeam: TeamSummary
}

export interface Scoreboard {
    league: LeagueId
    leagueName: string
    leagueLogoUrl?: string
    games: GameSummary[]
    updatedAt: string
}