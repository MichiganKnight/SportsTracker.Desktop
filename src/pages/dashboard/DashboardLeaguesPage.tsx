import { LeagueConfiguration } from "../../../shared/models/league.ts";
import { gamesMock } from "../../mock-data/games.ts";
import { DashboardLeagueSection } from "../../components/dashboard/DashboardLeagueSection.tsx";
import { golfEventsMock } from "../../mock-data/golf.ts";

export function DashboardLeaguesPage() {
    const leagueSections = LeagueConfiguration.getAll().map((leagueId) => {
            const league = LeagueConfiguration.get(leagueId)

            return {
                league,
                games: gamesMock.filter((game) => game.league === leagueId),
                golfEvents: golfEventsMock.filter((event) => event.league === leagueId)
            }
        }
    )

    return (
        <div className="dashboard-leagues">
            {leagueSections.map(({ league, games, golfEvents }) => (
                <DashboardLeagueSection key={league.league} league={league} games={games} golfEvents={golfEvents}/>
            ))}
        </div>
    )
}