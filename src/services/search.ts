import { type SearchResultType, type SearchResultViewModel } from "../../shared/view-models/search.ts";
import { LeagueConfiguration } from "../../shared/models/league.ts";
import { getAllRosterPlayerMocks, getAllTeamMocks } from "../mock-data/teams.ts";
import { gamesMock } from "../mock-data/games.ts";
import { golfEventsMock } from "../mock-data/golf.ts";

export function searchSports(query: string, limit?: number): SearchResultViewModel[] {
    const normalizedQuery = normalize(query)

    if (normalizedQuery.length < 2) {
        return []
    }

    const scoredResults = createSearchCatalog().map((result) => ({
        result,
        score: getMatchScore(result, normalizedQuery),
    }))
        .filter((item,): item is {
            result: SearchResultViewModel,
            score: number
        } => item.score !== null,)
        .sort((left, right) => left.score - right.score || left.result.title.localeCompare(right.result.title,),)
        .map((item) => item.result)

    return limit === undefined ? scoredResults : scoredResults.slice(0, limit)
}

export function getSearchResultTypeLabel(type: SearchResultType): string {
    const labels: Record<SearchResultType, string> = {
        league: 'Leagues',
        team: 'Teams',
        athlete: 'Athletes',
        game: 'Games',
        tournament: 'Tournaments',
    }

    return labels[type]
}

function createSearchCatalog(): SearchResultViewModel[] {
    const leagues: SearchResultViewModel[] = LeagueConfiguration.getAll().map((leagueId) => {
        const league = LeagueConfiguration.get(leagueId)

        return {
            id: `league-${leagueId}`,
            type: 'league',
            title: league.displayName,
            subtitle: `${league.sport} League`,
            description: `Scores, standings, rankings, and league leaders`,
            route: `/league/${leagueId.toLowerCase()}`,
            imageText:
                league.icon ??
                leagueId.substring(0, 2),
            keywords: [
                leagueId,
                league.displayName,
                league.sport,
                league.espnLeague,
            ],
        }
    })

    const teams: SearchResultViewModel[] = getAllTeamMocks().map((team) => ({
        id: `team-${team.league}-${team.id}`,
        type: 'team',
        title: team.displayName,
        subtitle: `${team.league} · ${team.abbreviation}`,
        description: `${team.overallRecord} · ${team.venue.name}`,
        route: `/team/${team.league.toLowerCase()}/${team.id}`,
        imageText: team.abbreviation.substring(0, 2),
        keywords: [
            team.displayName,
            team.abbreviation,
            team.league,
            team.venue.name,
            team.venue.city,
            team.venue.state,
        ],
    }))

    const athletes: SearchResultViewModel[] = getAllRosterPlayerMocks().map(({ team, player }) => ({
        id: `athlete-${team.league}-${player.id}`,
        type: 'athlete',
        title: player.displayName,
        subtitle: `${player.positionAbbreviation} · ${team.displayName}`,
        description: player.jersey
            ? `${team.league} · Number ${player.jersey}`
            : team.league,
        route: `/athlete/${team.league.toLowerCase()}/${player.id}`,
        imageText: player.initials,
        keywords: [
            player.displayName,
            player.positionAbbreviation,
            player.jersey ?? '',
            team.displayName,
            team.abbreviation,
            team.league,
        ],
    }))

    const games: SearchResultViewModel[] = gamesMock.map((game) => ({
        id: `game-${game.id}`,
        type: 'game',
        title: `${game.awayTeam.name} at ${game.homeTeam.name}`,
        subtitle: `${game.league} · ${game.statusText}`,
        description: createGameScoreDescription(game),
        date: game.startTime,
        route: `/game/${game.league.toLowerCase()}/${game.id}`,
        imageText: game.league.substring(0, 2),
        keywords: [
            game.awayTeam.name,
            game.awayTeam.abbreviation,
            game.homeTeam.name,
            game.homeTeam.abbreviation,
            game.league,
            game.status,
            game.statusText,
        ],
    }))

    const tournaments: SearchResultViewModel[] = golfEventsMock.map((event) => ({
        id: `tournament-${event.id}`,
        type: 'tournament',
        title: event.name,
        subtitle: `PGA Tour · ${event.roundText}`,
        description: `${event.venue}, ${event.location}`,
        date: event.startTime,
        route: `/golf/${event.id}`,
        imageText: '⛳',
        keywords: [
            event.name,
            event.venue,
            event.location,
            event.status,
            event.statusText,
            event.defendingChampion,
            ...event.leaders.map((leader) => leader.name),
        ],
    }))

    return [
        ...leagues,
        ...teams,
        ...athletes,
        ...games,
        ...tournaments,
    ]
}

function createGameScoreDescription(game: (typeof gamesMock)[number]): string {
    const awayScore = game.awayTeam.score
    const homeScore = game.homeTeam.score

    if (awayScore === undefined || homeScore === undefined) {
        return `${game.awayTeam.abbreviation} vs. ${game.homeTeam.abbreviation}`
    }

    return `${game.awayTeam.abbreviation} ${awayScore} · ${game.homeTeam.abbreviation} ${homeScore}`
}

function getMatchScore(result: SearchResultViewModel, query: string): number | null {
    const title = normalize(result.title)
    const subtitle = normalize(result.subtitle)

    if (title === query) {
        return 0
    }

    if (title.startsWith(query)) {
        return 1
    }

    if (title.includes(query)) {
        return 2
    }

    if (subtitle.includes(query)) {
        return 3
    }

    const supportingText = normalize(
        [
            result.description,
            ...result.keywords,
        ].join(' '),
    )

    if (supportingText.includes(query)) {
        return 4
    }

    return null
}

function normalize(value: string): string {
    return value.trim().toLocaleLowerCase()
}