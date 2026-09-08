import type { TeamDetailsViewModel } from "../../../shared/view-models/team.ts";
import { useState, type CSSProperties } from "react";
import { BsStar, BsStarFill } from "react-icons/bs";
import { TeamNavigation } from "./TeamNavigation.tsx";

interface TeamHeaderProps {
    team: TeamDetailsViewModel
}

export function TeamHeader({ team }: TeamHeaderProps) {
    const [isFavorite, setIsFavorite] = useState(false)

    return (
        <>
            <section className="card shadow-sm team-header-card mb-4">
                <div className="card-body">
                    <div className="d-flex flex-column flex-md-row align-items-md-center gap-4">
                        <div className="team-header-logo-wrap">
                            <div className="team-header-logo-placeholder">
                                {team.abbreviation.substring(0, 2)}
                            </div>
                        </div>

                        <div className="flex-grow-1">
                            <div className="d-flex justify-content-between align-items-start gap-3">
                                <div>
                                    <div className="text-secondary small fw-semibold text-uppercase">
                                        {team.league}
                                    </div>

                                    <div className="mb-1">
                                        {team.displayName}
                                    </div>

                                    <div className="text-secondary">
                                        {team.abbreviation}
                                    </div>

                                    <div className="team-overall-record mt-3">
                                        {team.overallRecord}
                                    </div>
                                </div>

                                <button type="button" className={['btn', 'btn-outline-secondary', 'team-favorite-button', isFavorite ? 'is-Favorite' : ''].filter(Boolean).join(' ')} aria-pressed={isFavorite} onClick={() => setIsFavorite((current) => !current)}>
                                    {isFavorite ? (
                                        <BsStarFill aria-hidden="true" />
                                    ) : (
                                        <BsStar aria-hidden="true" />
                                    )}

                                    <span className="d-none d-sm-inline">
                                        {isFavorite ? 'Following' : 'Favorite'}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="team-color-bar" style={{'--team-primary': team.primaryColor, '--team-secondary': team.secondaryColor} as CSSProperties} />

                <TeamNavigation team={team} />
            </section>
        </>
    )
}