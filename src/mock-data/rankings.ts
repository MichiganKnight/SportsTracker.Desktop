import type { RankedTeamViewModel, RankingPollType, RankingPollViewModel, RankingsPageViewModel } from "../../shared/view-models/rankings.ts";
import { League, type League as LeagueType } from "../../shared/models/league.ts";

interface RankedTeamSeed {
    id: string
    name: string
    abbreviation: string
    conference: string
    record: string
    previousRank: number
}

const teams: RankedTeamSeed[] = [
    {
        id: 'oregon',
        name: 'Oregon Ducks',
        abbreviation: 'ORE',
        conference: 'Big Ten',
        record: '12-1',
        previousRank: 1,
    },
    {
        id: 'osu',
        name: 'Ohio State Buckeyes',
        abbreviation: 'OSU',
        conference: 'Big Ten',
        record: '11-1',
        previousRank: 3,
    },
    {
        id: 'texas',
        name: 'Texas Longhorns',
        abbreviation: 'TEX',
        conference: 'SEC',
        record: '11-2',
        previousRank: 2,
    },
    {
        id: 'penn-state',
        name: 'Penn State Nittany Lions',
        abbreviation: 'PSU',
        conference: 'Big Ten',
        record: '10-2',
        previousRank: 4,
    },
    {
        id: 'notre-dame',
        name: 'Notre Dame Fighting Irish',
        abbreviation: 'ND',
        conference: 'Independent',
        record: '10-2',
        previousRank: 6,
    },
    {
        id: 'georgia',
        name: 'Georgia Bulldogs',
        abbreviation: 'UGA',
        conference: 'SEC',
        record: '10-2',
        previousRank: 5,
    }
]

export function getRankingsMock(league: LeagueType): RankingsPageViewModel | null {
    if (league !== League.CFB) {
        return null
    }

    return {
        season: '2026',
        polls: [
            createPoll('ap', 'Associated Press Top 25', 'AP Poll', ['oregon', 'osu', 'texas', 'penn-state', 'notre-dame', 'georgia'], 1540, 42),
            createPoll('coaches', 'USA Today Coaches Poll', 'Coaches Poll', ['oregon', 'texas', 'osu', 'penn-state', 'georgia', 'notre-dame'], 1485, 38),
            createPoll('cfp', 'College Football Playoff Rankings', 'CFP', ['oregon', 'texas', 'penn-state', 'osu', 'notre-dame', 'georgia'], 0, 0)
        ]
    }
}

function createPoll(type: RankingPollType, name: string, shortName: string, order: string[], startingPoints: number, firstPlaceVotes: number): RankingPollViewModel {
    const rankedTeams = order.map((teamId, index) => {
        const team = teams.find((item) => item.id === teamId)

        if (!team) {
            return null
        }

        return {
            ...team,
            rank: index + 1,
            points: startingPoints > 0 ? startingPoints - index * 87 : 0,
            firstPlaceVotes: index === 0 ? firstPlaceVotes : 0
        }
    }).filter((team): team is RankedTeamViewModel => team !== null)

    return {
        type,
        name,
        shortName,
        weekName: 'Week 15',
        updatedLabel: 'December 6, 2026',
        teams: rankedTeams
    }
}