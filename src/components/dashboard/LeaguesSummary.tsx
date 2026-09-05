import type { DashboardLeagueSummaryViewModel } from "../../../shared/view-models/dashboard-overview.ts";
import { Link } from "react-router-dom";

interface LeaguesSummaryProps {
    leagues: DashboardLeagueSummaryViewModel[];
}

export function LeaguesSummary({ leagues }: LeaguesSummaryProps) {
    return (
        <div className="card shadow-sm dashboard-summary-card h-100">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-start gap-3">
                    <div>
                        <h5 className="card-title mb-1">
                            Leagues
                        </h5>

                        <p className="text-secondary mb-0">
                            Browse Supported Sports and Leagues
                        </p>
                    </div>

                    <Link to="/dashboard/leagues" className="btn btn-outline-secondary btn-sm">
                        View Leagues
                    </Link>
                </div>

                <div className="d-flex flex-wrap gap-2 mt-3">
                    {leagues.map((league) => (
                        <Link key={league.league} to={`/league/${league.league.toLowerCase()}`} className="dashboard-league-summary-item">
                            {league.icon && (
                                <span className="dashboard-league-summary-icon">
                                    {league.icon}
                                </span>
                            )}

                            <span className="dashboard-league-summary-name">
                                {league.leagueName}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}