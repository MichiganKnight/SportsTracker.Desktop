import { Navigate, Outlet, useParams } from "react-router-dom";
import { LeagueConfiguration } from "../../../shared/models/league.ts";
import { getTeamMock } from "../../mock-data/teams.ts";
import { TeamHeader } from "./TeamHeader.tsx";

export function TeamLayout() {
    const { leagueId, teamId } = useParams()

    const league = LeagueConfiguration.getFromRoute(leagueId)

    if (!league || !teamId) {
        return (
            <Navigate to="/dashboard/leagues" replace />
        )
    }

    const teamPage = getTeamMock(league.league, teamId)

    if (!teamPage) {
        return (
            <Navigate to={`/league/${league.league.toLowerCase()}`} replace />
        )
    }

    return (
        <div className="container-fluid team-page">
            <TeamHeader team={teamPage.team} />

            <Outlet context={{ teamPage }} />
        </div>
    )
}