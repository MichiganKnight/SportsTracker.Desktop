import type { LeaderCategoryViewModel, LeagueLeadersViewModel } from "../../shared/view-models/league-leaders.ts";
import { League, LeagueConfiguration, Sport, type League as LeagueType, type Sport as SportType } from "../../shared/models/league.ts";

interface PlayerSeed {
    id: string
    name: string
    teamId?: string
    teamName?: string
    teamAbbreviation?: string
}

interface CategorySeed {
    id: string
    name: string
    abbreviation: string
    values: string[]
}

interface SectionSeed {
    id: string
    title: string
    categories: CategorySeed[]
}

const playersByLeague: Record<LeagueType, PlayerSeed[]> = {
    [League.NFL]: [
        {
            id: 'josh-allen',
            name: 'Josh Allen',
            teamId: 'buf',
            teamName: 'Buffalo Bills',
            teamAbbreviation: 'BUF',
        },
        {
            id: 'lamar-jackson',
            name: 'Lamar Jackson',
            teamId: 'bal',
            teamName: 'Baltimore Ravens',
            teamAbbreviation: 'BAL',
        },
        {
            id: 'saquon-barkley',
            name: 'Saquon Barkley',
            teamId: 'phi',
            teamName: 'Philadelphia Eagles',
            teamAbbreviation: 'PHI',
        },
    ],

    [League.CFB]: [
        {
            id: 'dillon-gabriel',
            name: 'Dillon Gabriel',
            teamId: 'oregon',
            teamName: 'Oregon Ducks',
            teamAbbreviation: 'ORE',
        },
        {
            id: 'will-howard',
            name: 'Will Howard',
            teamId: 'osu',
            teamName: 'Ohio State Buckeyes',
            teamAbbreviation: 'OSU',
        },
        {
            id: 'quinn-ewers',
            name: 'Quinn Ewers',
            teamId: 'texas',
            teamName: 'Texas Longhorns',
            teamAbbreviation: 'TEX',
        },
    ],

    [League.NBA]: [
        {
            id: 'shai-gilgeous-alexander',
            name: 'Shai Gilgeous-Alexander',
            teamId: 'okc',
            teamName: 'Oklahoma City Thunder',
            teamAbbreviation: 'OKC',
        },
        {
            id: 'nikola-jokic',
            name: 'Nikola Jokić',
            teamId: 'den',
            teamName: 'Denver Nuggets',
            teamAbbreviation: 'DEN',
        },
        {
            id: 'jayson-tatum',
            name: 'Jayson Tatum',
            teamId: 'bos',
            teamName: 'Boston Celtics',
            teamAbbreviation: 'BOS',
        },
    ],

    [League.CBB]: [
        {
            id: 'cooper-flagg',
            name: 'Cooper Flagg',
            teamId: 'duke',
            teamName: 'Duke Blue Devils',
            teamAbbreviation: 'DUKE',
        },
        {
            id: 'johni-broome',
            name: 'Johni Broome',
            teamId: 'auburn',
            teamName: 'Auburn Tigers',
            teamAbbreviation: 'AUB',
        },
        {
            id: 'lj-cryer',
            name: 'L.J. Cryer',
            teamId: 'houston',
            teamName: 'Houston Cougars',
            teamAbbreviation: 'HOU',
        },
    ],

    [League.MLB]: [
        {
            id: 'aaron-judge',
            name: 'Aaron Judge',
            teamId: 'nyy',
            teamName: 'New York Yankees',
            teamAbbreviation: 'NYY',
        },
        {
            id: 'shohei-ohtani',
            name: 'Shohei Ohtani',
            teamId: 'lad',
            teamName: 'Los Angeles Dodgers',
            teamAbbreviation: 'LAD',
        },
        {
            id: 'bobby-witt-jr',
            name: 'Bobby Witt Jr.',
            teamId: 'kc',
            teamName: 'Kansas City Royals',
            teamAbbreviation: 'KC',
        },
    ],

    [League.NHL]: [
        {
            id: 'nikita-kucherov',
            name: 'Nikita Kucherov',
            teamId: 'tbl',
            teamName: 'Tampa Bay Lightning',
            teamAbbreviation: 'TBL',
        },
        {
            id: 'nathan-mackinnon',
            name: 'Nathan MacKinnon',
            teamId: 'col',
            teamName: 'Colorado Avalanche',
            teamAbbreviation: 'COL',
        },
        {
            id: 'connor-mcdavid',
            name: 'Connor McDavid',
            teamId: 'edm',
            teamName: 'Edmonton Oilers',
            teamAbbreviation: 'EDM',
        },
    ],

    [League.PGA]: [
        {
            id: 'scottie-scheffler',
            name: 'Scottie Scheffler',
            teamName: 'PGA Tour',
            teamAbbreviation: 'USA',
        },
        {
            id: 'rory-mcilroy',
            name: 'Rory McIlroy',
            teamName: 'PGA Tour',
            teamAbbreviation: 'NIR',
        },
        {
            id: 'xander-schauffele',
            name: 'Xander Schauffele',
            teamName: 'PGA Tour',
            teamAbbreviation: 'USA',
        },
    ]
}

const sectionsBySport: Record<SportType, SectionSeed[]> = {
    [Sport.Football]: [
        {
            id: 'offense',
            title: 'Offense',
            categories: [
                {
                    id: 'passing-yards',
                    name: 'Passing Yards',
                    abbreviation: 'YDS',
                    values: ['4,544', '4,172', '3,968'],
                },
                {
                    id: 'rushing-yards',
                    name: 'Rushing Yards',
                    abbreviation: 'YDS',
                    values: ['1,838', '1,624', '1,492'],
                },
                {
                    id: 'touchdowns',
                    name: 'Total Touchdowns',
                    abbreviation: 'TD',
                    values: ['41', '38', '35'],
                },
            ],
        },
        {
            id: 'defense',
            title: 'Defense',
            categories: [
                {
                    id: 'tackles',
                    name: 'Total Tackles',
                    abbreviation: 'TOT',
                    values: ['168', '154', '149'],
                },
                {
                    id: 'sacks',
                    name: 'Sacks',
                    abbreviation: 'SACK',
                    values: ['17.5', '15.0', '14.5'],
                },
                {
                    id: 'interceptions',
                    name: 'Interceptions',
                    abbreviation: 'INT',
                    values: ['7', '6', '6'],
                },
            ],
        },
    ],

    [Sport.Basketball]: [
        {
            id: 'offense',
            title: 'Offense',
            categories: [
                {
                    id: 'points',
                    name: 'Points Per Game',
                    abbreviation: 'PPG',
                    values: ['32.7', '30.1', '28.4'],
                },
                {
                    id: 'assists',
                    name: 'Assists Per Game',
                    abbreviation: 'APG',
                    values: ['11.6', '10.2', '9.8'],
                },
                {
                    id: 'field-goal-percentage',
                    name: 'Field Goal Percentage',
                    abbreviation: 'FG%',
                    values: ['61.3', '58.7', '57.9'],
                },
            ],
        },
        {
            id: 'defense',
            title: 'Defense',
            categories: [
                {
                    id: 'rebounds',
                    name: 'Rebounds Per Game',
                    abbreviation: 'RPG',
                    values: ['13.8', '12.9', '12.2'],
                },
                {
                    id: 'blocks',
                    name: 'Blocks Per Game',
                    abbreviation: 'BPG',
                    values: ['3.8', '3.2', '2.9'],
                },
                {
                    id: 'steals',
                    name: 'Steals Per Game',
                    abbreviation: 'SPG',
                    values: ['3.1', '2.8', '2.6'],
                },
            ],
        },
    ],

    [Sport.Baseball]: [
        {
            id: 'batting',
            title: 'Batting',
            categories: [
                {
                    id: 'home-runs',
                    name: 'Home Runs',
                    abbreviation: 'HR',
                    values: ['58', '54', '43'],
                },
                {
                    id: 'batting-average',
                    name: 'Batting Average',
                    abbreviation: 'AVG',
                    values: ['.332', '.324', '.319'],
                },
                {
                    id: 'runs-batted-in',
                    name: 'Runs Batted In',
                    abbreviation: 'RBI',
                    values: ['144', '132', '127'],
                },
            ],
        },
        {
            id: 'pitching',
            title: 'Pitching',
            categories: [
                {
                    id: 'wins',
                    name: 'Pitching Wins',
                    abbreviation: 'W',
                    values: ['19', '18', '17'],
                },
                {
                    id: 'era',
                    name: 'Earned Run Average',
                    abbreviation: 'ERA',
                    values: ['2.31', '2.47', '2.62'],
                },
                {
                    id: 'strikeouts',
                    name: 'Strikeouts',
                    abbreviation: 'SO',
                    values: ['248', '236', '229'],
                },
            ],
        },
    ],

    [Sport.Hockey]: [
        {
            id: 'skaters',
            title: 'Skaters',
            categories: [
                {
                    id: 'points',
                    name: 'Points',
                    abbreviation: 'PTS',
                    values: ['121', '116', '112'],
                },
                {
                    id: 'goals',
                    name: 'Goals',
                    abbreviation: 'G',
                    values: ['53', '49', '47'],
                },
                {
                    id: 'assists',
                    name: 'Assists',
                    abbreviation: 'A',
                    values: ['82', '78', '75'],
                },
            ],
        },
        {
            id: 'goaltending',
            title: 'Goaltending',
            categories: [
                {
                    id: 'wins',
                    name: 'Wins',
                    abbreviation: 'W',
                    values: ['44', '41', '39'],
                },
                {
                    id: 'save-percentage',
                    name: 'Save Percentage',
                    abbreviation: 'SV%',
                    values: ['.928', '.924', '.921'],
                },
                {
                    id: 'goals-against',
                    name: 'Goals Against Average',
                    abbreviation: 'GAA',
                    values: ['2.08', '2.19', '2.24'],
                },
            ],
        },
    ],

    [Sport.Golf]: [
        {
            id: 'tour',
            title: 'Tour',
            categories: [
                {
                    id: 'fedex-cup',
                    name: 'FedExCup Points',
                    abbreviation: 'PTS',
                    values: ['4,842', '3,976', '3,711'],
                },
                {
                    id: 'scoring-average',
                    name: 'Scoring Average',
                    abbreviation: 'AVG',
                    values: ['68.63', '69.12', '69.28'],
                },
                {
                    id: 'earnings',
                    name: 'Official Earnings',
                    abbreviation: '$',
                    values: ['$29.2M', '$21.8M', '$18.6M'],
                },
            ],
        },
    ]
}

export function getLeagueLeadersMock(league: LeagueType): LeagueLeadersViewModel {
    const configuration = LeagueConfiguration.get(league)

    const players = playersByLeague[league]
    const sections = sectionsBySport[configuration.sport]

    return {
        seasonName: '2026',
        sections: sections.map((section) => ({
            id: section.id,
            title: section.title,

            categories: section.categories.map((category): LeaderCategoryViewModel => ({
                id: category.id,
                displayName: category.name,
                abbreviation: category.abbreviation,

                leaders: players.map((player, index) => ({
                    rank: index + 1,
                    athleteId: player.id,
                    athleteName: player.name,
                    teamId: player.teamId,
                    teamName: player.teamName,
                    teamAbbreviation: player.teamAbbreviation,
                    displayValue: category.values[index] ?? '-'
                }))
            }))
        }))
    }
}