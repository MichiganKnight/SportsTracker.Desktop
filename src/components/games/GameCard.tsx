import type {
    GameState,
    GameSummary,
    GolfEventSummary,
    TeamGameSummary,
    TeamSummary,
} from '../../../shared/models/scoreboard.js'

interface GameCardProps {
    game: GameSummary
}

export function GameCard({ game }: GameCardProps) {
    if (game.eventType === 'golf') {
        return <GolfEventCard game={game} />
    }

    return <TeamGameCard game={game} />
}

function GolfEventCard({ game }: { game: GolfEventSummary }) {
    return (
        <article className="card sports-game-card shadow-sm h-100">
            <div className="card-body">
                <div className="golf-event-heading">
                    <div>
                        <span className="badge text-bg-success">PGA</span>
                        <h4>{game.name}</h4>
                    </div>

                    <span>{game.statusText}</span>
                </div>

                {game.leaders.length > 0 ? (
                    <div className="golf-leaders">
                        {game.leaders.slice(0, 5).map((leader) => (
                            <div className="golf-leader-row" key={leader.athleteId}>
                                <strong>{leader.position ?? '-'}</strong>

                                {leader.flagUrl && (
                                    <img src={leader.flagUrl} alt="" />
                                )}

                                <span>{leader.name}</span>
                                <strong>{leader.scoreToPar}</strong>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="golf-empty-message">
                        Leaderboard information is not available yet.
                    </p>
                )}
            </div>
        </article>
    )
}

function TeamGameCard({ game }: { game: TeamGameSummary }) {
    const isLive =
        game.state === 'in-progress' || game.state === 'halftime'

    const isFinal = game.state === 'final'

    const statusLabel = getStatusLabel(game.state)

    const statusClass = isLive
        ? 'text-bg-danger'
        : isFinal
            ? 'text-bg-dark'
            : game.state === 'scheduled'
                ? 'text-bg-primary'
                : 'text-bg-warning'

    const statusDetail =
        game.state === 'scheduled'
            ? formatGameDate(game.startTime)
            : game.statusText

    return (
        <article className="card sports-game-card shadow-sm h-100">
            <div className="card-body">
                <div className="sports-team-surface rounded-3 p-2 mb-3">
                    <TeamRow team={game.awayTeam} />
                    <TeamRow team={game.homeTeam} />
                </div>

                <div className="sports-game-footer border-top pt-3">
                    <div className="sports-game-status-row">
                        <div className="sports-game-status-main">
              <span className={`badge ${statusClass}`}>
                {isLive && <span className="game-live-dot" />}

                  {statusLabel}
              </span>

                            <span className="sports-status-detail">
                {statusDetail}
              </span>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
}

interface TeamRowProps {
    team: TeamSummary
}

function TeamRow({ team }: TeamRowProps) {
    return (
        <div className="sports-team-row">
            <div className="sports-team-logo">
                {team.logoUrl ? (
                    <img src={team.logoUrl} alt="" />
                ) : (
                    <span>{team.abbreviation.substring(0, 2)}</span>
                )}
            </div>

            <div className="sports-team-details">
                <strong>{team.displayName}</strong>
                <span>{team.record ?? team.abbreviation}</span>
            </div>

            <strong className="sports-team-score">{team.score}</strong>
        </div>
    )
}

function getStatusLabel(state: GameState): string {
    switch (state) {
        case 'in-progress':
        case 'halftime':
            return 'LIVE'

        case 'final':
            return 'FINAL'

        case 'postponed':
            return 'POSTPONED'

        case 'delayed':
            return 'DELAYED'

        case 'cancelled':
            return 'CANCELLED'

        default:
            return 'SCHEDULED'
    }
}

function formatGameDate(value: string): string {
    if (!value) {
        return 'TBD'
    }

    const date = new Date(value)

    if (Number.isNaN(date.getTime())) {
        return 'TBD'
    }

    return new Intl.DateTimeFormat(undefined, {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    }).format(date)
}