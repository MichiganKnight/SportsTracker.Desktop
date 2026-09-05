import type { FollowingViewModel } from "../../shared/view-models/following.ts";
import { League } from "../../shared/models/league.ts";

export const followingMock: FollowingViewModel = {
    teams: [
        {
            id: 'chi',
            name: 'Chicago Bears',
            abbreviation: 'CHI',
            league: League.NFL
        },
        {
            id: 'chc',
            name: 'Chicago Cubs',
            abbreviation: 'CHC',
            league: League.MLB
        }
    ],

    athletes: [
        {
            id: 'caleb-williams',
            name: 'Caleb Williams',
            teamName: 'Chicago Bears',
            position: 'Quarterback',
            league: League.NFL,
            initials: 'CW'
        }
    ],

    games: [
        {
            id: 'mock-game-1',
            league: League.NFL,
            status: 'live',
            statusText: '3rd Quarter · 7:42',
            awayTeam: {
                id: 'chi',
                name: 'Chicago Bears',
                abbreviation: 'CHI',
                record: '8-4',
                score: '17',
            },
            homeTeam: {
                id: 'gb',
                name: 'Green Bay Packers',
                abbreviation: 'GB',
                record: '9-3',
                score: '21',
            },
        },
    ]
}