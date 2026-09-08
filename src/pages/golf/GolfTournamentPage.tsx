import { Navigate, useParams } from "react-router-dom";
import { findGolfEventMock } from "../../mock-data/golf.ts";
import { Fragment, useState } from "react";
import type { GolfHoleViewModel, GolfLeaderboardEntryViewModel } from "../../../shared/view-models/golf.ts";
import { ChevronDown, Flag, MapPin, Trophy } from "lucide-react";

export function GolfTournamentPage() {
    const { eventId } = useParams()
    const event = findGolfEventMock(eventId)

    const [expandedAthleteId, setExpandedAthleteId] = useState<string | null>(null)

    if (!event) {
        return <Navigate to="/league/pga" replace/>
    }

    return (
        <div className="container-fluid golf-tournament-page league-pga">
            <header className="golf-tournament-header">
                <div>
                    <div className="golf-tournament-eyebrow">
                        PGA Tour
                    </div>

                    <h1>{event.name}</h1>

                    <div className="golf-tournament-meta">
                        <span>
                            <MapPin size={16} aria-hidden="true"/>

                            {event.venue}, {event.location}
                        </span>

                        <span>
                            <Flag size={16} aria-hidden="true"/>

                            {event.roundText} · {event.statusText}
                        </span>
                    </div>
                </div>

                <div className="golf-tournament-facts">
                    <div>
                        <span>Purse</span>
                        <strong>{event.purse}</strong>
                    </div>

                    <div>
                        <span>Defending Champion</span>
                        <strong>{event.defendingChampion}</strong>
                    </div>
                </div>
            </header>

            <section className="card shadow-sm">
                <header className="card-header d-flex align-items-center gap-2">
                    <Trophy size={18} aria-hidden="true"/>

                    Leaderboard
                </header>

                {event.leaders.length === 0 ? (
                    <div className="card-body text-center py-5">
                        <h2 className="h5">
                            Tournament Has Not Started
                        </h2>

                        <p className="text-secondary mb-0">
                            The leaderboard will appear when play begins.
                        </p>
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="table golf-leaderboard-table mb-0">
                            <thead>
                                <tr>
                                    <th aria-label="Scorecard"/>
                                    <th>Position</th>
                                    <th>Player</th>
                                    <th>Today</th>
                                    <th>Thru</th>
                                    <th>R1</th>
                                    <th>R2</th>
                                    <th>R3</th>
                                    <th>R4</th>
                                    <th>Total</th>
                                    <th>Score</th>
                                </tr>
                            </thead>

                            <tbody>
                                {event.leaders.map((leader) => {
                                    const isExpanded = expandedAthleteId === leader.athleteId
                                    return (
                                        <Fragment key={leader.athleteId}>
                                            <tr className="golf-leaderboard-row">
                                                <td>
                                                    <button type="button" className="btn btn-outline-secondary golf-scorecard-toggle" aria-expanded={isExpanded} aria-label={`Show ${leader.name} scorecard`} onClick={() => setExpandedAthleteId(isExpanded ? null : leader.athleteId,)}>
                                                        <ChevronDown size={16} className="golf-scorecard-chevron" aria-hidden="true"/>
                                                    </button>
                                                </td>

                                                <td className="fw-semibold">
                                                    {leader.position}
                                                </td>

                                                <td>
                                                    <div className="d-flex align-items-center gap-2">
                                                        <span aria-hidden="true">
                                                            {leader.country}
                                                        </span>

                                                        <span className="fw-semibold">
                                                            {leader.name}
                                                        </span>
                                                    </div>
                                                </td>

                                                <td>{leader.today}</td>
                                                <td>{leader.thru}</td>

                                                {leader.rounds.map((round, index) => (
                                                        <td key={index}>
                                                            {round ?? '-'}
                                                        </td>
                                                    ),
                                                )}

                                                <td>
                                                    {leader.totalStrokes}
                                                </td>

                                                <td className="fw-bold">
                                                    {leader.scoreToPar}
                                                </td>
                                            </tr>

                                            {isExpanded && (
                                                <tr>
                                                    <td colSpan={11} className="p-0">
                                                        <GolfScorecard
                                                            leader={leader}
                                                        />
                                                    </td>
                                                </tr>
                                            )}
                                        </Fragment>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </div>
    )
}

function GolfScorecard({ leader }: { leader: GolfLeaderboardEntryViewModel }) {
    return (
        <div className="golf-scorecard-container">
            <div className="golf-scorecard-legend mb-3">
                <LegendMarker className="golf-score-eagle" label="Eagle"/>
                <LegendMarker className="golf-score-birdie" label="Birdie"/>
                <LegendMarker className="golf-score-par" label="Par"/>
                <LegendMarker className="golf-score-bogey" label="Bogey"/>
                <LegendMarker className="golf-score-double-bogey" label="Double Bogey+"
                />
            </div>

            {leader.scorecards.map((round) => (
                <div className="golf-round-scorecard mb-4" key={round.round}>
                    <h3 className="h6 mb-3">
                        {round.label}
                    </h3>

                    <div className="table-responsive">
                        <table className="table table-sm golf-scorecard-table mb-0">
                            <thead>
                                <tr>
                                    <th>Hole</th>

                                    {round.holes.map((hole) => (
                                        <th key={hole.number}>
                                            {hole.number}
                                        </th>
                                    ))}

                                    <th>Out</th>
                                    <th>In</th>
                                    <th>Total</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <th>Par</th>

                                    {round.holes.map((hole) => (
                                        <td key={hole.number}>
                                            {hole.par}
                                        </td>
                                    ))}

                                    <td>36</td>
                                    <td>36</td>
                                    <td>72</td>
                                </tr>

                                <tr>
                                    <th>Score</th>

                                    {round.holes.map((hole) => (
                                        <td key={hole.number}>
                                            <GolfHoleScore hole={hole}/>
                                        </td>
                                    ))}

                                    <td>{round.frontNine}</td>
                                    <td>{round.backNine}</td>
                                    <td className="fw-bold">
                                        {round.total}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
        </div>
    )
}

function GolfHoleScore({ hole }: { hole: GolfHoleViewModel }) {
    const difference = hole.score - hole.par

    let className = 'golf-score-par'

    if (difference <= -2) {
        className = 'golf-score-eagle'
    } else if (difference === -1) {
        className = 'golf-score-birdie'
    } else if (difference === 1) {
        className = 'golf-score-bogey'
    } else if (difference >= 2) {
        className = 'golf-score-double-bogey'
    }

    return (
        <span className={className}>
            {hole.score}
        </span>
    )
}

function LegendMarker({ className, label }: { className: string, label: string }) {
    return (
        <span className="golf-scorecard-legend-item">
            <span className={`golf-score-legend-marker ${className}`} aria-hidden="true"/>

            {label}
        </span>
    )
}