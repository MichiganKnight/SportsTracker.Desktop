import type { FollowingViewModel } from "../../shared/view-models/following.ts";
import { League } from "../../shared/models/league.ts";
import { gamesMock } from "./games.ts";

const favoriteGameIds = new Set([
    'nfl-chi-gb',
    'mlb-stl-chc'
])

export const followingMock: FollowingViewModel = {
    teams: [
        {
            id: 'chi',
            name: 'Chicago Bears',
            abbreviation: 'CHI',
            league: League.NFL,
        },
        {
            id: 'chc',
            name: 'Chicago Cubs',
            abbreviation: 'CHC',
            league: League.MLB,
        },
        {
            id: 'chi-blackhawks',
            name: 'Chicago Blackhawks',
            abbreviation: 'CHI',
            league: League.NHL,
        },
    ],

    athletes: [
        {
            id: 'caleb-williams',
            name: 'Caleb Williams',
            teamName: 'Chicago Bears',
            position: 'Quarterback',
            league: League.NFL,
            initials: 'CW',
        },
        {
            id: 'connor-bedard',
            name: 'Connor Bedard',
            teamName: 'Chicago Blackhawks',
            position: 'Center',
            league: League.NHL,
            initials: 'CB',
        },
    ],

    games: gamesMock.filter((game) =>
        favoriteGameIds.has(game.id),
    )
}