import { dashboardOverviewMock } from "../../mock-data/dashboard.ts";
import { FollowingSummary } from "../../components/dashboard/FollowingSummary.tsx";
import { LiveSummary } from "../../components/dashboard/LiveSummary.tsx";
import { LeaguesSummary } from "../../components/dashboard/LeaguesSummary.tsx";
import { followingMock } from "../../mock-data/following.ts";

export function DashboardOverviewPage() {
    const {liveEvents, leagues} = dashboardOverviewMock;

    return (
        <>
            <FollowingSummary teamCount={followingMock.teams.length} athleteCount={followingMock.athletes.length} />

            <div className="row g-4">
                <div className="col-lg-5">
                    <LiveSummary liveCount={liveEvents} />
                </div>

                <div className="col-lg-7">
                    <LeaguesSummary leagues={leagues} />
                </div>
            </div>
        </>
    )
}