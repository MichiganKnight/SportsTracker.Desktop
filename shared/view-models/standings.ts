export type StandingsView = 'overall' | 'conference' | 'league' | 'division'

export interface StandingsTeamViewModel {
    id: string
    name: string
    abbreviation: string
    wins: number
    losses: number
    ties?: number
    pointsFor: number
    pointsAgainst: number
    winPercentage: string
    gamesBack?: string
    differential: number
    streak: string
}

export interface StandingsGroupViewModel {
    name: string
    abbreviation?: string
    teams: StandingsTeamViewModel[]
}

export interface StandingsPageViewModel {
    season: string
    selectedView: StandingsView
    availableViews: StandingsView[]
    showTies: boolean
    showGamesBack: boolean
    groups: StandingsGroupViewModel[]
}