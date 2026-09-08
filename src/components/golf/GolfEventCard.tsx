import type { GolfEventViewModel } from "../../../shared/view-models/golf.ts";
import { CalendarDays, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

interface GolfEventCardProps {
    event: GolfEventViewModel
}

export function GolfEventCard({ event }: GolfEventCardProps) {
    const statusClass = {
        live: 'bg-danger game-live-badge',
        final: 'bg-dark',
        scheduled: 'bg-primary',
    }[event.status]

    const statusLabel = {
        live: 'LIVE',
        final: 'FINAL',
        scheduled: 'UPCOMING',
    }[event.status]

    const formattedDate = new Intl.DateTimeFormat(undefined,
        {
            month: 'short',
            day: 'numeric',
        },
    ).format(new Date(event.startTime))

    return (
        <article className="card golf-event-card card-interactive shadow-sm h-100 position-relative">
            <div className="card-body">
                <div className="golf-event-heading">
                    <div>
                        <span className={`badge ${statusClass}`}>
                            {event.status === 'live' && (
                                <span className="game-live-dot"/>
                            )}

                            {statusLabel}
                        </span>

                        <h3 className="h5 mt-3 mb-1">
                            {event.name}
                        </h3>

                        <div className="golf-event-meta">
                            <span>
                                <MapPin size={14} aria-hidden="true"/>

                                {event.venue}
                            </span>

                            <span>
                                <CalendarDays size={14} aria-hidden="true"/>

                                {formattedDate}
                            </span>
                        </div>
                    </div>

                    <div className="golf-event-round">
                        {event.roundText}
                    </div>
                </div>

                {event.leaders.length > 0 ? (
                    <div className="golf-leaders mt-3">
                        {event.leaders.slice(0, 3).map((leader) => (
                            <div className="golf-leader-row" key={leader.athleteId}>
                                <div className="golf-leader-position">
                                    {leader.position}
                                </div>

                                <div className="golf-country-flag golf-country-emoji" aria-label={leader.country}>
                                    {leader.country}
                                </div>

                                <div className="golf-leader-name">
                                    {leader.name}
                                </div>

                                <div className="golf-leader-score">
                                    {leader.scoreToPar}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="golf-event-upcoming mt-3">
                        Leaderboard available when play begins
                    </div>
                )}

                <Link className="stretched-link" to={`/golf/${event.id}`} aria-label={`View ${event.name}`}/>
            </div>
        </article>
    )
}