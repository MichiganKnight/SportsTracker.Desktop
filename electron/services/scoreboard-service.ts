import type { GameState, GameSummary, Scoreboard, TeamSummary } from "../../shared/models/scoreboard.js";

const nflScoreboardUrl = 'https://site.web.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard';

const cacheDurationMilliseconds = 15_000;

let cachedScoreboard: Scoreboard | undefined;
let cacheExpiresAt = 0;

interface EspnScoreboardResponse {
    leagues?: EspnLeague[]
    events?: EspnEvent[]
}

interface EspnLeague {
    name?: string,
    abbreviation?: string,
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
    logos?: EspnLogo[]
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

export async function getNflScoreboard(): Promise<Scoreboard> {
    if (cachedScoreboard && Date.now() < cacheExpiresAt) {
        return cachedScoreboard;
    }

    const response = await fetch(nflScoreboardUrl, {
        headers: {
            'Accept': 'application/json'
        }
    })

    if (!response.ok) {
        throw new Error(`ESPN Returned ${response.status} ${response.statusText}`)
    }

    const dto = (await response.json()) as EspnScoreboardResponse;
    const league = dto?.leagues?.[0]

    const scoreboard: Scoreboard = {
        league: 'nfl',
        leagueName: league?.abbreviation ?? league?.name ?? 'NFL',
        leagueLogoUrl: findLeagueLogo(league?.logos),
        games: mapGames(dto.events),
        updatedAt: new Date().toISOString()
    }

    cachedScoreboard = scoreboard;
    cacheExpiresAt = Date.now() + cacheDurationMilliseconds;

    return scoreboard;
}

function mapGames(events: EspnEvent[] | undefined): GameSummary[] {
    if (!events) {
        return [];
    }

    return events.flatMap((event) => {
        const competition = event.competitions?.[0]

        const home = competition?.competitors?.find((competitor) => competitor.homeAway === 'home')
        const away = competition?.competitors?.find((competitor) => competitor.homeAway === 'away')

        if (!competition || !home?.team || !away?.team) {
            return [];
        }

        return [
            {
                id: event.id ?? '',
                league: 'nfl',
                name: event.name ?? '',
                startTime: event.date ?? '',
                state: mapGameState(
                    competition.status?.type?.name,
                    competition.status?.type?.state,
                ),
                statusText: competition.status?.type?.shortDetail ?? '',
                homeTeam: mapTeam(home),
                awayTeam: mapTeam(away),
            },
        ]
    })
}

function mapTeam(competitor: EspnCompetitor): TeamSummary {
    const team = competitor.team!

    const record = competitor.records?.find((item) => item.type === 'total') ?? competitor.records?.[0]

    return {
        id: team.id ?? competitor.id ?? '',
        displayName: team.displayName ?? 'Unknown Team',
        abbreviation: team.abbreviation ?? '',
        logoUrl: team.logo ?? team.logos?.[0]?.href,
        score: competitor.score ?? '0',
        record: record?.summary,
    }
}

function mapGameState(statusName?: string, statusState?: string): GameState {
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

function findLeagueLogo(logos?: EspnLogo[]): string | undefined {
    return (
        logos?.find((logo) => logo.rel?.includes('dark'))?.href ??
        logos?.find((logo) => logo.rel?.includes('default'))?.href ??
        logos?.[0]?.href
    )
}