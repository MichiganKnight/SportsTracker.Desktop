import { LoaderCircle, Trophy } from 'lucide-react'
import type { Scoreboard } from '../../../shared/models/scoreboard'
import { GameCard } from './GameCard'

interface ScoreboardGridProps {
    scoreboard: Scoreboard | null
    error: string | null
    isLoading: boolean
    limit?: number
}

export function ScoreboardGrid({
                                   scoreboard,
                                   error,
                                   isLoading,
                                   limit,
                               }: ScoreboardGridProps) {
    if (isLoading) {
        return (
            <div className="content-card scoreboard-message">
                <LoaderCircle className="spin" size={26} />
                <p>Loading scoreboard...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="content-card scoreboard-message error-message">
                <p>{error}</p>
            </div>
        )
    }

    if (!scoreboard || scoreboard.games.length === 0) {
        return (
            <div className="content-card scoreboard-message">
                <Trophy size={26} />
                <p>No games or events are currently available.</p>
            </div>
        )
    }

    const games =
        limit === undefined
            ? scoreboard.games
            : scoreboard.games.slice(0, limit)

    return (
        <div className="games-grid">
            {games.map((game) => (
                <GameCard game={game} key={game.id} />
            ))}
        </div>
    )
}