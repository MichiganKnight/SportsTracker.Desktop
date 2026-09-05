import { NavLink } from "react-router-dom";

export function FollowingSummary() {
    return (
        <div className="card shadow-sm mb-4 dashboard-summary-card h-100">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-start gap-3">
                    <div>
                        <h5 className="card-title mb-1">
                            Following
                        </h5>

                        <p className="text-secondary mb-0">
                            Teams and Athletes You're Following
                        </p>
                    </div>

                    <NavLink to="/dashboard/following" className="btn btn-outline-secondary btn-sm">
                        View Following
                    </NavLink>
                </div>

                <div className="row g-3 mt-2">
                    <div className="col-sm-6">
                        <div className="dashboard-summary-stat">
                            <div className="dashboard-summary-stat-value" data-dashboard-favorite-team-count>0</div>

                            <div className="dashboard-summary-stat-label">
                                Favorite Teams
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <div className="dashboard-summary-stat">
                            <div className="dashboard-summary-stat-value" data-dashboard-favorite-athlete-count>0</div>

                            <div className="dashboard-summary-stat-label">
                                Favorite Players
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}