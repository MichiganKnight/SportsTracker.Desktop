import {
    BarChart3,
    CalendarDays,
    ListOrdered,
    Trophy,
} from 'lucide-react'
import { Navigate, useParams } from 'react-router-dom'
import { LeagueScoreboard } from '../components/games/LeagueScoreboard'
import { useScoreboard } from '../hooks/useScoreboard'
import {
    getLeagueConfiguration,
    isLeagueId,
    type LeagueId,
} from '../../shared/models/league'

export function LeaguePage() {
    const { leagueId } = useParams()

    if (!isLeagueId(leagueId)) {
        return <Navigate to="/" replace />
    }

    return <ValidLeaguePage leagueId={leagueId} />
}

interface ValidLeaguePageProps {
    leagueId: LeagueId
}

function ValidLeaguePage({ leagueId }: ValidLeaguePageProps) {
    const configuration = getLeagueConfiguration(leagueId)

    const {
        scoreboard,
        error,
        isLoading,
    } = useScoreboard(leagueId)

    return (
        <div className="league-page">
            <section className="league-page-header">
                <div className="league-title">
                    <div className="league-title-mark">
                        {scoreboard?.leagueLogoUrl ? (
                            <img
                                src={scoreboard.leagueLogoUrl}
                                alt=""
                            />
                        ) : (
                            <span>{configuration.icon}</span>
                        )}
                    </div>

                    <div>
                        <p className="page-eyebrow">League</p>
                        <h2>{configuration.displayName}</h2>

                        <p className="league-updated">
                            {scoreboard
                                ? `Last updated ${new Date(
                                    scoreboard.updatedAt,
                                ).toLocaleString()}`
                                : 'Loading the latest scoreboard'}
                        </p>
                    </div>
                </div>

                <div
                    className="btn-group league-navigation"
                    role="group"
                    aria-label={`${configuration.displayName} navigation`}
                >
                    <button className="btn btn-primary" type="button">
                        <CalendarDays size={16} />
                        Games
                    </button>

                    {configuration.eventType === 'team' && (
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            disabled
                        >
                            <ListOrdered size={16} />
                            Standings
                        </button>
                    )}

                    {leagueId === 'college-football' && (
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            disabled
                        >
                            <Trophy size={16} />
                            Rankings
                        </button>
                    )}

                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        disabled
                    >
                        <BarChart3 size={16} />
                        Leaders
                    </button>
                </div>
            </section>

            <LeagueScoreboard
                scoreboard={scoreboard}
                error={error}
                isLoading={isLoading}
            />
        </div>
    )
}