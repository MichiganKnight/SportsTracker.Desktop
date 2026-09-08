import type { RosterGroupViewModel, RosterPlayerViewModel, TeamDetailsViewModel, TeamPageViewModel } from "../../shared/view-models/team.ts";
import { League, type League as LeagueType } from "../../shared/models/league.ts";
import type { GameCardStatus, GameCardViewModel } from "../../shared/view-models/game-card.ts";

interface OpponentSeed {
    id: string
    name: string
    abbreviation: string
}

export interface RosterPlayerMatch {
    team: TeamDetailsViewModel,
    player: RosterPlayerViewModel
}

const teamDetails: TeamDetailsViewModel[] = [
    {
        id: 'chi',
        league: League.NFL,
        displayName: 'Chicago Bears',
        abbreviation: 'CHI',
        primaryColor: '#0b162a',
        secondaryColor: '#c83803',
        overallRecord: '8-7',
        homeRecord: '5-3',
        awayRecord: '3-4',
        venue: {
            name: 'Soldier Field',
            city: 'Chicago',
            state: 'Illinois',
            indoor: false,
            grass: true,
        },
    },
    {
        id: 'chc',
        league: League.MLB,
        displayName: 'Chicago Cubs',
        abbreviation: 'CHC',
        primaryColor: '#0e3386',
        secondaryColor: '#cc3433',
        overallRecord: '84-78',
        homeRecord: '45-36',
        awayRecord: '39-42',
        venue: {
            name: 'Wrigley Field',
            city: 'Chicago',
            state: 'Illinois',
            indoor: false,
            grass: true,
        },
    },
    {
        id: 'chi-blackhawks',
        league: League.NHL,
        displayName: 'Chicago Blackhawks',
        abbreviation: 'CHI',
        primaryColor: '#cf0a2c',
        secondaryColor: '#000000',
        overallRecord: '28-46-8',
        homeRecord: '17-20-4',
        awayRecord: '11-26-4',
        venue: {
            name: 'United Center',
            city: 'Chicago',
            state: 'Illinois',
            indoor: true,
            grass: false,
        },
    }
]

const rosters: Record<string, RosterGroupViewModel[]> = {
    chi: [
        {
            id: 'offense',
            name: 'Offense',
            players: [
                {
                    id: 'caleb-williams',
                    displayName: 'Caleb Williams',
                    initials: 'CW',
                    jersey: '18',
                    positionAbbreviation: 'QB',
                    age: 24,
                    height: '6\' 1"',
                    weight: '214 lbs',
                    experienceYears: 2,
                    birthPlace: 'Washington, DC',
                },
                {
                    id: 'dj-moore',
                    displayName: 'DJ Moore',
                    initials: 'DM',
                    jersey: '2',
                    positionAbbreviation: 'WR',
                    age: 29,
                    height: '6\' 0"',
                    weight: '210 lbs',
                    experienceYears: 8,
                    birthPlace: 'Philadelphia, PA',
                },
            ],
        },
        {
            id: 'defense',
            name: 'Defense',
            players: [
                {
                    id: 'montez-sweat',
                    displayName: 'Montez Sweat',
                    initials: 'MS',
                    jersey: '98',
                    positionAbbreviation: 'DE',
                    age: 30,
                    height: '6\' 6"',
                    weight: '262 lbs',
                    experienceYears: 7,
                    birthPlace: 'Richmond, KY',
                },
                {
                    id: 'jaylon-johnson',
                    displayName: 'Jaylon Johnson',
                    initials: 'JJ',
                    jersey: '1',
                    positionAbbreviation: 'CB',
                    age: 27,
                    height: '6\' 0"',
                    weight: '196 lbs',
                    experienceYears: 6,
                    birthPlace: 'Fresno, CA',
                },
            ],
        },
    ],

    chc: [
        {
            id: 'position-players',
            name: 'Position Players',
            players: [
                {
                    id: 'ian-happ',
                    displayName: 'Ian Happ',
                    initials: 'IH',
                    jersey: '8',
                    positionAbbreviation: 'LF',
                    age: 32,
                    height: '6\' 0"',
                    weight: '205 lbs',
                    bats: 'S',
                    throws: 'R',
                    experienceYears: 9,
                    birthPlace: 'Pittsburgh, PA',
                },
                {
                    id: 'dansby-swanson',
                    displayName: 'Dansby Swanson',
                    initials: 'DS',
                    jersey: '7',
                    positionAbbreviation: 'SS',
                    age: 32,
                    height: '6\' 1"',
                    weight: '190 lbs',
                    bats: 'R',
                    throws: 'R',
                    experienceYears: 10,
                    birthPlace: 'Kennesaw, GA',
                },
            ],
        },
        {
            id: 'pitchers',
            name: 'Pitchers',
            players: [
                {
                    id: 'justin-steele',
                    displayName: 'Justin Steele',
                    initials: 'JS',
                    jersey: '35',
                    positionAbbreviation: 'SP',
                    age: 31,
                    height: '6\' 2"',
                    weight: '205 lbs',
                    bats: 'L',
                    throws: 'L',
                    experienceYears: 6,
                    birthPlace: 'Lucedale, MS',
                },
                {
                    id: 'shota-imanaga',
                    displayName: 'Shota Imanaga',
                    initials: 'SI',
                    jersey: '18',
                    positionAbbreviation: 'SP',
                    age: 33,
                    height: '5\' 10"',
                    weight: '175 lbs',
                    bats: 'L',
                    throws: 'L',
                    experienceYears: 3,
                    birthPlace: 'Kitakyushu, Japan',
                },
            ],
        },
    ],

    'chi-blackhawks': [
        {
            id: 'forwards',
            name: 'Forwards',
            players: [
                {
                    id: 'connor-bedard',
                    displayName: 'Connor Bedard',
                    initials: 'CB',
                    jersey: '98',
                    positionAbbreviation: 'C',
                    age: 21,
                    height: '5\' 10"',
                    weight: '185 lbs',
                    experienceYears: 3,
                    birthPlace: 'North Vancouver, BC',
                },
                {
                    id: 'nick-foligno',
                    displayName: 'Nick Foligno',
                    initials: 'NF',
                    jersey: '17',
                    positionAbbreviation: 'LW',
                    age: 38,
                    height: '6\' 0"',
                    weight: '210 lbs',
                    experienceYears: 19,
                    birthPlace: 'Buffalo, NY',
                },
            ],
        },
        {
            id: 'defense-and-goalies',
            name: 'Defense and Goalies',
            players: [
                {
                    id: 'alex-vlasic',
                    displayName: 'Alex Vlasic',
                    initials: 'AV',
                    jersey: '72',
                    positionAbbreviation: 'D',
                    age: 25,
                    height: '6\' 6"',
                    weight: '217 lbs',
                    experienceYears: 5,
                    birthPlace: 'Wilmette, IL',
                },
                {
                    id: 'petr-mrazek',
                    displayName: 'Petr Mrázek',
                    initials: 'PM',
                    jersey: '34',
                    positionAbbreviation: 'G',
                    age: 34,
                    height: '6\' 2"',
                    weight: '188 lbs',
                    experienceYears: 14,
                    birthPlace: 'Ostrava, Czechia',
                },
            ],
        },
    ]
}

const opponents: Record<string, OpponentSeed[]> = {
    chi: [
        { id: 'gb', name: 'Green Bay Packers', abbreviation: 'GB' },
        { id: 'det', name: 'Detroit Lions', abbreviation: 'DET' },
        { id: 'min', name: 'Minnesota Vikings', abbreviation: 'MIN' },
    ],

    chc: [
        { id: 'stl', name: 'St. Louis Cardinals', abbreviation: 'STL' },
        { id: 'mil', name: 'Milwaukee Brewers', abbreviation: 'MIL' },
        { id: 'cin', name: 'Cincinnati Reds', abbreviation: 'CIN' },
    ],

    'chi-blackhawks': [
        { id: 'det', name: 'Detroit Red Wings', abbreviation: 'DET' },
        { id: 'stl', name: 'St. Louis Blues', abbreviation: 'STL' },
        { id: 'min', name: 'Minnesota Wild', abbreviation: 'MIN' },
    ]
}

export function getTeamMock(league: LeagueType, teamId: string): TeamPageViewModel | undefined {
    const team = teamDetails.find((item) => item.league === league && item.id === teamId)

    if (!team) {
        return undefined
    }

    return {
        team,
        roster: rosters[team.id] ?? [],
        schedule: createSchedule(team)
    }
}

export function findRosterPlayerMock(league: LeagueType, athleteId: string): RosterPlayerMatch | undefined {
    for (const team of teamDetails) {
        if (team.league !== league) {
            continue
        }

        for (const group of rosters[team.id] ?? []) {
            const player = group.players.find((item) => item.id === athleteId)

            if (player) {
                return {
                    team,
                    player
                }
            }
        }
    }

    return undefined
}

export function findTeamScheduleGameMock(league: LeagueType, gameId: string): GameCardViewModel | undefined {
    for (const team of teamDetails) {
        if (team.league !== league) {
            continue
        }

        const game = createSchedule(team).find((item) => item.id === gameId)

        if (game) {
            return game
        }
    }

    return undefined
}

function createSchedule(team: TeamDetailsViewModel): GameCardViewModel[] {
    const teamOpponents = opponents[team.id] ?? []
    const offsets = [-7, 3, 10]
    const statuses: GameCardStatus[] = [
        'final',
        'scheduled',
        'scheduled'
    ]

    return teamOpponents.map((opponent, index) => {
        const status = statuses[index] ?? 'scheduled'
        const isHome = index % 2 === 0

        const trackedTeam = createGameTeam(team.id, team.displayName, team.abbreviation, team.overallRecord, status === 'final' ? '24' : undefined)

        const opposingTeam = createGameTeam(opponent.id, opponent.name, opponent.abbreviation, undefined, status === 'final' ? '21' : undefined)

        return {
            id: `${team.id}-${opponent.id}-${index}`,
            league: team.league,
            startTime: createRelativeStartTime(offsets[index] ?? index, 19, index * 10),
            status,
            statusText: status === 'final' ? 'Final' : index === 1 ? 'Sunday - 7:20 PM' : 'Sunday - 12:00 PM',

            awayTeam: isHome ? opposingTeam : trackedTeam,
            homeTeam: isHome ? trackedTeam : opposingTeam
        }
    })
}

function createGameTeam(id: string, name: string, abbreviation: string, record?: string, score?: string) {
    return {
        id,
        name,
        abbreviation,
        record,
        score
    }
}

function createRelativeStartTime(dayOffset: number, hour: number, minute: number) {
    const date = new Date()

    date.setDate(date.getDate() + dayOffset)
    date.setHours(hour, minute, 0, 0)

    return date.toISOString()
}

export function getAllTeamMocks(): TeamDetailsViewModel[] {
    return [...teamDetails]
}

export function getAllRosterPlayerMocks(): RosterPlayerMatch[] {
    return teamDetails.flatMap((team) =>
        (rosters[team.id] ?? []).flatMap((group) =>
            group.players.map((player) => ({
                team,
                player,
            })),
        ),
    )
}