import { dashboardOverviewMock } from "../../mock-data/dashboard.ts";
import { FollowingSummary } from "../../components/dashboard/FollowingSummary.tsx";
import { LiveSummary } from "../../components/dashboard/LiveSummary.tsx";
import { LeaguesSummary } from "../../components/dashboard/LeaguesSummary.tsx";
import { followingMock } from "../../mock-data/following.ts";
import { useScoreboards } from "../../hooks/useScoreboards.ts";
import { golfEventsMock } from "../../mock-data/golf.ts";

export function DashboardOverviewPage() {
    const { scoreboards } = useScoreboards()

    const liveGameCount = scoreboards
        .flatMap((scoreboard) => scoreboard.games)
        .filter((game) => game.status === 'live')
        .length

    const liveGolfCount = golfEventsMock.filter((event) => event.status === 'live').length

    return (
        <>
            <FollowingSummary teamCount={followingMock.teams.length} athleteCount={followingMock.athletes.length} />

            <div className="row g-4">
                <div className="col-lg-5">
                    <LiveSummary liveCount={liveGameCount + liveGolfCount} />
                </div>

                <div className="col-lg-7">
                    <LeaguesSummary leagues={dashboardOverviewMock.leagues} />
                </div>
            </div>
        </>
    )
}