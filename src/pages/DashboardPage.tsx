import { DashboardHeader } from "../components/dashboard/DashboardHeader.tsx";
import { DashboardNavigation } from "../components/dashboard/DashboardNavigation.tsx";
import { FollowingSummary } from "../components/dashboard/FollowingSummary.tsx";
import { LiveSummary } from "../components/dashboard/LiveSummary.tsx";
import { LeaguesSummary } from "../components/dashboard/LeaguesSummary.tsx";
import type { DashboardOverviewViewModel } from "../../shared/view-models/dashboard-overview.ts";

export function DashboardPage({ liveEvents, leagues }: DashboardOverviewViewModel) {
    return (
        <div className="container-fluid dashboard-page">
            <DashboardHeader />

            <DashboardNavigation />

            <FollowingSummary />

            <div className="row g-4">
                <div className="col-lg-5">
                    <LiveSummary liveCount={liveEvents} />
                </div>

                <div className="col-lg-7">
                    <LeaguesSummary leagues={leagues} />
                </div>
            </div>
        </div>
    )
}