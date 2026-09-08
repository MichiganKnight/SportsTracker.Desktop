import { type LeagueInfo, Sport } from "../../../shared/models/league.ts";
import type { GameCardViewModel } from "../../../shared/view-models/game-card.ts";
import { Link } from "react-router-dom";
import { BsCalendarEvent, BsListOl } from "react-icons/bs";
import { GameCard } from "../games/GameCard.tsx";
import type { GolfEventViewModel } from "../../../shared/view-models/golf.ts";
import { GolfEventCard } from "../golf/GolfEventCard.tsx";

interface DashboardLeagueSectionProps {
    league: LeagueInfo
    games: GameCardViewModel[]
    golfEvents?: GolfEventViewModel[]
}

export function DashboardLeagueSection({ league, games, golfEvents = [] }: DashboardLeagueSectionProps) {
    const leagueId = league.league.toLowerCase()
    const isGolf = league.sport === Sport.Golf
    const events = isGolf ? golfEvents : games
    const eventLabel = isGolf ? 'Tournaments' : 'Games'

    return (
        <section className={`dashboard-league-section league-${leagueId}`}>
            <header className="league-header">
                <div className="dashboard-league-heading">
                    <span className="dashboard-league-heading-icon" aria-hidden="true">
                        {league.icon}
                    </span>

                    <div>
                        <h3>
                            {league.displayName}

                            <small>
                                {events.length}
                            </small>
                        </h3>

                        <p>
                            {isGolf ? 'Professional Golf Tournaments' : `${league.sport} Games and Scores`}
                        </p>
                    </div>
                </div>

                <div className="dashboard-league-actions">
                    {!isGolf && (
                        <Link to={`/league/${leagueId}/standings`} className="btn btn-outline-secondary btns-sm">
                            <BsListOl aria-hidden="true"/>
                            Standings
                        </Link>
                    )}

                    <Link to={`/league/${leagueId}`} className="btn btn-outline-secondary btns-sm">
                        <BsCalendarEvent aria-hidden="true"/>

                        All {eventLabel}

                        <span className="dashboard-league-action-count">
                            {events.length}
                        </span>
                    </Link>
                </div>
            </header>

            {events.length > 0 ? (
                <div className="row g-3">
                    {isGolf ? golfEvents?.map((event) => (
                        <div className="col-12 col-lg-4" key={event.id}>
                            <GolfEventCard event={event} />
                        </div>
                    )) : games.map((game) => (
                        <div className="col-12 col-lg-4">
                            <GameCard game={game} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="card dashboard-league-empty">
                    <div className="card-body">
                        {isGolf ? 'No Tournaments Available' : 'No Games Scheduled'}
                    </div>
                </div>
            )}
        </section>
    )
}