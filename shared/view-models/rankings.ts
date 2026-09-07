export type RankingPollType = 'ap' | 'coaches' | 'cfp'

export interface RankedTeamViewModel {
    id: string
    name: string
    abbreviation: string
    conference: string
    record: string
    rank: number
    previousRank: number
    points: number
    firstPlaceVotes: number
}

export interface RankingPollViewModel {
    type: RankingPollType
    name: string
    shortName: string
    weekName: string
    updatedLabel: string
    teams: RankedTeamViewModel[]
}

export interface RankingsPageViewModel {
    season: string
    polls: RankingPollViewModel[]
}