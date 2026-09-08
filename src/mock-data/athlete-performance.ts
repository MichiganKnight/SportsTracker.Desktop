import type { AthleteGameLogEntryViewModel, AthletePerformanceViewModel, AthleteStatColumnViewModel, AthleteStatsCategoryViewModel } from "../../shared/view-models/athlete-performance.ts";
import { League, LeagueConfiguration, Sport } from "../../shared/models/league.ts";
import type { AthleteDetailsViewModel } from "../../shared/view-models/athlete-details.ts";

interface StatTemplate {
    columns: AthleteStatColumnViewModel[]
    current: string[]
    previous: string[]
    totals: string[]
    home: string[]
    away: string[]
    wins: string[]
    losses: string[]
    gameValues: string[][]
}

interface CategoryTemplate extends StatTemplate {
    id: string
    name: string
}

function column(key: string, label: string, description: string): AthleteStatColumnViewModel {
    return {
        key,
        label,
        description
    }
}

const football: CategoryTemplate = {
    id: 'passing',
    name: 'Passing',
    columns: [
        column('cmp', 'CMP', 'Completions'),
        column('att', 'ATT', 'Attempts'),
        column('yds', 'YDS', 'Passing Yards'),
        column('td', 'TD', 'Touchdowns'),
        column('int', 'INT', 'Interceptions'),
    ],
    current: ['312', '481', '3,541', '26', '9'],
    previous: ['284', '447', '3,218', '22', '11'],
    totals: ['596', '928', '6,759', '48', '20'],
    home: ['171', '258', '1,942', '15', '4'],
    away: ['141', '223', '1,599', '11', '5'],
    wins: ['198', '292', '2,284', '18', '3'],
    losses: ['114', '189', '1,257', '8', '6'],
    gameValues: [
        ['24', '35', '287', '3', '0'],
        ['21', '34', '251', '2', '1'],
        ['27', '41', '318', '2', '1'],
        ['19', '31', '226', '1', '2'],
    ],
}

const basketball: CategoryTemplate = {
    id: 'general',
    name: 'General',
    columns: [
        column('gp', 'GP', 'Games Played'),
        column('min', 'MIN', 'Minutes Per Game'),
        column('pts', 'PTS', 'Points Per Game'),
        column('reb', 'REB', 'Rebounds Per Game'),
        column('ast', 'AST', 'Assists Per Game'),
    ],
    current: ['72', '35.8', '24.8', '7.2', '6.4'],
    previous: ['70', '34.9', '23.6', '6.8', '5.9'],
    totals: ['142', '35.4', '24.2', '7.0', '6.2'],
    home: ['36', '36.1', '26.2', '7.5', '6.8'],
    away: ['36', '35.5', '23.4', '6.9', '6.0'],
    wins: ['44', '35.2', '27.1', '7.7', '6.9'],
    losses: ['28', '36.7', '21.2', '6.4', '5.6'],
    gameValues: [
        ['1', '37', '31', '8', '7'],
        ['1', '35', '26', '6', '9'],
        ['1', '39', '34', '10', '5'],
        ['1', '33', '19', '5', '6'],
    ],
}

const baseball: CategoryTemplate = {
    id: 'batting',
    name: 'Batting',
    columns: [
        column('gp', 'GP', 'Games Played'),
        column('ab', 'AB', 'At Bats'),
        column('hits', 'H', 'Hits'),
        column('hr', 'HR', 'Home Runs'),
        column('rbi', 'RBI', 'Runs Batted In'),
        column('avg', 'AVG', 'Batting Average'),
    ],
    current: ['151', '572', '162', '24', '79', '.283'],
    previous: ['145', '551', '151', '21', '74', '.274'],
    totals: ['296', '1,123', '313', '45', '153', '.279'],
    home: ['76', '286', '85', '15', '46', '.297'],
    away: ['75', '286', '77', '9', '33', '.269'],
    wins: ['84', '311', '101', '19', '61', '.325'],
    losses: ['67', '261', '61', '5', '18', '.234'],
    gameValues: [
        ['1', '4', '2', '1', '3', '.500'],
        ['1', '5', '2', '0', '1', '.400'],
        ['1', '4', '1', '0', '0', '.250'],
        ['1', '3', '0', '0', '0', '.000'],
    ],
}

const hockey: CategoryTemplate = {
    id: 'skating',
    name: 'Skating',
    columns: [
        column('gp', 'GP', 'Games Played'),
        column('goals', 'G', 'Goals'),
        column('assists', 'A', 'Assists'),
        column('points', 'PTS', 'Points'),
        column('plusMinus', '+/-', 'Plus/Minus'),
    ],
    current: ['78', '31', '48', '79', '+11'],
    previous: ['76', '27', '43', '70', '+4'],
    totals: ['154', '58', '91', '149', '+15'],
    home: ['39', '18', '27', '45', '+9'],
    away: ['39', '13', '21', '34', '+2'],
    wins: ['42', '24', '36', '60', '+18'],
    losses: ['36', '7', '12', '19', '-7'],
    gameValues: [
        ['1', '2', '1', '3', '+2'],
        ['1', '1', '2', '3', '+1'],
        ['1', '0', '2', '2', '0'],
        ['1', '1', '0', '1', '-1'],
    ],
}

export function getAthletePerformanceMock(athlete: AthleteDetailsViewModel): AthletePerformanceViewModel {
    const sport = LeagueConfiguration.get(athlete.league).sport

    const primary = getTemplate(sport)

    const stats = [
        createStatsCategory(primary, athlete.teamAbbreviation ?? athlete.league),
        createAdvancedCategory(sport, athlete.teamAbbreviation ?? athlete.league),
    ]

    return {
        stats,

        splits: [
            {
                id: 'location',
                displayName: 'Location',
                columns: primary.columns,
                rows: [
                    {
                        name: 'Home',
                        values: mapValues(
                            primary.columns,
                            primary.home,
                        ),
                    },
                    {
                        name: 'Away',
                        values: mapValues(
                            primary.columns,
                            primary.away,
                        ),
                    },
                ],
            },
            {
                id: 'result',
                displayName: 'Game Result',
                columns: primary.columns,
                rows: [
                    {
                        name: 'Wins',
                        values: mapValues(
                            primary.columns,
                            primary.wins,
                        ),
                    },
                    {
                        name: 'Losses',
                        values: mapValues(
                            primary.columns,
                            primary.losses,
                        ),
                    },
                ],
            },
        ],

        gameLog: {
            season: '2026',
            columns: primary.columns,
            games: createGameLog(
                athlete.league,
                primary,
            ),
            totals: mapValues(
                primary.columns,
                primary.current,
            ),
        }
    }
}

function getTemplate(sport: Sport): CategoryTemplate {
    switch (sport) {
        case Sport.Football:
            return football

        case Sport.Basketball:
            return basketball

        case Sport.Baseball:
            return baseball

        case Sport.Hockey:
            return hockey

        case Sport.Golf:
            return {
                ...hockey,
                id: 'golf',
                name: 'Golf',
            }
    }
}

function createStatsCategory(template: CategoryTemplate, team: string): AthleteStatsCategoryViewModel {
    return {
        id: template.id,
        displayName: template.name,
        columns: template.columns,
        rows: [
            {
                season: '2026',
                teamAbbreviation: team,
                values: mapValues(
                    template.columns,
                    template.current,
                ),
            },
            {
                season: '2025',
                teamAbbreviation: team,
                values: mapValues(
                    template.columns,
                    template.previous,
                ),
            },
        ],
        totals: mapValues(
            template.columns,
            template.totals,
        ),
    }
}

function createAdvancedCategory(sport: Sport, team: string): AthleteStatsCategoryViewModel {
    const templates = {
        [Sport.Football]: {
            name: 'Advanced Passing',
            columns: [
                column('pct', 'CMP%', 'Completion Percentage'),
                column('ypa', 'YPA', 'Yards Per Attempt'),
                column('rating', 'RTG', 'Passer Rating'),
            ],
            current: ['64.8', '7.4', '92.6'],
            previous: ['63.5', '7.2', '88.9'],
            totals: ['64.2', '7.3', '90.8'],
        },
        [Sport.Basketball]: {
            name: 'Shooting',
            columns: [
                column('fg', 'FG%', 'Field Goal Percentage'),
                column('three', '3P%', 'Three Point Percentage'),
                column('ft', 'FT%', 'Free Throw Percentage'),
            ],
            current: ['48.1', '38.4', '86.2'],
            previous: ['47.3', '37.1', '84.8'],
            totals: ['47.7', '37.8', '85.5'],
        },
        [Sport.Baseball]: {
            name: 'Advanced Batting',
            columns: [
                column('obp', 'OBP', 'On-Base Percentage'),
                column('slg', 'SLG', 'Slugging Percentage'),
                column('ops', 'OPS', 'On-Base Plus Slugging'),
            ],
            current: ['.367', '.464', '.831'],
            previous: ['.351', '.442', '.793'],
            totals: ['.359', '.453', '.812'],
        },
        [Sport.Hockey]: {
            name: 'Additional Skating',
            columns: [
                column('shots', 'SOG', 'Shots on Goal'),
                column('pim', 'PIM', 'Penalty Minutes'),
                column('toi', 'TOI', 'Time on Ice'),
            ],
            current: ['284', '42', '20:18'],
            previous: ['261', '38', '19:47'],
            totals: ['545', '80', '20:03'],
        },
        [Sport.Golf]: {
            name: 'Golf',
            columns: [
                column('events', 'EVT', 'Events'),
            ],
            current: ['18'],
            previous: ['20'],
            totals: ['38'],
        },
    } as const

    const template = templates[sport]

    return {
        id: 'advanced',
        displayName: template.name,
        columns: [...template.columns],
        rows: [
            {
                season: '2026',
                teamAbbreviation: team,
                values: mapValues(
                    [...template.columns],
                    [...template.current],
                ),
            },
            {
                season: '2025',
                teamAbbreviation: team,
                values: mapValues(
                    [...template.columns],
                    [...template.previous],
                ),
            },
        ],
        totals: mapValues(
            [...template.columns],
            [...template.totals],
        ),
    }
}

function mapValues(columns: AthleteStatColumnViewModel[], values: string[]): Record<string, string> {
    return Object.fromEntries(
        columns.map((item, index) => [
            item.key,
            values[index] ?? '—',
        ]),
    )
}

function createGameLog(league: League, template: StatTemplate): AthleteGameLogEntryViewModel[] {
    const opponents = {
        [League.NFL]: ['GB', 'DET', 'MIN', 'DAL'],
        [League.CFB]: ['OSU', 'MICH', 'PSU', 'WIS'],
        [League.NBA]: ['BOS', 'MIL', 'CLE', 'NYK'],
        [League.CBB]: ['UNC', 'UVA', 'MIA', 'SYR'],
        [League.MLB]: ['STL', 'MIL', 'CIN', 'PIT'],
        [League.NHL]: ['DET', 'STL', 'MIN', 'COL'],
        [League.PGA]: ['PGA', 'PGA', 'PGA', 'PGA'],
    }[league]

    return template.gameValues.map((values, index) => ({
        id: `game-log-${index}`,
        date: formatRelativeDate(-(index * 3 + 1)),
        atVs: index % 2 === 0 ? 'vs' : '@',
        opponentAbbreviation: opponents[index] ?? 'TBD',
        result: index === 3 ? 'L' : 'W',
        score: index === 3 ? '20 - 24' : '27 - 21',
        values: mapValues(template.columns, values)
    }))
}

function formatRelativeDate(dayOffset: number): string {
    const date = new Date()

    date.setDate(date.getDate() + dayOffset)

    return new Intl.DateTimeFormat(undefined, {
        month: 'short',
        day: 'numeric'
    }).format(date)
}