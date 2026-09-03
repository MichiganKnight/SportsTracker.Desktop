import { useEffect, useState } from 'react'
import {
    CalendarDays,
    LoaderCircle,
    Radio,
    Star,
    Trophy,
} from 'lucide-react'
import type { Scoreboard } from '../../shared/models/scoreboard.js'
import { GameCard } from '../components/games/GameCard.js'

export function DashboardPage() {
    const [scoreboard, setScoreboard] = useState<Scoreboard | null>(null)

    const [error, setError] = useState<string | null>(() =>
        window.sportsTracker ? null : 'Scoreboards require Electron.',
    )

    const [isLoading, setIsLoading] = useState(
        Boolean(window.sportsTracker),
    )

    useEffect(() => {
        const desktopApi = window.sportsTracker

        if (!desktopApi) {
            return
        }

        void desktopApi.scoreboards
            .getNfl()
            .then((result) => {
                setScoreboard(result)
            })
            .catch((reason: unknown) => {
                setError(
                    reason instanceof Error
                        ? reason.message
                        : 'Unable to load the NFL scoreboard.',
                )
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    const liveGames =
        scoreboard?.games.filter(
            (game) =>
                game.state === 'in-progress' || game.state === 'halftime',
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
                                <Icon size={21} aria-hidden="true"/>
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
              Updated {new Date(scoreboard.updatedAt).toLocaleTimeString()}
            </span>
                    )}
                </div>

                {isLoading && (
                    <div className="content-card scoreboard-message">
                        <LoaderCircle className="spin" size={26}/>
                        <p>Loading the NFL scoreboard...</p>
                    </div>
                )}

                {error && (
                    <div className="content-card scoreboard-message error-message">
                        <p>{error}</p>
                    </div>
                )}

                {!isLoading && !error && scoreboard?.games.length === 0 && (
                    <div className="content-card scoreboard-message">
                        <Trophy size={26}/>
                        <p>No NFL games were returned.</p>
                    </div>
                )}

                {!isLoading && !error && scoreboard && (
                    <div className="games-grid">
                        {scoreboard.games.slice(0, 8).map((game) => (
                            <GameCard game={game} key={game.id}/>
                        ))}
                    </div>
                )}
            </section>
        </div>
    )
}