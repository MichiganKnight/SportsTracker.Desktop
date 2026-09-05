import type { GameCardViewModel } from "../../shared/view-models/game-card.ts";
import { League } from "../../shared/models/league.ts";

export const gamesMock: GameCardViewModel[] = [
    {
        id: 'nfl-chi-gb',
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
    {
        id: 'nba-bos-chi',
        league: League.NBA,
        status: 'live',
        statusText: '4th Quarter · 5:18',
        awayTeam: {
            id: 'bos',
            name: 'Boston Celtics',
            abbreviation: 'BOS',
            record: '18-5',
            score: '94',
        },
        homeTeam: {
            id: 'chi-bulls',
            name: 'Chicago Bulls',
            abbreviation: 'CHI',
            record: '10-13',
            score: '89',
        },
    },
    {
        id: 'nhl-chi-det',
        league: League.NHL,
        status: 'live',
        statusText: '2nd Period · 11:03',
        awayTeam: {
            id: 'chi-blackhawks',
            name: 'Chicago Blackhawks',
            abbreviation: 'CHI',
            record: '11-14-2',
            score: '2',
        },
        homeTeam: {
            id: 'det',
            name: 'Detroit Red Wings',
            abbreviation: 'DET',
            record: '15-10-1',
            score: '3',
        },
    },
    {
        id: 'mlb-stl-chc',
        league: League.MLB,
        status: 'scheduled',
        statusText: 'Tomorrow · 7:05 PM',
        awayTeam: {
            id: 'stl',
            name: 'St. Louis Cardinals',
            abbreviation: 'STL',
            record: '72-64',
        },
        homeTeam: {
            id: 'chc',
            name: 'Chicago Cubs',
            abbreviation: 'CHC',
            record: '76-60',
        },
    },
    {
        id: 'cfb-mich-osu',
        league: League.CFB,
        status: 'final',
        statusText: 'Final',
        awayTeam: {
            id: 'mich',
            name: 'Michigan Wolverines',
            abbreviation: 'MICH',
            record: '10-2',
            score: '24',
        },
        homeTeam: {
            id: 'osu',
            name: 'Ohio State Buckeyes',
            abbreviation: 'OSU',
            record: '11-1',
            score: '27',
        },
    },
    {
        id: 'cbb-duke-unc',
        league: League.CBB,
        status: 'scheduled',
        statusText: 'Saturday · 8:00 PM',
        awayTeam: {
            id: 'duke',
            name: 'Duke Blue Devils',
            abbreviation: 'DUKE',
            record: '7-1',
        },
        homeTeam: {
            id: 'unc',
            name: 'North Carolina Tar Heels',
            abbreviation: 'UNC',
            record: '6-2',
        },
    }
]

export const liveGamesMock = gamesMock.filter((game) => game.status === 'live')