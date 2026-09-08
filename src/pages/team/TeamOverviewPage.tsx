import type { TeamPageViewModel } from "../../../shared/view-models/team.ts";
import { useOutletContext } from "react-router-dom";
import { BsGeoAltFill } from "react-icons/bs";

interface TeamOutletContext {
    teamPage: TeamPageViewModel
}

export function TeamOverviewPage() {
    const { teamPage } = useOutletContext<TeamOutletContext>()

    const { team } = teamPage

    return (
        <div className="row g-4">
            <div className="col-xl-5">
                <section className="card shadow-sm h-100">
                    <header className="card-header">
                        <h2 className="h5 mb-0">
                            Record
                        </h2>
                    </header>

                    <div className="card-body">
                        <div className="row  text-center g-3">
                            <RecordStat label="Overall" value={team.overallRecord} />
                            <RecordStat label="Home" value={team.homeRecord} />
                            <RecordStat label="Away" value={team.awayRecord} />
                        </div>
                    </div>
                </section>
            </div>

            <div className="col-xl-7">
                <section className="card shadow-sm h-100 team-venue-card">
                    <div className="team-venue-placeholder">
                        <BsGeoAltFill aria-hidden="true" />

                        <span>{team.venue.name}</span>
                    </div>

                    <div className="card-body">
                        <h2 className="h5 mb-1">
                            {team.venue.name}
                        </h2>

                        <div className="text-secondary mb-3">
                            {team.venue.city}, {team.venue.state}
                        </div>

                        <div className="d-flex flex-wrap gap-2">
                            {team.venue.indoor !== undefined && (
                                <span className="badge text-bg-secondary">
                                    {team.venue.indoor ? 'Indoor' : 'Outdoor'}
                                </span>
                            )}

                            {team.venue.grass !== undefined && (
                                <span className="badge text-bg-secondary">
                                    {team.venue.grass ? 'Grass' : 'Artificial Surface'}
                                </span>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

function RecordStat({ label, value }: { label: string, value: string }) {
    return (
        <div className="col-4">
            <div className="team-stat-value">
                {value}
            </div>

            <div className="team-stat-label">
                {label}
            </div>
        </div>
    )
}