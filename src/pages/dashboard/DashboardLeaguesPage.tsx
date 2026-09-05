import { LeagueConfiguration } from "../../../shared/models/league.ts";
import { gamesMock } from "../../mock-data/games.ts";
import { DashboardLeagueSection } from "../../components/dashboard/DashboardLeagueSection.tsx";

export function DashboardLeaguesPage() {
    const leagueSections = LeagueConfiguration.getAll().map(
        (leagueId) => {
            const league = LeagueConfiguration.get(leagueId)
            const games = gamesMock.filter((game) => game.league === leagueId)

            return {
                league,
                games
            }
        }
    )

    return (
        <div className="dashboard-leagues">
            {leagueSections.map(({ league, games }) => (
                <DashboardLeagueSection league={league} games={games} />
            ))}
        </div>
    )
}