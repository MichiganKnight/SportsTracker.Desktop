import { Link } from "react-router-dom";

interface LiveSummaryProps {
    liveCount: number;
}

export function LiveSummary({ liveCount }: LiveSummaryProps) {
    return (
        <div className="card shadow-sm dashboard-summary-card">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-start gap-3">
                    <div>
                        <h5 className="card-title mb-1">
                            Live Now
                        </h5>

                        <p className="text-secondary mb-0">
                            Events Currently in Progress
                        </p>
                    </div>

                    <Link to="/dashboard/live" className="btn btn-outline-secondary btn-sm">
                        View Live
                    </Link>
                </div>

                <div className="dashboard-summary-stat mt-3">
                    <div className="dashboard-summary-stat-value">
                        {liveCount}
                    </div>
                    <div className="dashboard-summary-stat-label">Live Events</div>
                </div>
            </div>
        </div>
    )
}