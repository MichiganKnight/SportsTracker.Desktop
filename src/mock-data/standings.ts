import { League, type League as LeagueType } from '../../shared/models/league'
import type { StandingsGroupViewModel, StandingsPageViewModel, StandingsTeamViewModel, StandingsView } from "../../shared/view-models/standings.ts";

type TeamLeague = Exclude<LeagueType, 'PGA'>

interface TeamSeed {
    id: string
    name: string
    abbreviation: string
    wins: number
    losses: number
}

const teamSeeds: Record<TeamLeague, TeamSeed[]> = {
    [League.NFL]: [
        { id: 'kc', name: 'Kansas City Chiefs', abbreviation: 'KC', wins: 12, losses: 3 },
        { id: 'buf', name: 'Buffalo Bills', abbreviation: 'BUF', wins: 11, losses: 4 },
        { id: 'phi', name: 'Philadelphia Eagles', abbreviation: 'PHI', wins: 10, losses: 5 },
        { id: 'det', name: 'Detroit Lions', abbreviation: 'DET', wins: 10, losses: 5 },
        { id: 'gb', name: 'Green Bay Packers', abbreviation: 'GB', wins: 9, losses: 6 },
        { id: 'chi', name: 'Chicago Bears', abbreviation: 'CHI', wins: 8, losses: 7 },
    ],

    [League.CFB]: [
        { id: 'oregon', name: 'Oregon Ducks', abbreviation: 'ORE', wins: 12, losses: 1 },
        { id: 'osu', name: 'Ohio State Buckeyes', abbreviation: 'OSU', wins: 11, losses: 1 },
        { id: 'texas', name: 'Texas Longhorns', abbreviation: 'TEX', wins: 11, losses: 2 },
        { id: 'penn-state', name: 'Penn State Nittany Lions', abbreviation: 'PSU', wins: 10, losses: 2 },
        { id: 'notre-dame', name: 'Notre Dame Fighting Irish', abbreviation: 'ND', wins: 10, losses: 2 },
        { id: 'mich', name: 'Michigan Wolverines', abbreviation: 'MICH', wins: 9, losses: 3 },
    ],

    [League.NBA]: [
        { id: 'bos', name: 'Boston Celtics', abbreviation: 'BOS', wins: 57, losses: 25 },
        { id: 'cle', name: 'Cleveland Cavaliers', abbreviation: 'CLE', wins: 54, losses: 28 },
        { id: 'okc', name: 'Oklahoma City Thunder', abbreviation: 'OKC', wins: 55, losses: 27 },
        { id: 'den', name: 'Denver Nuggets', abbreviation: 'DEN', wins: 52, losses: 30 },
        { id: 'mil', name: 'Milwaukee Bucks', abbreviation: 'MIL', wins: 49, losses: 33 },
        { id: 'chi-bulls', name: 'Chicago Bulls', abbreviation: 'CHI', wins: 39, losses: 43 },
    ],

    [League.CBB]: [
        { id: 'duke', name: 'Duke Blue Devils', abbreviation: 'DUKE', wins: 29, losses: 5 },
        { id: 'houston', name: 'Houston Cougars', abbreviation: 'HOU', wins: 28, losses: 6 },
        { id: 'auburn', name: 'Auburn Tigers', abbreviation: 'AUB', wins: 27, losses: 7 },
        { id: 'tennessee', name: 'Tennessee Volunteers', abbreviation: 'TENN', wins: 26, losses: 8 },
        { id: 'unc', name: 'North Carolina Tar Heels', abbreviation: 'UNC', wins: 24, losses: 10 },
        { id: 'illinois', name: 'Illinois Fighting Illini', abbreviation: 'ILL', wins: 23, losses: 11 },
    ],

    [League.MLB]: [
        { id: 'lad', name: 'Los Angeles Dodgers', abbreviation: 'LAD', wins: 98, losses: 64 },
        { id: 'phi', name: 'Philadelphia Phillies', abbreviation: 'PHI', wins: 95, losses: 67 },
        { id: 'nyy', name: 'New York Yankees', abbreviation: 'NYY', wins: 94, losses: 68 },
        { id: 'hou', name: 'Houston Astros', abbreviation: 'HOU', wins: 88, losses: 74 },
        { id: 'chc', name: 'Chicago Cubs', abbreviation: 'CHC', wins: 84, losses: 78 },
        { id: 'stl', name: 'St. Louis Cardinals', abbreviation: 'STL', wins: 81, losses: 81 },
    ],

    [League.NHL]: [
        { id: 'wpg', name: 'Winnipeg Jets', abbreviation: 'WPG', wins: 55, losses: 22 },
        { id: 'wsh', name: 'Washington Capitals', abbreviation: 'WSH', wins: 52, losses: 24 },
        { id: 'dal', name: 'Dallas Stars', abbreviation: 'DAL', wins: 50, losses: 25 },
        { id: 'tor', name: 'Toronto Maple Leafs', abbreviation: 'TOR', wins: 48, losses: 27 },
        { id: 'det', name: 'Detroit Red Wings', abbreviation: 'DET', wins: 42, losses: 33 },
        { id: 'chi-blackhawks', name: 'Chicago Blackhawks', abbreviation: 'CHI', wins: 28, losses: 46 },
    ],
}

export function getStandingsMock(league: LeagueType, requestedView: string | null): StandingsPageViewModel | null {
    if (league === League.PGA) {
        return null
    }

    const availableViews = getAvailableViews(league)

    const selectedView = availableViews.includes(requestedView as StandingsView) ? requestedView as StandingsView : availableViews[0]

    const teams = teamSeeds[league].map(mapStandingTeam)
    const groupNames = getGroupNames(league, selectedView)

    return {
        season: '2026',
        selectedView,
        availableViews,
        showTies: league === League.NFL || league === League.CFB,
        showGamesBack: league === League.NBA || league === League.MLB || league === League.NFL,
        groups: createGroups(teams, groupNames)
    }
}

function getAvailableViews(league: TeamLeague): StandingsView[] {
    if (league === League.MLB) {
        return ['overall', 'league', 'division']
    }

    if (league === League.CFB || league === League.CBB) {
        return ['overall', 'conference']
    }

    return ['overall', 'conference', 'division']
}

function getGroupNames(league: TeamLeague, view: StandingsView): Array<{ name: string; abbreviation?: string }> {
    if (view === 'overall') {
        return [{ name: 'Overall Standings' }]
    }

    if (view === 'league' && league === League.MLB) {
        return [
            { name: 'American League', abbreviation: 'AL' },
            { name: 'National League', abbreviation: 'NL' }
        ]
    }

    if (view === 'conference') {
        if (league === League.NFL) {
            return [
                { name: 'American Football Conference', abbreviation: 'AFC' },
                { name: 'National Football Conference', abbreviation: 'NFC' }
            ]
        }

        if (league === League.NBA || league === League.NHL) {
            return [
                { name: 'Eastern Conference', abbreviation: 'EAST' },
                { name: 'Western Conference', abbreviation: 'WEST' }
            ]
        }

        return [
            { name: 'Conference Leaders', abbreviation: 'CONF' }
        ]
    }

    return [
        { name: 'Division Leaders', abbreviation: 'DIV' },
        { name: 'Division Contenders', abbreviation: 'DIV' }
    ]
}

function mapStandingTeam(team: TeamSeed, index: number): StandingsTeamViewModel {
    const gamesPlayed = team.wins + team.losses
    const winPercentage = gamesPlayed > 0 ? (team.wins / gamesPlayed).toFixed(3).replace(/^0/, '') : '.000'

    const differential = (team.wins - team.losses) * 7

    return {
        ...team,
        ties: 0,
        pointsFor: 360 + team.wins * 11 + index * 3,
        pointsAgainst: 345 + team.losses * 9 + index * 2,
        winPercentage,
        gamesBack: index === 0 ? '-' : (index * 1.5).toFixed(1),
        differential,
        streak: index % 2 === 0 ? `W${Math.max(1, 4 - index)}` : `L${Math.max(1, index)}`
    }
}

function createGroups(teams: StandingsTeamViewModel[], names: Array<{ name: string, abbreviation?: string }>): StandingsGroupViewModel[] {
    if (names.length === 1) {
        return [{
            ...names[0],
            teams
        }]
    }

    const midpoint = Math.ceil(teams.length / 2)

    return names.map((group, index) => ({
        ...group,
        teams: index === 0 ? teams.slice(0, midpoint) : teams.slice(midpoint)
    }))
}