import { Navigate, Outlet, useParams } from "react-router-dom";
import { LeagueConfiguration } from "../../../shared/models/league.ts";
import { getAthleteMock } from "../../mock-data/athletes.ts";
import { AthleteHeader } from "./AthleteHeader.tsx";

export function AthleteLayout() {
    const { leagueId, athleteId } = useParams()

    const league = LeagueConfiguration.getFromRoute(leagueId)

    if (!league || !athleteId) {
        return (
            <Navigate to="/dashboard" replace />
        )
    }

    const athlete = getAthleteMock(league.league, athleteId)

    if (!athlete) {
        return (
            <Navigate to={`/league/${league.league.toLowerCase()}`} replace />
        )
    }

    return (
        <div className="container-fluid athlete-page">
            <AthleteHeader athlete={athlete} />

            <Outlet context={{ athlete }} />
        </div>
    )
}