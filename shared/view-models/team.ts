import type { League } from "../models/league.ts";
import type { GameCardViewModel } from "./game-card.ts";

export interface TeamVenueViewModel {
    name: string
    city: string
    state: string
    indoor?: boolean
    grass?: boolean
}

export interface TeamDetailsViewModel {
    id: string
    league: League
    displayName: string
    abbreviation: string
    primaryColor: string
    secondaryColor: string
    overallRecord: string
    homeRecord: string
    awayRecord: string
    venue: TeamVenueViewModel
}

export interface RosterPlayerViewModel {
    id: string
    displayName: string
    initials: string
    jersey?: string
    positionAbbreviation: string
    age?: number
    height?: string
    weight?: string
    bats?: string
    throws?: string
    experienceYears?: number
    birthPlace?: string
}

export interface RosterGroupViewModel {
    id: string
    name: string
    players: RosterPlayerViewModel[]
}

export interface TeamPageViewModel {
    team: TeamDetailsViewModel
    roster: RosterGroupViewModel[]
    schedule: GameCardViewModel[]
}