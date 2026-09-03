export const leagueConfigurations = [
    {
        id: 'nfl',
        sport: 'football',
        espnLeague: 'nfl',
        displayName: 'NFL',
        shortName: 'NFL',
        icon: '🏈',
        eventType: 'team',
    },
    {
        id: 'college-football',
        sport: 'football',
        espnLeague: 'college-football',
        displayName: 'College Football',
        shortName: 'CFB',
        icon: '🎓',
        eventType: 'team',
    },
    {
        id: 'nba',
        sport: 'basketball',
        espnLeague: 'nba',
        displayName: 'NBA',
        shortName: 'NBA',
        icon: '🏀',
        eventType: 'team',
    },
    {
        id: 'mens-college-basketball',
        sport: 'basketball',
        espnLeague: 'mens-college-basketball',
        displayName: 'College Basketball',
        shortName: 'CBB',
        icon: '🎓',
        eventType: 'team',
    },
    {
        id: 'mlb',
        sport: 'baseball',
        espnLeague: 'mlb',
        displayName: 'MLB',
        shortName: 'MLB',
        icon: '⚾',
        eventType: 'team',
    },
    {
        id: 'nhl',
        sport: 'hockey',
        espnLeague: 'nhl',
        displayName: 'NHL',
        shortName: 'NHL',
        icon: '🏒',
        eventType: 'team',
    },
    {
        id: 'pga',
        sport: 'golf',
        espnLeague: 'pga',
        displayName: 'PGA Tour',
        shortName: 'PGA',
        icon: '⛳',
        eventType: 'golf',
    },
] as const

export type LeagueConfiguration =
    (typeof leagueConfigurations)[number]

export type LeagueId = LeagueConfiguration['id']

export function isLeagueId(value: unknown): value is LeagueId {
    return (
        typeof value === 'string' &&
        leagueConfigurations.some((league) => league.id === value)
    )
}

export function getLeagueConfiguration(
    leagueId: LeagueId,
): LeagueConfiguration {
    const configuration = leagueConfigurations.find(
        (league) => league.id === leagueId,
    )

    if (!configuration) {
        throw new Error(`Unsupported league: ${leagueId}`)
    }

    return configuration
}