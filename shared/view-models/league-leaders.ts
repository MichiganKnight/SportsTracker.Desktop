export interface LeaderRowViewModel {
    rank: number
    athleteId: string
    athleteName: string
    teamId?: string
    teamName?: string
    teamAbbreviation?: string
    displayValue: string
}

export interface LeaderCategoryViewModel {
    id: string
    displayName: string
    abbreviation: string
    leaders: LeaderRowViewModel[]
}

export interface LeaderSectionViewModel {
    id: string
    title: string
    categories: LeaderCategoryViewModel[]
}

export interface LeagueLeadersViewModel {
    seasonName: string
    sections: LeaderSectionViewModel[]
}