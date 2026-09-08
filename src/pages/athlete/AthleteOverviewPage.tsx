import type { AthleteDetailsViewModel } from "../../../shared/view-models/athlete-details.ts";
import { useOutletContext } from "react-router-dom";

interface AthleteOutletContext {
    athlete: AthleteDetailsViewModel
}

export function AthleteOverviewPage() {
    const { athlete } = useOutletContext<AthleteOutletContext>()

    return (
        <>
            <section className="card shadow-sm mb-4">
                <header className="card-header athlete-section-header">
                    {athlete.quickStatsTitle}
                </header>

                <div className="card-body">
                    <div className="row g-3">
                        {athlete.quickStats.map((stat) => (
                            <div className="col-6 col-md-3" key={stat.label}>
                                <div className="athlete-stat-card">
                                    <div className="athlete-stat-label">
                                        <div className="athlete-stat-value">
                                            {stat.value}
                                        </div>

                                        <div className="athlete-stat-label">
                                            {stat.label}
                                        </div>

                                        {stat.rank && (
                                            <div className="athlete-stat-rank">
                                                {stat.rank}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="card shadow-sm mb-4">
                <header className="card-header athlete-section-header">
                    Player Information
                </header>

                <div className="card-body">
                    <div className="athlete-bio-grid">
                        {athlete.bio.map((item) => (
                            <div className="athlete-bio-item" key={item.label}>
                                <span className="athlete-bio-label">
                                    {item.label}
                                </span>

                                <span className="athlete-bio-value">
                                    {item.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="card shadow-sm athlete-overview-card">
                <header className="card-header athlete-section-header">
                    Overview
                </header>

                <div className="card-body athlete-analysis-body">
                    <h2 className="athlete-content-header">
                        {athlete.overviewTitle}
                    </h2>

                    <p className="athlete-content-description mb-0">
                        {athlete.overviewDescription}
                    </p>
                </div>
            </section>
        </>
    )
}