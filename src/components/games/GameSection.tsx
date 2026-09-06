import type { ReactNode } from "react";
import type { GameCardViewModel } from "../../../shared/view-models/game-card.ts";
import { GameCard } from "./GameCard.tsx";

interface GameSectionProps {
    title: string
    icon: ReactNode
    games: GameCardViewModel[]
}

export function GameSection({ title, icon, games }: GameSectionProps) {
    return (
        <section className="card shadow-sm game-section">
            <header className="card-header game-section-header">
                <h2 className="h5 mb-0">
                    <span aria-hidden="true">
                        {icon}
                    </span>

                    {title}
                </h2>

                <span className="badge bg-secondary">
                    {games.length}
                </span>
            </header>

            {games.length > 0 ? (
                <div className="card-body">
                    <div className="row g-3">
                        {games.map((game) => (
                            <div className="col-12 col-md-6" key={game.id}>
                                <GameCard game={game} />
                            </div>
                        ))}
                    </div>
                </div>
            ): (
                <div className="card-body text-secondary">
                    No {title}
                </div>
            )}
        </section>
    )
}