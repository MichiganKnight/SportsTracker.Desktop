import type { League } from "../models/league.ts";
import type { GameCardViewModel } from "./game-card.ts";

export interface FavoriteTeamViewModel {
    id: string
    name: string
    abbreviation: string
    league: League
}

export interface FavoriteAthleteViewModel {
    id: string
    name: string
    teamName: string
    position: string
    league: League
    initials: string
}

export interface FollowingViewModel  {
    teams: FavoriteTeamViewModel[]
    athletes: FavoriteAthleteViewModel[]
    games: GameCardViewModel[]
}