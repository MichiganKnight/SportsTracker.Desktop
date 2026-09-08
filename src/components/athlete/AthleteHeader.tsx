import type { AthleteDetailsViewModel } from "../../../shared/view-models/athlete-details.ts";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BsStar, BsStarFill } from "react-icons/bs";
import { AthleteNavigation } from "./AthleteNavigation.tsx";

interface AthleteHeaderProps {
    athlete: AthleteDetailsViewModel
}

export function AthleteHeader({ athlete }: AthleteHeaderProps) {
    const [isFavorite, setIsFavorite] = useState(false)

    return (
        <>
            <section className="card shadow-sm athlete-header-card mb-4">
                <div className="card-body">
                    <div className="d-flex flex-column flex-md-row align-items-md-center gap-4">
                        <div className="athlete-header-wrap">
                            <div className="athlete-headshot-placeholder athlete-details">
                                {athlete.initials}
                            </div>
                        </div>

                        <div className="flex-grow-1">
                            <div className="d-flex justify-content-between align-items-start gap-3">
                                <div className="athlete-header-info">
                                    <div className="text-secondary small fw-semibold text-uppercase">
                                        {athlete.league}
                                    </div>

                                    <span className={athlete.isActive ? 'badge bg-success' : 'badge bg-secondary'}>
                                        {athlete.status}
                                    </span>
                                </div>

                                <div className="athlete-meta">
                                    {athlete.jersey && (
                                        <span>
                                                #{athlete.jersey}
                                            </span>
                                    )}

                                    {athlete.position && (
                                        <span>
                                                {athlete.position}
                                            </span>
                                    )}
                                </div>

                                {athlete.teamId && athlete.teamName && (
                                    <Link to={`/team/${athlete.league.toLowerCase()}/${athlete.teamId}`} className="athlete-team-link mt-3">
                                        <span className="athlete-team-mark">
                                            {athlete.teamAbbreviation?.substring(0, 2)}
                                        </span>

                                        <span>
                                            {athlete.teamName}
                                        </span>
                                    </Link>
                                )}
                            </div>

                            <button type="button" className={['btn', 'btn-outline-secondary', 'athlete-favorite-button', isFavorite ? 'is-favorite' : ''].filter(Boolean).join(' ')} aria-pressed={isFavorite} onClick={() => setIsFavorite((current) => !current)}>
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
            </section>

            <AthleteNavigation athlete={athlete} />
        </>
    )
}