import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import type { GameDetailsViewModel } from '../../../shared/view-models/game-details'

type PlayFilter = 'all' | 'scoring'

export function GamePlayByPlayPage() {
    const { details } = useOutletContext<{ details: GameDetailsViewModel }>()

    const [filter, setFilter] = useState<PlayFilter>('all')

    const periods = details.plays.reduce((groups, play) => {
            if (filter === 'scoring' && !play.isScoringPlay) {
                return groups
            }

            const existing = groups.get(play.period) ?? []
            existing.push(play)
            groups.set(play.period, existing)

            return groups
        }, new Map<string, typeof details.plays>(),
    )

    return (
        <div className="playbyplay-page">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="h4 mb-0">
                    Play-by-Play
                </h2>

                <div className="btn-group">
                    <button type="button" className={filter === 'all' ? 'btn btn-sm btn-primary' : 'btn btn-sm btn-outline-secondary'} onClick={() => setFilter('all')}>
                        All Plays
                    </button>

                    <button type="button" className={filter === 'scoring' ? 'btn btn-sm btn-primary' : 'btn btn-sm btn-outline-secondary'} onClick={() => setFilter('scoring')}>
                        Scoring
                    </button>
                </div>
            </div>

            {[...periods.entries()].map(([period, periodPlays]) => (
                    <section className="play-period" key={period}>
                        <header className="play-period-header">
                            {period}
                        </header>

                        <div className="card shadow-sm overflow-hidden">
                            {periodPlays.map((play) => (
                                <article key={play.id} className={['game-play', 'position-relative', play.isScoringPlay ? 'game-play-scoring' : '',].filter(Boolean).join(' ')}>
                                    <div className="game-play-main">
                                        <div className="game-play-content">
                                            <div className="game-play-meta text-secondary small">
                                                <strong className="game-play-clock">
                                                    {play.clock}
                                                </strong>

                                                {play.situation && (
                                                    <span>
                                                        {play.situation}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="game-play-text mt-1">
                                                {play.text}
                                            </div>
                                        </div>

                                        <div className="game-play-score">
                                            {play.awayScore}–{play.homeScore}
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                ),
            )}
        </div>
    )
}