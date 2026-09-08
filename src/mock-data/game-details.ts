import { type League, LeagueConfiguration, Sport } from "../../shared/models/league.ts";
import type { BoxScoreColumnViewModel, BoxScoreTeamViewModel, GameDetailsViewModel, GamePlayViewModel } from "../../shared/view-models/game-details.ts";
import { gamesMock } from "./games.ts";
import { findTeamScheduleGameMock } from "./teams.ts";
import type { GameCardViewModel } from "../../shared/view-models/game-card.ts";

export function getGameDetailsMock(league: League, gameId: string): GameDetailsViewModel | undefined {
    const game = gamesMock.find((item) => item.league === league && item.id === gameId) ?? findTeamScheduleGameMock(league, gameId)

    if (!game) {
        return undefined
    }

    const sport = LeagueConfiguration.get(league).sport

    const periods = getPeriodHeadings(sport)
    const boxScoreColumns = getBoxScoreColumns(sport)

    return {
        game,
        venue: getVenue(game),
        broadcast: 'ESPN',
        attendance: '61,284',
        headline: createHeadline(game),
        summary: createSummary(game),
        lineScoreHeadings: periods,
        lineScores: [
            {
                teamAbbreviation:
                game.awayTeam.abbreviation,
                periods: createPeriodScores(
                    periods.length,
                    3,
                ),
                total: game.awayTeam.score ?? '—',
            },
            {
                teamAbbreviation:
                game.homeTeam.abbreviation,
                periods: createPeriodScores(
                    periods.length,
                    7,
                ),
                total: game.homeTeam.score ?? '—',
            },
        ],
        information: [
            {
                label: 'Venue',
                value: getVenue(game),
            },
            {
                label: 'Location',
                value: 'United States',
            },
            {
                label: 'Broadcast',
                value: 'ESPN',
            },
            {
                label: 'Attendance',
                value: '61,284',
            },
        ],
        featuredAthletes: [
            {
                id: `${game.awayTeam.id}-leader`,
                name: `${game.awayTeam.abbreviation} Leader`,
                teamAbbreviation:
                game.awayTeam.abbreviation,
                description: getLeaderDescription(sport),
                value: getLeaderValue(sport, 0),
            },
            {
                id: `${game.homeTeam.id}-leader`,
                name: `${game.homeTeam.abbreviation} Leader`,
                teamAbbreviation:
                game.homeTeam.abbreviation,
                description: getLeaderDescription(sport),
                value: getLeaderValue(sport, 1),
            },
        ],
        boxScoreTeams: [
            createBoxScoreTeam(
                game.awayTeam.id,
                game.awayTeam.name,
                game.awayTeam.abbreviation,
                boxScoreColumns,
            ),
            createBoxScoreTeam(
                game.homeTeam.id,
                game.homeTeam.name,
                game.homeTeam.abbreviation,
                boxScoreColumns,
            ),
        ],
        plays: createPlays(game),
        situation: getSituation(sport, game)
    }
}

function getPeriodHeadings(sport: Sport): string[] {
    switch (sport) {
        case Sport.Baseball:
            return ['1', '2', '3', '4', '5', '6', '7', '8', '9']

        case Sport.Hockey:
            return ['1', '2', '3']

        default:
            return ['1', '2', '3', '4']
    }
}

function getBoxScoreColumns(sport: Sport): BoxScoreColumnViewModel[] {
    switch (sport) {
        case Sport.Football:
            return [
                { key: 'cmpAtt', label: 'C/ATT' },
                { key: 'yards', label: 'YDS' },
                { key: 'touchdowns', label: 'TD' },
                { key: 'interceptions', label: 'INT' },
            ]

        case Sport.Basketball:
            return [
                { key: 'minutes', label: 'MIN' },
                { key: 'points', label: 'PTS' },
                { key: 'rebounds', label: 'REB' },
                { key: 'assists', label: 'AST' },
            ]

        case Sport.Baseball:
            return [
                { key: 'atBats', label: 'AB' },
                { key: 'runs', label: 'R' },
                { key: 'hits', label: 'H' },
                { key: 'rbi', label: 'RBI' },
            ]

        case Sport.Hockey:
            return [
                { key: 'shots', label: 'SOG' },
                { key: 'goals', label: 'G' },
                { key: 'assists', label: 'A' },
                { key: 'points', label: 'PTS' },
            ]

        case Sport.Golf:
            return []
    }
}

function createBoxScoreTeam(teamId: string, teamName: string, abbreviation: string, columns: BoxScoreColumnViewModel[]): BoxScoreTeamViewModel {
    const players = [1, 2, 3, 4].map((number) => ({
        id: `${teamId}-player-${number}`,
        name: `${abbreviation} Player ${number}`,
        position: number === 1 ? 'Starter' : 'Player',
        values: Object.fromEntries(
            columns.map((column, index) => [
                column.key,
                String(number * (index + 2)),
            ]),
        ),
    }))

    return {
        teamId,
        teamName,
        abbreviation,
        columns,
        players,
        totals: Object.fromEntries(
            columns.map((column, index) => [
                column.key,
                String((index + 2) * 15),
            ]),
        ),
    }
}

function createPlays(game: GameCardViewModel): GamePlayViewModel[] {
    return [
        {
            id: 'play-1',
            period: '4th Quarter',
            clock: '7:42',
            situation: '1st & 10',
            text: `${game.awayTeam.abbreviation} completed a pass for 18 yards.`,
            awayScore: game.awayTeam.score ?? '17',
            homeScore: game.homeTeam.score ?? '21',
            teamColor: '#4c8dff',
            isScoringPlay: false,
        },
        {
            id: 'play-2',
            period: '4th Quarter',
            clock: '9:18',
            situation: '2nd & Goal',
            text: `${game.homeTeam.abbreviation} scored on a six-yard play.`,
            awayScore: '17',
            homeScore: '21',
            teamColor: '#35a66f',
            isScoringPlay: true,
        },
        {
            id: 'play-3',
            period: '3rd Quarter',
            clock: '2:31',
            text: `${game.awayTeam.abbreviation} converted a field goal attempt.`,
            awayScore: '17',
            homeScore: '14',
            teamColor: '#4c8dff',
            isScoringPlay: true,
        },
        {
            id: 'play-4',
            period: '3rd Quarter',
            clock: '6:54',
            text: `${game.homeTeam.abbreviation} gained 12 yards.`,
            awayScore: '14',
            homeScore: '14',
            teamColor: '#35a66f',
            isScoringPlay: false,
        },
    ]
}

function getSituation(sport: Sport, game: GameCardViewModel): GameDetailsViewModel['situation'] {
    if (game.status !== 'live') {
        return undefined
    }

    if (sport === Sport.Football) {
        return {
            type: 'football',
            fieldPosition: 62,
            firstDownPosition: 72,
            downDistance: '1st & 10',
            possession: game.awayTeam.abbreviation,
        }
    }

    if (sport === Sport.Baseball) {
        return {
            type: 'baseball',
            firstOccupied: true,
            secondOccupied: false,
            thirdOccupied: true,
            balls: 2,
            strikes: 1,
            outs: 1,
        }
    }

    return undefined
}

function createPeriodScores(count: number, startingValue: number): string[] {
    return Array.from(
        { length: count },
        (_, index) =>
            String((startingValue + index) % 8),
    )
}

function getVenue(game: GameCardViewModel): string {
    return `${game.homeTeam.name} Stadium`
}

function createHeadline(game: GameCardViewModel): string {
    if (game.status === 'live') {
        return `${game.awayTeam.name} and ${game.homeTeam.name} Are Battling Now`
    }

    if (game.status === 'final') {
        return `${game.homeTeam.name} Secure the Result Against ${game.awayTeam.name}.`
    }

    return `${game.awayTeam.name} Prepare to Face ${game.homeTeam.name}.`
}

function createSummary(game: GameCardViewModel): string {
    return (
        `This presentation preview demonstrates how the game recap, ` +
        `line score, featured athletes, box score, and play-by-play ` +
        `will appear for ${game.awayTeam.name} at ${game.homeTeam.name}.`
    )
}

function getLeaderDescription(sport: Sport): string {
    return sport === Sport.Baseball ? 'Batting' : sport === Sport.Hockey ? 'Skating' : 'Game Leader'
}

function getLeaderValue(sport: Sport, index: number): string {
    if (sport === Sport.Basketball) {
        return index === 0 ? '31 PTS' : '28 PTS'
    }

    if (sport === Sport.Baseball) {
        return index === 0 ? '2-4, HR' : '3-5, 2 RBI'
    }

    if (sport === Sport.Hockey) {
        return index === 0 ? '2 G, 1 A' : '1 G, 2 A'
    }

    return index === 0
        ? '287 YDS, 3 TD'
        : '251 YDS, 2 TD'
}