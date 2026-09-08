import type { LeagueInfo } from "../../../shared/models/league.ts";
import { useOutletContext, useSearchParams } from "react-router-dom";
import { getLeagueLeadersMock } from "../../mock-data/league-leaders.ts";
import type { LeaderRowViewModel } from "../../../shared/view-models/league-leaders.ts";

interface LeagueOutletContext {
    league: LeagueInfo
}

export function LeagueLeadersPage() {
    const { league } = useOutletContext<LeagueOutletContext>()

    const [searchParams, setSearchParams] = useSearchParams()

    const leaders = getLeagueLeadersMock(league.league)

    const requestedSection = searchParams.get('section')

    const selectedSection = leaders.sections.find((section) => section.id === requestedSection) ?? leaders.sections[0]

    if (!selectedSection) {
        return (
            <div className="card shadow-sm">
                <div className="card-body text-center py-5 text-secondary">
                    No League Leader Data is Currently Available
                </div>
            </div>
        )
    }

    const selectSection = (sectionId: string) => {
        if (sectionId === leaders.sections[0]?.id) {
            setSearchParams({})

            return
        }

        setSearchParams({ section: sectionId })
    }

    return (
        <div className="leaders-page">
            <div className="leaders-page-toolbar">
                <div>
                    <h2 className="h4 mb-1">
                        {selectedSection.title} Leaders
                    </h2>

                    <div className="text-secondary small">
                        {leaders.seasonName} Season
                    </div>
                </div>

                {leaders.sections.map((section) => (
                    <button key={section.id} type="button" className={section.id === selectedSection.id ? 'btn btn-sm btn-primary' : 'btn btn-sm btn-outline-secondary'} onClick={() => selectSection(section.id)}>
                        {section.title}
                    </button>
                ))}
            </div>

            <div className="row g-3">
                {selectedSection.categories.map((category) => (
                    <div className="col-12 col-lg-6 col-xxl-4" key={category.id}>
                        <section className="card shadow-sm leaders-card h-100">
                            <header className="card-header leaders-card-header">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h3 className="h5 mb-0">
                                        {category.displayName}
                                    </h3>

                                    <span className="leaders-card-abbreviation">
                                        {category.abbreviation}
                                    </span>
                                </div>
                            </header>

                            <div className="table-responsive">
                                <table className="table table-hover align-middle leaders-table">
                                    <thead>
                                        <tr>
                                            <th className="leaders-rank">
                                                #
                                            </th>

                                            <th>Player</th>

                                            <th className="text-end">
                                                {category.abbreviation}
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {category.leaders.map((leader) => (
                                            <LeaderRow key={leader.athleteId} leader={leader} />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </div>
                ))}
            </div>
        </div>
    )
}

function LeaderRow({ leader }: { leader: LeaderRowViewModel }) {
    return (
        <tr>
            <td className="text-secondary leaders-rank">
                {leader.rank}
            </td>

            <td className="leaders-player">
                <div className="d-flex align-items-center gap-2">
                    <span className="leaders-player-image-wrap">
                        <span className="leaders-player-placeholder" aria-hidden="true">
                            {getInitials(leader.athleteName)}
                        </span>
                    </span>

                    <div className="leaders-player-info">
                        <span className="leaders-player-name">
                            {leader.athleteName}
                        </span>

                        {leader.teamAbbreviation && (
                            <span className="leaders-team">
                                {leader.teamAbbreviation}
                            </span>
                        )}
                    </div>
                </div>
            </td>

            <td className="text-end leaders-value">
                {leader.displayValue}
            </td>
        </tr>
    )
}

function getInitials(name: string): string {
    return name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase()
}