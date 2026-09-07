import type { LeagueInfo } from "../../../shared/models/league.ts";
import { useOutletContext, useSearchParams } from "react-router-dom";
import { getRankingsMock } from "../../mock-data/rankings.ts";
import type { RankedTeamViewModel, RankingPollType } from "../../../shared/view-models/rankings.ts";

interface LeagueOutletContext {
    league: LeagueInfo
}

export function RankingsPage() {
    const { league } = useOutletContext<LeagueOutletContext>()

    const [searchParams, setSearchParams] = useSearchParams()

    const rankings = getRankingsMock(league.league)

    if (!rankings || rankings.polls.length === 0) {
        return (
            <div className="card shadow-sm rankings-empty">
                <div className="card-body text-center py-5">
                    <h2 className="h5 mb-2">
                        Rankings Unavailable
                    </h2>

                    <p className="text-secondary mb-0">
                        Rankings Are Only Available for College Football
                    </p>
                </div>
            </div>
        )
    }

    const requestedPoll = searchParams.get('poll')

    const selectedPoll = rankings.polls.find((poll) => poll.type === requestedPoll) ?? rankings.polls[0]

    const selectPoll = (poll: RankingPollType) => {
        if (poll === rankings.polls[0].type) {
            setSearchParams({})

            return
        }

        setSearchParams({ poll })
    }

    return (
        <div className="rankings-page">
            <div className="rankings-page-toolbar">
                <div>
                    <h2 className="h4 mb-1">
                        Rankings
                    </h2>

                    <div className="text-secondary small">
                        {rankings.season} Season
                    </div>
                </div>

                <div className="rankings-poll-filter" role="group" aria-label="Ranking Poll">
                    {rankings.polls.map((poll) => (
                        <button key={poll.type} type="button" className={poll.type === selectedPoll.type ? 'btn btn-sm btn-primary' : 'btn btn-sm btn-outline-secondary'} onClick={() => selectPoll(poll.type)}>
                            {poll.shortName}
                        </button>
                    ))}
                </div>
            </div>

            <section className="ranking-poll">
                <header className="ranking-poll-heading">
                    <div>
                        <h3 className="h5 mb-1">
                            {selectedPoll.name}
                        </h3>

                        <div className="text-secondary small">
                            {selectedPoll.weekName}
                        </div>
                    </div>

                    <div className="text-secondary small">
                        Updated {selectedPoll.updatedLabel}
                    </div>
                </header>

                <div className="card shadow-sm rankings-card">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle rankings-table">
                            <thead>
                                <tr>
                                    <th className="rankings-rank">
                                        RK
                                    </th>

                                    <th>Team</th>

                                    <th className="text-center">
                                        Record
                                    </th>

                                    <th className="text-center">
                                        Prev
                                    </th>

                                    <th className="text-center">
                                        Points
                                    </th>

                                    <th className="text-center">
                                        1st
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {selectedPoll.teams.map((team) => (
                                    <RankedTeamRow key={team.id}  team={team} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    )
}

function RankedTeamRow({ team }: { team: RankedTeamViewModel }) {
    const previousRankClass = team.previousRank > team.rank ? 'ranking-moved-up' : team.previousRank < team.rank ? 'ranking-moved-down' : ''

    return (
        <tr>
            <td className="rankings-rank">
                <span>{team.rank}</span>
            </td>

            <td className="rankings-team">
                <div className="d-flex align-items-center gap-3">
                    <span className="rankings-team-mark" aria-hidden="true">
                        {team.abbreviation.substring(0, 2)}
                    </span>

                    <div className="rankings-team-info">
                        <span className="rankings-team-name">
                            {team.name}
                        </span>

                        <span className="text-secondary small">
                            {team.conference}
                        </span>
                    </div>
                </div>
            </td>

            <td className="text-center fw-medium">
                {team.record}
            </td>

            <td className={`text-center ${previousRankClass}`}>
                {formatPreviousRank(team)}
            </td>

            <td className="text-center">
                {team.points > 0 ? team.points.toLocaleString() : '-'}
            </td>

            <td className="text-center">
                {team.firstPlaceVotes > 0 ? team.firstPlaceVotes : ''}
            </td>
        </tr>
    )
}

function formatPreviousRank(team: RankedTeamViewModel): string {
    if (team.previousRank <= 0) {
        return '-'
    }

    if (team.previousRank === team.rank) {
        return team.previousRank.toString()
    }

    const indicator = team.rank < team.previousRank ? '↑' : '↓'

    return `${team.previousRank} ${indicator}`
}