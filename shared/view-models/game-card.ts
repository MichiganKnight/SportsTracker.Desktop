import type { League } from "../models/league.ts";

export type GameCardStatus = 'scheduled' | 'live' | 'final'

export interface GameCardTeamViewModel {
    id: string
    name: string
    abbreviation: string
    record?: string
    score?: string
}

export interface GameCardViewModel {
    id: string
    league: League
    status: GameCardStatus
    statusText: string
    awayTeam: GameCardTeamViewModel
    homeTeam: GameCardTeamViewModel
}