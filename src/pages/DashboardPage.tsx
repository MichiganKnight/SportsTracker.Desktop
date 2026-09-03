import { Layers3, Radio, Star } from 'lucide-react'
import { GameSection } from '../components/games/GameSection'
import { useAllScoreboards } from '../hooks/useAllScoreboards'

export function DashboardPage() {
    const {
        scoreboards,
        error,
        isLoading,
    } = useAllScoreboards()

    const allGames = scoreboards.flatMap(
        (scoreboard) => scoreboard.games,
    )

    const liveGames = allGames.filter(
        (game) =>
            game.state === 'in-progress' ||
            game.state === 'halftime',
    )

    const summaries = [
        {
            label: 'Live Events',
            value: liveGames.length.toString(),
            detail: 'Events currently in progress',
            icon: Radio,
        },
        {
            label: 'Leagues',
            value: scoreboards.length.toString(),
            detail: `${allGames.length} total events loaded`,
            icon: Layers3,
        },
        {
            label: 'Following',
            value: '0',
            detail: 'Favorite teams and athletes',
            icon: Star,
        },
    ]

    return (
        <div className="dashboard-page">
            <section className="page-heading">
                <div>
                    <p className="page-eyebrow">Overview</p>
                    <h2>Your sports dashboard</h2>
                    <p>
                        Follow live games, leagues, teams, and athletes from one
                        place.
                    </p>
                </div>
            </section>

            <section className="summary-grid" aria-label="Sports summary">
                {summaries.map((summary) => {
                    const Icon = summary.icon

                    return (
                        <article className="summary-card" key={summary.label}>
                            <div className="summary-icon">
                                <Icon size={21} aria-hidden="true" />
                            </div>

                            <div>
                                <p>{summary.label}</p>
                                <strong>{summary.value}</strong>
                                <span>{summary.detail}</span>
                            </div>
                        </article>
                    )
                })}
            </section>

            <section className="dashboard-live-preview">
                {isLoading ? (
                    <div className="content-card scoreboard-message">
                        Loading scoreboards...
                    </div>
                ) : error && scoreboards.length === 0 ? (
                    <div className="content-card scoreboard-message error-message">
                        {error}
                    </div>
                ) : (
                    <GameSection
                        title="Live Now"
                        icon={Radio}
                        games={liveGames.slice(0, 6)}
                    />
                )}
            </section>
        </div>
    )
}