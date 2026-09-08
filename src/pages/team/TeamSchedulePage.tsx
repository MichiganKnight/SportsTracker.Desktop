import type { TeamPageViewModel } from "../../../shared/view-models/team.ts";
import type { GameCardViewModel } from "../../../shared/view-models/game-card.ts";
import { useOutletContext } from "react-router-dom";
import { GameCard } from "../../components/games/GameCard.tsx";

interface TeamOutletContext {
    teamPage: TeamPageViewModel
}

interface ScheduleMonth {
    key: string
    label: string
    games: GameCardViewModel[]
}

export function TeamSchedulePage() {
    const { teamPage } = useOutletContext<TeamOutletContext>()

    const months = groupScheduleByMonth(teamPage.schedule)

    return (
        <div className="team-schedule-page">
            {months.map((month) => (
                <section className="team-schedule-month" key={month.key}>
                    <header className="team-section-heading">
                        <h2 className="h4 mb-0">
                            {month.label}
                        </h2>

                        <span className="text-secondary small">
                            {month.games.length} Games
                        </span>
                    </header>

                    <div className="row g-3">
                        {month.games.map((game) => (
                            <div className="col-12 col-md-6 col-xl-4" key={game.id}>
                                <GameCard game={game} />
                            </div>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    )
}

function groupScheduleByMonth(games: GameCardViewModel[]): ScheduleMonth[] {
    const groups = new Map<string, ScheduleMonth>

    for (const game of games) {
        const date = new Date(game.startTime)

        const key = `${date.getFullYear()}-${date.getMonth()}`

        const label = new Intl.DateTimeFormat(undefined, {
            month: 'long',
            year: 'numeric'
        }).format(date)

        const existing = groups.get(key)

        if (existing) {
            existing.games.push(game)
        } else {
            groups.set(key, {
                key,
                label,
                games: [game]
            })
        }
    }

    return [...groups.values()].sort((left, right) => new Date(left.games[0].startTime).getTime() - new Date(right.games[0].startTime).getTime())
}