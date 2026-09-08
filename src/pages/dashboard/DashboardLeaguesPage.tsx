import { LeagueConfiguration, Sport } from "../../../shared/models/league.ts";
import { DashboardLeagueSection } from "../../components/dashboard/DashboardLeagueSection.tsx";
import { golfEventsMock } from "../../mock-data/golf.ts";
import { useScoreboards } from "../../hooks/useScoreboards.ts";
import { LiveDataStatus } from "../../components/data/LiveDataStatus.tsx";

export function DashboardLeaguesPage() {
    const { scoreboards, source, isLoading, error } = useScoreboards()

    const leagueSections = LeagueConfiguration.getAll().map((leagueId) => {
            const league = LeagueConfiguration.get(leagueId)

            const scoreboard = scoreboards.find((item) => item.league === leagueId)

            return {
                league,
                games: scoreboard?.games ?? [],
                golfEvents: league.sport === Sport.Golf ? golfEventsMock : []
            }
        }
    )

    return (
        <div className="dashboard-leagues">
            <LiveDataStatus source={source} isLoading={isLoading} error={error}/>

            {leagueSections.map(({ league, games, golfEvents }) => (
                <DashboardLeagueSection key={league.league} league={league} games={games} golfEvents={golfEvents}/>
            ))}
        </div>
    )
}