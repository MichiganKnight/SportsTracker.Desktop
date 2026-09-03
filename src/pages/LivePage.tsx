import { LoaderCircle, Radio, Trophy } from 'lucide-react'
import { GameSection } from '../components/games/GameSection'
import { useAllScoreboards } from '../hooks/useAllScoreboards'
import { getLeagueConfiguration } from '../../shared/models/league'

export function LivePage() {
    const {
        scoreboards,
        error,
        isLoading,
    } = useAllScoreboards()

    if (isLoading) {
        return (
            <div className="content-card scoreboard-message">
                <LoaderCircle className="spin" size={26} />
                <p>Loading live events...</p>
            </div>
        )
    }

    if (error && scoreboards.length === 0) {
        return (
            <div className="content-card scoreboard-message error-message">
                <p>{error}</p>
            </div>
        )
    }

    const liveScoreboards = scoreboards
        .map((scoreboard) => ({
            scoreboard,
            games: scoreboard.games.filter(
                (game) =>
                    game.state === 'in-progress' ||
                    game.state === 'halftime',
            ),
        }))
        .filter((section) => section.games.length > 0)

    return (
        <div className="live-page">
            <section className="page-heading">
                <div>
                    <p className="page-eyebrow">Scores</p>
                    <h2>Live Now</h2>
                    <p>
                        Games and tournaments currently in progress across every
                        supported league.
                    </p>
                </div>
            </section>

            <div className="live-page-content">
                {liveScoreboards.length > 0 ? (
                    liveScoreboards.map(({ scoreboard, games }) => {
                        const league = getLeagueConfiguration(
                            scoreboard.league,
                        )

                        return (
                            <GameSection
                                key={scoreboard.league}
                                title={`${league.displayName} Live`}
                                icon={Radio}
                                games={games}
                            />
                        )
                    })
                ) : (
                    <div className="content-card live-empty-state">
                        <Trophy size={28} />
                        <h3>No Live Events</h3>
                        <p>
                            SportsTracker will update automatically when an event
                            begins.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}