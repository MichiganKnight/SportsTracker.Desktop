import type { LeagueInfo } from "../../../shared/models/league.ts";
import { useOutletContext, useSearchParams } from "react-router-dom";
import { getStandingsMock } from "../../mock-data/standings.ts";
import type { StandingsTeamViewModel, StandingsView } from "../../../shared/view-models/standings.ts";

interface LeagueOutletContext {
    league: LeagueInfo
}

export function StandingsPage() {
    const { league } = useOutletContext<LeagueOutletContext>()

    const [searchParams, setSearchParams] = useSearchParams()

    const standings = getStandingsMock(league.league, searchParams.get('view'))

    if (!standings) {
        return (
            <div className="card shadow-sm">
                <div className="card-body text-center py-5">
                    <h2 className="h5 mb-2">
                        Standings Unavailable
                    </h2>

                    <p className="text-secondary mb-0">
                        Standings Are Not Available For This League
                    </p>
                </div>
            </div>
        )
    }

    const selectView = (view: StandingsView) => {
        if (view === standings.availableViews[0]) {
            setSearchParams({})

            return
        }

        setSearchParams({ view })
    }

    return (
        <div className="standings-page">
            <div className="standings-page-toolbar">
                <div>
                    <h2 className="h4 mb-1">
                        Standings
                    </h2>

                    <div className="text-secondary small">
                        {standings.season} Season
                    </div>
                </div>

                <div className="btn-group standings-view-filter" role="group" aria-label="Standings View">
                    {standings.availableViews.map((view) => (
                        <button key={view} type="button" className={view === standings.selectedView ? 'btn btn-sm btn-primary' : 'btn btn-sm btn-outline-secondary'} onClick={() => selectView(view)}>
                            {getViewLabel(view)}
                        </button>
                    ))}
                </div>
            </div>

            {standings.groups.map((group) => (
                <section className="card shadow-sm standings-group" key={group.name}>
                    <header className="card-header standings-group-header">
                        <div className="d-flex justify-content-between align-items-center">
                            <h3 className="h5 mb-0">
                                {group.name}
                            </h3>

                            {group.abbreviation && (
                                <span className="standings-group-abbreviation">
                                    {group.abbreviation}
                                </span>
                            )}
                        </div>
                    </header>

                    <div className="table-responsive">
                        <table className="table table-hover align-middle standings-table">
                            <thead>
                                <tr>
                                    <th className="standings-rank">
                                        #
                                    </th>

                                    <th>Team</th>

                                    <th className="text-end">W</th>
                                    <th className="text-end">L</th>

                                    {standings.showTies && (
                                        <th className="text-end">
                                            T
                                        </th>
                                    )}

                                    <th className="text-end">PF</th>
                                    <th className="text-end">PA</th>
                                    <th className="text-end">PCT</th>

                                    {standings.showGamesBack && (
                                        <th className="text-end">
                                            GB
                                        </th>
                                    )}

                                    <th className="text-end">
                                        DIFF
                                    </th>

                                    <th className="text-end">
                                        STRK
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {group.teams.map((team, index) => (
                                    <StandingTeamRow key={team.id} team={team} rank={index + 1} showTies={standings.showTies} showGamesBack={standings.showGamesBack} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            ))}
       </div>
    )
}

interface StandingTeamRowProps {
    team: StandingsTeamViewModel
    rank: number
    showTies: boolean
    showGamesBack: boolean
}

function StandingTeamRow({ team, rank, showTies, showGamesBack }: StandingTeamRowProps) {
    const differentialClass = team.differential > 0 ? 'standings-positive' : team.differential < 0 ? 'standings-negative' : 'text-secondary'

    return (
        <tr>
            <td className="text-secondary standings-rank">
                {rank}
            </td>

            <td className="standings-team">
                <div className="d-flex align-items-center gap-2">
                    <span className="standings-team-logo-wrap">
                        <span className="standings-team-placeholder" aria-hidden="true">
                            {team.abbreviation.substring(0, 2)}
                        </span>
                    </span>

                    <div className="standings-team-info">
                        <span className="standings-team-name">
                            {team.name}
                        </span>

                        <span className="standings-team-abbreviation text-secondary">
                            {team.abbreviation}
                        </span>
                    </div>
                </div>
            </td>

            <td className="text-end">{team.wins}</td>
            <td className="text-end">{team.losses}</td>

            {showTies && (
                <td className="text-end">
                    {team.ties ?? 0}
                </td>
            )}

            <td className="text-end">{team.pointsFor}</td>
            <td className="text-end">{team.pointsAgainst}</td>
            <td className="text-end">{team.winPercentage}</td>

            {showGamesBack && (
                <td className="text-end">
                    {team.gamesBack}
                </td>
            )}

            <td className={`text-end ${differentialClass}`}>
                {formatDifferential(team.differential)}
            </td>

            <td className="text-end">{team.streak}</td>
        </tr>
    )
}

function getViewLabel(view: StandingsView): string {
    switch (view) {
        case 'overall':
            return 'Overall'

        case 'conference':
            return 'Conference'

        case 'league':
            return 'League'

        case 'division':
            return 'Division'
    }
}

function formatDifferential(value: number): string {
    if (value > 0) {
        return `+${value}`
    }

    return value.toString()
}