import type { League } from "../models/league.ts";
import type { GameCardViewModel } from "./game-card.ts";

export interface LiveScoreboardViewModel {
    league: League
    leagueName: string
    leagueLogoUrl?: string
    games: GameCardViewModel[]
    updatedAt: string
}