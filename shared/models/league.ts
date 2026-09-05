export const Sport = {
    Football: 'Football',
    Basketball: 'Basketball',
    Baseball: 'Baseball',
    Hockey: 'Hockey',
    Golf: 'Golf',
} as const;

export const League = {
    NFL: "NFL",
    CFB: "CFB",
    NBA: "NBA",
    CBB: "CBB",
    MLB: "MLB",
    NHL: "NHL",
    PGA: "PGA"
} as const;

export type League = typeof League[keyof typeof League];
export type Sport = typeof Sport[keyof typeof Sport];

export interface LeagueInfo {
    league: League;
    sport: Sport;
    espnSport: string;
    espnLeague: string;
    displayName: string;
    icon?: string;
    logo?: string;
    darkLogo?: string;
    displayOrder?: number;
}

export const Leagues: Record<League, LeagueInfo> = {
    [League.NFL]: {
        league: League.NFL,
        sport: Sport.Football,
        espnSport: "football",
        espnLeague: "nfl",
        displayName: "NFL",
        icon: "🏈"
    },
    [League.CFB]: {
        league: League.CFB,
        sport: Sport.Football,
        espnSport: "football",
        espnLeague: "college-football",
        displayName: "College Football",
        icon: "🎓"
    },
    [League.NBA]: {
        league: League.NBA,
        sport: Sport.Basketball,
        espnSport: "basketball",
        espnLeague: "nba",
        displayName: "NBA",
        icon: "🏀"
    },
    [League.CBB]: {
        league: League.CBB,
        sport: Sport.Basketball,
        espnSport: "basketball",
        espnLeague: "mens-college-basketball",
        displayName: "College Basketball",
        icon: "🎓"
    },
    [League.MLB]: {
        league: League.MLB,
        sport: Sport.Baseball,
        espnSport: "baseball",
        espnLeague: "mlb",
        displayName: "MLB",
        icon: "⚾"
    },
    [League.NHL]: {
        league: League.NHL,
        sport: Sport.Hockey,
        espnSport: "hockey",
        espnLeague: "nhl",
        displayName: "NHL",
        icon: "🏒"
    },
    [League.PGA]: {
        league: League.PGA,
        sport: Sport.Golf,
        espnSport: "golf",
        espnLeague: "pga",
        displayName: "PGA Tour",
        icon: "⛳"
    }
};

export const LeagueConfiguration = {
    getAll: (): League[] => Object.keys(Leagues) as League[],

    get: (league: League): LeagueInfo => Leagues[league],
}