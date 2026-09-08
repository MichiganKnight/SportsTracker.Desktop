import { Navigate, Outlet, useParams } from "react-router-dom";
import { LeagueConfiguration } from "../../../shared/models/league.ts";
import { getGameDetailsMock } from "../../mock-data/game-details.ts";
import { GameHeader } from "./GameHeader.tsx";

export function GameLayout() {
    const { leagueId, gameId } = useParams()

    const league = LeagueConfiguration.getFromRoute(leagueId)

    if (!league || !gameId) {
        return (
            <Navigate to="/games" replace />
        )
    }

    const details = getGameDetailsMock(league.league, gameId)

    if (!details) {
        return (
            <Navigate to="/games" replace />
        )
    }

    return (
        <div className="container-fluid game-page">
            <GameHeader details={details} />

            <Outlet context={{ details }} />
        </div>
    )
}