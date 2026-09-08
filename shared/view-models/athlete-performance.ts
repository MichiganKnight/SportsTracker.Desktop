export interface AthleteStatColumnViewModel {
    key: string
    label: string
    description: string
}

export interface AthleteStatsRowViewModel {
    season: string
    teamAbbreviation: string
    values: Record<string, string>
}

export interface AthleteStatsCategoryViewModel {
    id: string
    displayName: string
    columns: AthleteStatColumnViewModel[]
    rows: AthleteStatsRowViewModel[]
    totals: Record<string, string>
}

export interface AthleteSplitRowViewModel {
    name: string
    values: Record<string, string>
}

export interface AthleteSplitCategoryViewModel {
    id: string
    displayName: string
    columns: AthleteStatColumnViewModel[]
    rows: AthleteSplitRowViewModel[]
}

export interface AthleteGameLogEntryViewModel {
    id: string
    date: string
    atVs: '@' | 'vs'
    opponentAbbreviation: string
    result: 'W' | 'L'
    score: string
    values: Record<string, string>
}

export interface AthleteGameLogViewModel {
    season: string
    columns: AthleteStatColumnViewModel[]
    games: AthleteGameLogEntryViewModel[]
    totals: Record<string, string>
}

export interface AthletePerformanceViewModel {
    stats: AthleteStatsCategoryViewModel[]
    splits: AthleteSplitCategoryViewModel[]
    gameLog: AthleteGameLogViewModel
}