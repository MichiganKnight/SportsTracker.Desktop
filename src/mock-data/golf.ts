import type { GolfEventViewModel, GolfHoleViewModel, GolfLeaderboardEntryViewModel, GolfRoundViewModel } from "../../shared/view-models/golf.ts";
import { League } from "../../shared/models/league.ts";

function createRelativeDate(dayOffset: number, hour = 8): string {
    const date = new Date()

    date.setDate(date.getDate() + dayOffset)
    date.setHours(hour, 0, 0, 0)

    return date.toISOString()
}

function createRound(
    round: number,
    scores: number[],
): GolfRoundViewModel {
    const pars = [
        4, 4, 3, 5, 4, 4, 3, 5, 4,
        4, 4, 3, 5, 4, 4, 3, 5, 4,
    ]

    const holes: GolfHoleViewModel[] = scores.map(
        (score, index) => ({
            number: index + 1,
            par: pars[index],
            yardage: 160 + ((index * 37) % 390),
            score,
        }),
    )

    const frontNine = holes
        .slice(0, 9)
        .reduce((total, hole) => total + hole.score, 0)

    const backNine = holes
        .slice(9)
        .reduce((total, hole) => total + hole.score, 0)

    return {
        round,
        label: `Round ${round}`,
        holes,
        frontNine,
        backNine,
        total: frontNine + backNine,
    }
}

function createLeader(
    athleteId: string,
    position: string,
    name: string,
    country: string,
    scoreToPar: string,
    today: string,
    thru: string,
    roundOneScores: number[],
    roundTwoScores: number[],
): GolfLeaderboardEntryViewModel {
    const firstRound = createRound(1, roundOneScores)
    const secondRound = createRound(2, roundTwoScores)

    return {
        athleteId,
        position,
        name,
        country,
        scoreToPar,
        today,
        thru,
        rounds: [firstRound.total, secondRound.total, null, null],
        totalStrokes: firstRound.total + secondRound.total,
        scorecards: [firstRound, secondRound],
    }
}

const scheffler = createLeader(
    'scottie-scheffler',
    '1',
    'Scottie Scheffler',
    '🇺🇸',
    '-12',
    '-5',
    'F',
    [4, 3, 3, 4, 4, 4, 2, 5, 4, 4, 4, 3, 4, 3, 4, 3, 5, 4],
    [3, 4, 3, 4, 3, 4, 3, 4, 4, 4, 3, 3, 5, 4, 3, 3, 4, 4],
)

const mcilroy = createLeader(
    'rory-mcilroy',
    '2',
    'Rory McIlroy',
    '🇬🇧',
    '-10',
    '-4',
    'F',
    [4, 4, 3, 4, 3, 4, 3, 5, 4, 3, 4, 3, 5, 4, 4, 3, 4, 4],
    [4, 3, 3, 5, 4, 3, 3, 4, 4, 4, 4, 2, 4, 4, 4, 3, 5, 3],
)

const schauffele = createLeader(
    'xander-schauffele',
    'T3',
    'Xander Schauffele',
    '🇺🇸',
    '-8',
    '-3',
    '16',
    [4, 4, 3, 5, 4, 3, 3, 4, 4, 4, 4, 3, 4, 4, 3, 3, 5, 4],
    [3, 4, 3, 5, 4, 4, 2, 5, 3, 4, 3, 3, 5, 4, 4, 3, 4, 4],
)

const morikawa = createLeader(
    'collin-morikawa',
    'T3',
    'Collin Morikawa',
    '🇺🇸',
    '-8',
    '-2',
    'F',
    [4, 4, 2, 5, 4, 4, 3, 4, 4, 4, 3, 3, 5, 4, 4, 3, 4, 4],
    [4, 3, 3, 5, 3, 4, 3, 5, 4, 3, 4, 3, 4, 4, 4, 3, 5, 4],
)

export const golfEventsMock: GolfEventViewModel[] = [
    {
        id: 'lakeview-classic',
        league: League.PGA,
        name: 'Lakeview Classic',
        venue: 'Lakeview Golf Club',
        location: 'Chicago, Illinois',
        startTime: createRelativeDate(0),
        endTime: createRelativeDate(2),
        status: 'live',
        statusText: 'In Progress',
        roundText: 'Round 2',
        purse: '$9,200,000',
        defendingChampion: 'Scottie Scheffler',
        leaders: [
            scheffler,
            mcilroy,
            schauffele,
            morikawa,
        ],
    },
    {
        id: 'coastal-open',
        league: League.PGA,
        name: 'Coastal Open',
        venue: 'Ocean Dunes Golf Club',
        location: 'Monterey, California',
        startTime: createRelativeDate(-4),
        endTime: createRelativeDate(-1),
        status: 'final',
        statusText: 'Final',
        roundText: 'Final Round',
        purse: '$8,700,000',
        defendingChampion: 'Rory McIlroy',
        leaders: [
            {
                ...mcilroy,
                position: '1',
                scoreToPar: '-18',
                thru: 'F',
            },
            {
                ...scheffler,
                position: '2',
                scoreToPar: '-16',
                thru: 'F',
            },
            {
                ...morikawa,
                position: '3',
                scoreToPar: '-14',
                thru: 'F',
            },
        ],
    },
    {
        id: 'national-championship',
        league: League.PGA,
        name: 'National Championship',
        venue: 'Heritage Country Club',
        location: 'Charlotte, North Carolina',
        startTime: createRelativeDate(3),
        endTime: createRelativeDate(6),
        status: 'scheduled',
        statusText: 'Upcoming',
        roundText: 'Starts Thursday',
        purse: '$12,000,000',
        defendingChampion: 'Xander Schauffele',
        leaders: [],
    },
]

export function findGolfEventMock(
    eventId: string | undefined,
): GolfEventViewModel | undefined {
    return golfEventsMock.find((event) => event.id === eventId)
}