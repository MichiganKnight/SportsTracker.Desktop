import { Clock3, Flag, Radio } from 'lucide-react'
import type {
    Scoreboard,
    TeamGameSummary,
} from '../../../shared/models/scoreboard'
import { GameSection } from './GameSection'
import { ScoreboardGrid } from './ScoreboardGrid'

interface LeagueScoreboardProps {
    scoreboard: Scoreboard | null
    error: string | null
    isLoading: boolean
}

export function LeagueScoreboard({
                                     scoreboard,
                                     error,
                                     isLoading,
                                 }: LeagueScoreboardProps) {
    if (
        isLoading ||
        error ||
        !scoreboard ||
        scoreboard.games.length === 0
    ) {
        return (
            <ScoreboardGrid
                scoreboard={scoreboard}
                error={error}
                isLoading={isLoading}
            />
        )
    }

    if (scoreboard.league === 'pga') {
        return (
            <ScoreboardGrid
                scoreboard={scoreboard}
                error={null}
                isLoading={false}
            />
        )
    }

    const teamGames = scoreboard.games.filter(
        (game): game is TeamGameSummary =>
            game.eventType === 'team',
    )

    const liveGames = teamGames
        .filter(
            (game) =>
                game.state === 'in-progress' ||
                game.state === 'halftime',
        )
        .sort(compareStartTimesAscending)

    const upcomingGames = teamGames
        .filter(
            (game) =>
                game.state === 'scheduled' ||
                game.state === 'delayed' ||
                game.state === 'postponed',
        )
        .sort(compareStartTimesAscending)

    const finalGames = teamGames
        .filter(
            (game) =>
                game.state === 'final' ||
                game.state === 'cancelled',
        )
        .sort(compareStartTimesDescending)

    return (
        <div className="league-game-sections">
            <GameSection
                title="Live Games"
                icon={Radio}
                games={liveGames}
            />

            <GameSection
                title="Upcoming Games"
                icon={Clock3}
                games={upcomingGames}
            />

            <GameSection
                title="Final Games"
                icon={Flag}
                games={finalGames}
            />
        </div>
    )
}

function compareStartTimesAscending(
    left: TeamGameSummary,
    right: TeamGameSummary,
): number {
    return getTimestamp(left.startTime) - getTimestamp(right.startTime)
}

function compareStartTimesDescending(
    left: TeamGameSummary,
    right: TeamGameSummary,
): number {
    return getTimestamp(right.startTime) - getTimestamp(left.startTime)
}

function getTimestamp(value: string): number {
    const timestamp = new Date(value).getTime()

    return Number.isNaN(timestamp) ? 0 : timestamp
}