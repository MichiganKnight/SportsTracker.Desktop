import {
    CalendarDays,
    ChevronLeft,
    ChevronRight,
    LoaderCircle,
    Trophy,
} from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { GameSection } from '../components/games/GameSection'
import { useAllScoreboards } from '../hooks/useAllScoreboards'
import { getLeagueConfiguration } from '../../shared/models/league'

export function GamesPage() {
    const [searchParams, setSearchParams] = useSearchParams()

    const today = getCurrentLocalDate()
    const requestedDate = getValidDate(searchParams.get('date')) ?? today

    const {
        scoreboards,
        error,
        isLoading,
    } = useAllScoreboards(requestedDate)

    const scoreboardsWithEvents = scoreboards.filter(
        (scoreboard) => scoreboard.games.length > 0,
    )

    const changeDate = (days: number) => {
        setSearchParams({
            date: addDays(requestedDate, days),
        })
    }

    const selectDate = (date: string) => {
        if (getValidDate(date)) {
            setSearchParams({ date })
        }
    }

    return (
        <div className="games-page">
            <section className="page-heading">
                <div>
                    <p className="page-eyebrow">Schedule</p>
                    <h2>Games</h2>
                    <p>
                        Browse games and tournaments across every supported league.
                    </p>
                </div>
            </section>

            <section className="games-date-card shadow-sm">
                <button
                    className="games-date-nav-button"
                    type="button"
                    onClick={() => changeDate(-1)}
                >
                    <ChevronLeft size={18} />
                    Previous
                </button>

                <div className="games-date-center">
                    <strong>{formatDisplayDate(requestedDate)}</strong>

                    <div className="games-date-actions">
                        <CalendarDays size={15} />

                        <input
                            type="date"
                            value={requestedDate}
                            onChange={(event) => selectDate(event.target.value)}
                            aria-label="Select scoreboard date"
                        />

                        {requestedDate !== today && (
                            <button
                                type="button"
                                onClick={() => setSearchParams({ date: today })}
                            >
                                Today
                            </button>
                        )}
                    </div>
                </div>

                <button
                    className="games-date-nav-button"
                    type="button"
                    onClick={() => changeDate(1)}
                >
                    Next
                    <ChevronRight size={18} />
                </button>
            </section>

            <div className="games-page-scoreboards">
                {isLoading && (
                    <div className="content-card scoreboard-message">
                        <LoaderCircle className="spin" size={26} />
                        <p>Loading games...</p>
                    </div>
                )}

                {!isLoading && error && (
                    <div className="content-card scoreboard-message error-message">
                        <p>{error}</p>
                    </div>
                )}

                {!isLoading &&
                    !error &&
                    scoreboardsWithEvents.length === 0 && (
                        <div className="content-card live-empty-state">
                            <Trophy size={28} />
                            <h3>No Events</h3>
                            <p>No games or tournaments were found for this date.</p>
                        </div>
                    )}

                {!isLoading &&
                    !error &&
                    scoreboardsWithEvents.map((scoreboard) => {
                        const league = getLeagueConfiguration(
                            scoreboard.league,
                        )

                        return (
                            <GameSection
                                key={scoreboard.league}
                                title={league.displayName}
                                icon={CalendarDays}
                                games={scoreboard.games}
                            />
                        )
                    })}
            </div>
        </div>
    )
}

function getCurrentLocalDate(): string {
    return formatDateValue(new Date())
}

function addDays(value: string, days: number): string {
    const date = new Date(`${value}T12:00:00`)
    date.setDate(date.getDate() + days)

    return formatDateValue(date)
}

function formatDateValue(date: Date): string {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
}

function getValidDate(value: string | null): string | null {
    if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return null
    }

    const date = new Date(`${value}T12:00:00`)

    return Number.isNaN(date.getTime()) ? null : value
}

function formatDisplayDate(value: string): string {
    const date = new Date(`${value}T12:00:00`)

    return new Intl.DateTimeFormat(undefined, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    }).format(date)
}