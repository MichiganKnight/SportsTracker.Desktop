import type { GameCardViewModel } from "./game-card.ts";

export interface GameLineScoreViewModel {
    teamAbbreviation: string
    periods: string[]
    total: string
}

export interface GameInfoItemViewModel {
    label: string
    value: string
}

export interface FeaturedAthleteViewModel {
    id: string
    name: string
    teamAbbreviation: string
    description: string
    value: string
}

export interface BoxScoreColumnViewModel {
    key: string
    label: string
}

export interface BoxScorePlayerViewModel {
    id: string
    name: string
    position: string
    values: Record<string, string>
}

export interface BoxScoreTeamViewModel {
    teamId: string
    teamName: string
    abbreviation: string
    columns: BoxScoreColumnViewModel[]
    players: BoxScorePlayerViewModel[]
    totals: Record<string, string>
}

export interface GamePlayViewModel {
    id: string
    period: string
    clock: string
    situation?: string
    text: string
    awayScore: string
    homeScore: string
    teamColor?: string
    isScoringPlay: boolean
}

export interface FootballSituationViewModel {
    type: 'football'
    fieldPosition: number
    firstDownPosition: number
    downDistance: string
    possession: string
}

export interface BaseballSituationViewModel {
    type: 'baseball'
    firstOccupied: boolean
    secondOccupied: boolean
    thirdOccupied: boolean
    balls: number
    strikes: number
    outs: number
}

export type GameSituationViewModel = FootballSituationViewModel | BaseballSituationViewModel

export interface GameDetailsViewModel {
    game: GameCardViewModel
    venue: string
    broadcast: string
    attendance: string
    headline: string
    summary: string
    lineScoreHeadings: string[]
    lineScores: GameLineScoreViewModel[]
    information: GameInfoItemViewModel[]
    featuredAthletes: FeaturedAthleteViewModel[]
    boxScoreTeams: BoxScoreTeamViewModel[]
    plays: GamePlayViewModel[]
    situation?: GameSituationViewModel
}