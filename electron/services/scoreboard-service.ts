import {
    getLeagueConfiguration,
    leagueConfigurations,
    type LeagueConfiguration,
    type LeagueId,
} from '../../shared/models/league.js'

import type {
    GameState,
    GameSummary,
    GolfEventSummary,
    GolfLeaderboardEntry,
    Scoreboard,
    TeamGameSummary,
    TeamSummary,
} from '../../shared/models/scoreboard.js'

const espnBaseUrl =
    'https://site.web.api.espn.com/apis/site/v2/sports'

const liveCacheDuration = 15_000
const scheduledCacheDuration = 2 * 60_000
const finalCacheDuration = 30 * 60_000

interface CachedScoreboard {
    scoreboard: Scoreboard
    expiresAt: number
}

const scoreboardCache = new Map<LeagueId, CachedScoreboard>()

const scoreboardRequests = new Map<
    LeagueId,
    Promise<Scoreboard>
>()

interface EspnScoreboardResponse {
    leagues?: EspnLeague[]
    events?: EspnEvent[]
}

interface EspnLeague {
    name?: string
    abbreviation?: string
    logos?: EspnLogo[]
}

interface EspnEvent {
    id?: string
    name?: string
    date?: string
    endDate?: string
    competitions?: EspnCompetition[]
}

interface EspnCompetition {
    competitors?: EspnCompetitor[]
    status?: EspnStatus
}

interface EspnCompetitor {
    id?: string
    homeAway?: 'home' | 'away'
    score?: string
    order?: number
    team?: EspnTeam
    athlete?: EspnAthlete
    records?: EspnRecord[]
}

interface EspnTeam {
    id?: string
    displayName?: string
    abbreviation?: string
    logo?: string
    logos?: EspnLogo[]
}

interface EspnAthlete {
    fullName?: string
    displayName?: string
    shortName?: string
    flag?: {
        href?: string
        alt?: string
    }
}

interface EspnRecord {
    type?: string
    summary?: string
}

interface EspnLogo {
    href?: string
    rel?: string[]
}

interface EspnStatus {
    type?: {
        name?: string
        state?: string
        shortDetail?: string
    }
}

export async function getScoreboard(
    leagueId: LeagueId,
): Promise<Scoreboard> {
    const cached = scoreboardCache.get(leagueId)

    if (cached && Date.now() < cached.expiresAt) {
        return cached.scoreboard
    }

    const pendingRequest = scoreboardRequests.get(leagueId)

    if (pendingRequest) {
        return pendingRequest
    }

    const request = loadScoreboard(leagueId)

    scoreboardRequests.set(leagueId, request)

    try {
        return await request
    } finally {
        scoreboardRequests.delete(leagueId)
    }
}

async function loadScoreboard(
    leagueId: LeagueId,
): Promise<Scoreboard> {
    const configuration = getLeagueConfiguration(leagueId)
    const url = createScoreboardUrl(configuration)

    const response = await fetch(url, {
        headers: {
            accept: 'application/json',
        },
    })

    if (!response.ok) {
        throw new Error(
            `ESPN returned ${response.status} ${response.statusText}`,
        )
    }

    const dto = (await response.json()) as EspnScoreboardResponse
    const scoreboard = mapScoreboard(dto, configuration)

    scoreboardCache.set(leagueId, {
        scoreboard,
        expiresAt:
            Date.now() + getCacheDuration(scoreboard),
    })

    return scoreboard
}

export async function getAllScoreboards(): Promise<Scoreboard[]> {
    const results = await Promise.allSettled(
        leagueConfigurations.map((league) =>
            getScoreboard(league.id),
        ),
    )

    const scoreboards: Scoreboard[] = []

    for (const result of results) {
        if (result.status === 'fulfilled') {
            scoreboards.push(result.value)
        }
    }

    if (scoreboards.length === 0) {
        throw new Error('Unable to load any ESPN scoreboards.')
    }

    return scoreboards
}

function getCacheDuration(scoreboard: Scoreboard): number {
    const hasLiveEvents = scoreboard.games.some(
        (game) =>
            game.state === 'in-progress' ||
            game.state === 'halftime',
    )

    if (hasLiveEvents) {
        return liveCacheDuration
    }

    const hasScheduledEvents = scoreboard.games.some(
        (game) =>
            game.state === 'scheduled' ||
            game.state === 'delayed' ||
            game.state === 'postponed',
    )

    if (hasScheduledEvents) {
        return scheduledCacheDuration
    }

    return finalCacheDuration
}

function createScoreboardUrl(
    configuration: LeagueConfiguration,
): string {
    return [
        espnBaseUrl,
        configuration.sport,
        configuration.espnLeague,
        'scoreboard',
    ].join('/')
}

function mapScoreboard(
    dto: EspnScoreboardResponse,
    configuration: LeagueConfiguration,
): Scoreboard {
    const espnLeague = dto.leagues?.[0]

    return {
        league: configuration.id,
        leagueName:
            espnLeague?.abbreviation ??
            espnLeague?.name ??
            configuration.displayName,
        leagueLogoUrl: findLeagueLogo(espnLeague?.logos),
        games: mapEvents(dto.events, configuration),
        updatedAt: new Date().toISOString(),
    }
}

function mapEvents(
    events: EspnEvent[] | undefined,
    configuration: LeagueConfiguration,
): GameSummary[] {
    if (!events) {
        return []
    }

    const games: GameSummary[] = []

    for (const event of events) {
        const competition = event.competitions?.[0]

        if (!competition) {
            continue
        }

        if (configuration.eventType === 'golf') {
            games.push(
                mapGolfEvent(
                    event,
                    competition,
                    configuration.id,
                ),
            )

            continue
        }

        const teamGame = mapTeamEvent(
            event,
            competition,
            configuration.id,
        )

        if (teamGame) {
            games.push(teamGame)
        }
    }

    return games
}

function mapTeamEvent(
    event: EspnEvent,
    competition: EspnCompetition,
    leagueId: LeagueId,
): TeamGameSummary | null {
    const home = competition.competitors?.find(
        (competitor) => competitor.homeAway === 'home',
    )

    const away = competition.competitors?.find(
        (competitor) => competitor.homeAway === 'away',
    )

    if (!home?.team || !away?.team) {
        return null
    }

    return {
        eventType: 'team',
        id: event.id ?? '',
        league: leagueId,
        name: event.name ?? '',
        startTime: event.date ?? '',
        state: mapGameState(
            competition.status?.type?.name,
            competition.status?.type?.state,
        ),
        statusText: competition.status?.type?.shortDetail ?? '',
        homeTeam: mapTeam(home),
        awayTeam: mapTeam(away),
    }
}

function mapGolfEvent(
    event: EspnEvent,
    competition: EspnCompetition,
    leagueId: LeagueId,
): GolfEventSummary {
    const leaders = (competition.competitors ?? [])
        .filter((competitor) => competitor.athlete)
        .sort(
            (left, right) =>
                (left.order ?? Number.MAX_SAFE_INTEGER) -
                (right.order ?? Number.MAX_SAFE_INTEGER),
        )
        .map(mapGolfer)

    return {
        eventType: 'golf',
        id: event.id ?? '',
        league: leagueId,
        name: event.name ?? 'PGA Tour Event',
        startTime: event.date ?? '',
        endTime: event.endDate,
        state: mapGameState(
            competition.status?.type?.name,
            competition.status?.type?.state,
        ),
        statusText: competition.status?.type?.shortDetail ?? '',
        leaders,
    }
}

function mapTeam(competitor: EspnCompetitor): TeamSummary {
    const team = competitor.team!

    const record =
        competitor.records?.find((item) => item.type === 'total') ??
        competitor.records?.[0]

    return {
        id: team.id ?? competitor.id ?? '',
        displayName: team.displayName ?? 'Unknown Team',
        abbreviation: team.abbreviation ?? '',
        logoUrl: team.logo ?? team.logos?.[0]?.href,
        score: competitor.score ?? '0',
        record: record?.summary,
    }
}

function mapGolfer(
    competitor: EspnCompetitor,
): GolfLeaderboardEntry {
    const athlete = competitor.athlete!

    return {
        athleteId: competitor.id ?? '',
        name:
            athlete.displayName ??
            athlete.fullName ??
            'Unknown Golfer',
        shortName:
            athlete.shortName ??
            athlete.displayName ??
            athlete.fullName ??
            'Unknown',
        position: competitor.order,
        scoreToPar: competitor.score ?? '-',
        country: athlete.flag?.alt,
        flagUrl: athlete.flag?.href,
    }
}

function mapGameState(
    statusName?: string,
    statusState?: string,
): GameState {
    switch (statusName) {
        case 'STATUS_IN_PROGRESS':
            return 'in-progress'

        case 'STATUS_HALFTIME':
            return 'halftime'

        case 'STATUS_FINAL':
            return 'final'

        case 'STATUS_POSTPONED':
            return 'postponed'

        case 'STATUS_DELAYED':
            return 'delayed'

        case 'STATUS_CANCELLED':
            return 'cancelled'
    }

    if (statusState === 'in') {
        return 'in-progress'
    }

    if (statusState === 'post') {
        return 'final'
    }

    return 'scheduled'
}

function findLeagueLogo(
    logos?: EspnLogo[],
): string | undefined {
    return (
        logos?.find((logo) => logo.rel?.includes('dark'))?.href ??
        logos?.find((logo) => logo.rel?.includes('default'))?.href ??
        logos?.[0]?.href
    )
}