import { CalendarDays, Radio, Star } from 'lucide-react'
import { ScoreboardGrid } from '../components/games/ScoreboardGrid'
import { useScoreboard } from '../hooks/useScoreboard'

export function DashboardPage() {
    const {
        scoreboard,
        error,
        isLoading,
    } = useScoreboard('nfl')

    const liveGames =
        scoreboard?.games.filter(
            (game) =>
                game.state === 'in-progress' ||
                game.state === 'halftime',
        ).length ?? 0

    const summaries = [
        {
            label: 'Live Events',
            value: liveGames.toString(),
            detail: 'NFL events currently live',
            icon: Radio,
        },
        {
            label: 'NFL Games',
            value: scoreboard?.games.length.toString() ?? '0',
            detail: 'Games returned by ESPN',
            icon: CalendarDays,
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
                        Follow live games, leagues, teams, and athletes from one place.
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

            <section className="scoreboard-section">
                <div className="section-heading">
                    <div>
                        <p className="page-eyebrow">NFL</p>
                        <h3>Scoreboard</h3>
                    </div>

                    {scoreboard && (
                        <span>
              Updated{' '}
                            {new Date(scoreboard.updatedAt).toLocaleTimeString()}
            </span>
                    )}
                </div>

                <ScoreboardGrid
                    scoreboard={scoreboard}
                    error={error}
                    isLoading={isLoading}
                    limit={8}
                />
            </section>
        </div>
    )
}