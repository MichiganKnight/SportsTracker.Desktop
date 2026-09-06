import { Navigate, Outlet, useParams } from "react-router-dom";
import { LeagueConfiguration } from "../../../shared/models/league.ts";
import { LeagueHeader } from "./LeagueHeader.tsx";

export function LeagueLayout() {
    const { leagueId } = useParams()
    const league = LeagueConfiguration.getFromRoute(leagueId)

    if (!league) {
        return (
            <Navigate to="/dashboard/leagues" replace />
        )
    }

    return (
        <div className={`container-fluid league-page league-${league.league.toLowerCase()}`}>
            <LeagueHeader league={league} />

            <Outlet context={{ league }} />
        </div>
    )
}