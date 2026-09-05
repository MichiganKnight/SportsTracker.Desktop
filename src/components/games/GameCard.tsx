import type { GameCardTeamViewModel, GameCardViewModel } from "../../../shared/view-models/game-card.ts";
import { BsStarFill } from "react-icons/bs";

interface GameCardProps {
    game: GameCardViewModel
    isFavorite?: boolean
}

export function GameCard({ game, isFavorite = false }: GameCardProps) {
    const statusClass = {
        live: 'bg-danger game-live-badge',
        final: 'bg-dark',
        scheduled: 'bg-primary'
    }[game.status]

    const statusLabel = {
        live: 'LIVE',
        final: 'FINAL',
        scheduled: 'SCHEDULED'
    }[game.status]

    return (
        <article className="card game-card card-interactive shadow-sm h-100 position-relative">
            {isFavorite && (
                <div className="game-favorite-badge" title="Favorite Team Playing" aria-label="Favorite Team Playing">
                    <BsStarFill />
                </div>
            )}

            <div className="card-body">
                <div className="rounded-3 p-2 mb-3 game-team-surface">
                    <GameTeamRow team={game.awayTeam} />
                    <GameTeamRow team={game.homeTeam} />
                </div>

                <div className="border-top pt-3">
                    <div className="game-status-row">
                        <div className="game-status-main">
                            <span className={`badge ${statusClass}`}>
                                {game.status === 'live' && (
                                    <span className="game-live-dot"></span>
                                )}

                                {statusLabel}
                            </span>

                            <span className="text-secondary small">
                                {game.statusText}
                            </span>
                        </div>

                        <span className="text-secondary small">
                            {game.league}
                        </span>
                    </div>
                </div>
            </div>
        </article>
    )
}

function GameTeamRow({ team }: { team: GameCardTeamViewModel }) {
    return (
        <div className="team-row">
            <div className="d-flex align-items-center gap-2 min-w-0">
                <div className="team-logo team-logo-placeholder" aria-hidden="true">
                    {team.abbreviation.substring(0, 2)}
                </div>

                <div className="team-row-details">
                    <div className="team-row-name">
                        {team.name}
                    </div>

                    <div className="text-secondary small">
                        {team.record ?? team.abbreviation}
                    </div>
                </div>
            </div>

            <div className="team-score">
                {team.score ?? '-'}
            </div>
        </div>
    )
}