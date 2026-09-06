import type { LeagueInfo } from "../../../shared/models/league.ts";
import type { GameCardViewModel } from "../../../shared/view-models/game-card.ts";
import { Link } from "react-router-dom";
import { BsCalendarEvent, BsListOl } from "react-icons/bs";
import { GameCard } from "./GameCard.tsx";

interface GameLeagueSectionProps {
    league: LeagueInfo
    games: GameCardViewModel[]
}

export function GamesLeagueSection({ league, games }: GameLeagueSectionProps) {
    const leagueId = league.league.toLowerCase()

    return (
        <section className={`games-league-section league-${leagueId}`}>
            <header className="league-header">
                <div className="games-league-heading">
                    <span aria-hidden="true">
                        {league.icon}
                    </span>

                    <h3>
                        {league.displayName}

                        <small>
                            ({games.length})
                        </small>
                    </h3>
                </div>

                <div className="games-league-actions">
                    <Link to={`/league/${leagueId}/standings`} className="btn btn-outline-secondary btn-sm">
                        <BsListOl aria-hidden="true" />

                        Standings
                    </Link>

                    <Link to={`/league/${leagueId}`} className="btn btn-outline-secondary btn-sm">
                        <BsCalendarEvent aria-hidden="true" />

                        League Details
                    </Link>
                </div>
            </header>

            <div className="row g-3">
                {games.map((game) => (
                    <div className="col-12 col-lg-4">
                        <GameCard game={game} />
                    </div>
                ))}
            </div>
        </section>
    )
}