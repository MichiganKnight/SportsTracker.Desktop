import type { GameDetailsViewModel } from "../../../shared/view-models/game-details.ts";
import { GameNavigation } from "./GameNavigation.tsx";

interface GameHeaderProps {
    details: GameDetailsViewModel
}

export function GameHeader({ details }: GameHeaderProps) {
    const { game } = details

    return (
        <>
            <section className="card shadow-sm game-header-card mb-4">
                <div className="card-body">
                    <div className="game-header-status">
                        <span className={game.status === 'live' ? 'badge bg-danger game-live-badge' : game.status === 'final' ? 'badge bg-dark' : 'badge bg-primary'}>
                            {game.status === 'live' && (
                                <span className="game-live-dot" />
                            )}

                            {game.status.toUpperCase()}
                        </span>

                        <span className="text-secondary">
                            {game.statusText}
                        </span>
                    </div>

                    <div className="game-header-matchup">
                        <HeaderTeam name={game.awayTeam.name} abbreviation={game.awayTeam.abbreviation} score={game.awayTeam.score} />

                        <div className="game-header-separator">
                            <span>at</span>
                        </div>

                        <HeaderTeam name={game.homeTeam.name} abbreviation={game.homeTeam.abbreviation} score={game.homeTeam.score} />
                    </div>
                </div>
            </section>

            <GameNavigation league={game.league} gameId={game.id} />
        </>
    )
}

function HeaderTeam({ name, abbreviation, score }: { name: string, abbreviation: string, score?: string }) {
    return (
        <div className="game-header-team">
            <div className="game-details-logo game-details-logo-placeholder">
                {abbreviation.substring(0, 2)}
            </div>

            <div>
                <h1>{name}</h1>
                <span>{abbreviation}</span>
            </div>

            <strong className="game-details-score">
                {score ?? '—'}
            </strong>
        </div>
    )
}