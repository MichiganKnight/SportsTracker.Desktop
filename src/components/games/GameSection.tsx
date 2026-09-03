import type { LucideIcon } from 'lucide-react'
import type { TeamGameSummary } from '../../../shared/models/scoreboard'
import { GameCard } from './GameCard'

interface GameSectionProps {
    title: string
    icon: LucideIcon
    games: TeamGameSummary[]
}

export function GameSection({
                                title,
                                icon: Icon,
                                games,
                            }: GameSectionProps) {
    return (
        <section className="card game-section-card shadow-sm mb-4">
            <header className="card-header game-section-header">
                <h3>
                    <Icon size={18} aria-hidden="true" />
                    {title}
                </h3>

                <span className="badge text-bg-secondary">
          {games.length}
        </span>
            </header>

            {games.length > 0 ? (
                <div className="card-body game-section-body">
                    <div className="games-grid">
                        {games.map((game) => (
                            <GameCard game={game} key={game.id} />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="card-body game-section-empty">
                    No {title}
                </div>
            )}
        </section>
    )
}