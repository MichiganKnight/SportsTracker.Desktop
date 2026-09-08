import { net } from 'electron'
import { LiveScoreboardViewModel } from "../../shared/view-models/live-scoreboard";
import { League, LeagueConfiguration, LeagueInfo, Sport } from "../../shared/models/league.js";
import { GameCardStatus, GameCardTeamViewModel, GameCardViewModel } from "../../shared/view-models/game-card";

const espnBaseUrl = 'https://site.api.espn.com/apis/site/v2/sports'

const cacheDurationMilliseconds = 15_000
const requestTimeoutMilliseconds = 10_000

interface CachedScoreboard {
    scoreboard: LiveScoreboardViewModel
    expiresAt: number
}

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
    team?: EspnTeam
    records?: EspnRecord[]
}

interface EspnTeam {
    id?: string
    displayName?: string
    abbreviation?: string
    logo?: string
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
        completed?: boolean
        description?: string
        detail?: string
        shortDetail?: string
    }
}

const scoreboardCache = new Map<string, CachedScoreboard>()

export async function getScoreboard(league: League, requestedDate?: string): Promise<LiveScoreboardViewModel> {
    const configuration = LeagueConfiguration.get(league)

    if (configuration.sport === Sport.Golf) {
        throw new Error('Golf Scoreboards Require PGA Service')
    }

    const cacheKey = `${league}:${requestedDate} ?? 'current'`

    const cached = scoreboardCache.get(cacheKey)

    if (cached && Date.now() < cached.expiresAt) {
        return cached.scoreboard
    }

    const url = createScoreboardUrl(configuration, requestedDate)

    const response = await net.fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Accept-Language': 'en-US,en;q=0.9',
            Referer: 'https://www.espn.com/',
        },
        signal: AbortSignal.timeout(
            requestTimeoutMilliseconds,
        )
    })

    if (!response.ok) {
        throw new Error(
            `${configuration.league}: ESPN Returned ` +
            `${response.status} ${response.statusText} ` +
            `for ${url}`,
        )
    }

    const dto = await response.json() as EspnScoreboardResponse

    const scoreboard = mapScoreboard(dto, configuration)

    scoreboardCache.set(cacheKey, {
        scoreboard,
        expiresAt: Date.now() + cacheDurationMilliseconds
    })

    return scoreboard
}

export async function getAllScoreboards(requestedDate?: string): Promise<LiveScoreboardViewModel[]> {
    const supportedLeagues = LeagueConfiguration.getAll().filter((league) => LeagueConfiguration.get(league).sport !== Sport.Golf)

    const results = await Promise.allSettled(supportedLeagues.map((league) => getScoreboard(league, requestedDate)))

    const scoreboards: LiveScoreboardViewModel[] = []
    const errors: Error[] = []

    results.forEach((result) => {
        if (result.status === 'fulfilled') {
            scoreboards.push(result.value)

            return
        }

        const error = result.reason instanceof Error ? result.reason : new Error(String(result.reason))

        errors.push(error)

        console.error('Scoreboard Request Failed: ', error.message)
    })

    if (scoreboards.length === 0) {
        const details = errors.map((error) => error.message).join(' | ')

        throw new Error(`Every ESPN Scoreboard Request Failed: ${details}`)
    }

    return scoreboards
}

function createScoreboardUrl(configuration: LeagueInfo, requestedDate?: string): string {
    const url = new URL([
        espnBaseUrl,
        configuration.espnSport,
        configuration.espnLeague,
        'scoreboard'
    ].join('/'))

    if (requestedDate) {
        url.searchParams.set('dates', requestedDate.replaceAll('-', ''))
    }

    return url.toString()
}

function mapScoreboard(dto: EspnScoreboardResponse, configuration: LeagueInfo): LiveScoreboardViewModel {
    const espnLeague = dto.leagues?.[0]

    return {
        league: configuration.league,
        leagueName:
            espnLeague?.abbreviation ??
            espnLeague?.name ??
            configuration.displayName,
        leagueLogoUrl: findLeagueLogo(
            espnLeague?.logos,
        ),
        games: mapEvents(
            dto.events,
            configuration.league,
        ),
        updatedAt: new Date().toISOString(),
    }
}

function mapEvents(events: EspnEvent[] | undefined, league: League): GameCardViewModel[] {
    if (!events) {
        return []
    }

    return events.flatMap((event) => {
        const competition = event.competitions?.[0]

        if (!competition) {
            return []
        }

        const home = competition.competitors?.find((competitor) => competitor.homeAway === 'home')
        const away = competition.competitors?.find((competitor) => competitor.homeAway === 'away')

        if (!home?.team || !away?.team) {
            return []
        }

        const status = mapGameStatus(competition.status)

        return [{
            id: event.id ?? '',
            league,
            startTime: event.date ?? '',
            status,
            statusText: getStatusText(competition.status),
            awayTeam: mapTeam(away, status !== 'scheduled',),
            homeTeam: mapTeam(home, status !== 'scheduled',),
        }]
    })
}

function mapTeam(competitor: EspnCompetitor, includeScore: boolean): GameCardTeamViewModel {
    const team = competitor.team!

    const record = competitor.records?.find((item) => item.type === 'total',) ?? competitor.records?.[0]

    return {
        id: team.id ?? competitor.id ?? '',
        name: team.displayName ?? 'Unknown Team',
        abbreviation: team.abbreviation ?? '',
        logoUrl: team.logo,
        score: includeScore ? competitor.score : undefined,
        record: record?.summary,
    }
}

function mapGameStatus(status?: EspnStatus): GameCardStatus {
    const name = status?.type?.name
    const state = status?.type?.state

    if (name === 'STATUS_FINAL' || status?.type?.completed || state === 'post') {
        return 'final'
    }

    if (name === 'STATUS_IN_PROGRESS' || name === 'STATUS_HALFTIME' || name === 'STATUS_DELAYED' || state === 'in') {
        return 'live'
    }

    return 'scheduled'
}

function getStatusText(status?: EspnStatus): string {
    return (status?.type?.shortDetail ?? status?.type?.detail ?? status?.type?.description ?? 'Status unavailable'
    )
}

function findLeagueLogo(logos?: EspnLogo[]) {
    return (logos?.find((logo) => logo.rel?.includes('dark'),)?.href ?? logos?.find((logo) => logo.rel?.includes('default'),)?.href ?? logos?.[0]?.href)
}