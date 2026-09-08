import type { RosterPlayerViewModel, TeamPageViewModel } from "../../../shared/view-models/team.ts";
import { useOutletContext } from "react-router-dom";

interface TeamOutletContext {
    teamPage: TeamPageViewModel
}

export function TeamRosterPage() {
    const { teamPage } = useOutletContext<TeamOutletContext>()

    return (
        <div className="team-roster-page">
            {teamPage.roster.map((group) =>  (
                <section className="team-roster-group" key={group.id}>
                    <header className="team-section-heading">
                        <h2 className="h4 mb-0">
                            {group.name}
                        </h2>

                        <span className="text-secondary small">
                            {group.players.length} Players
                        </span>
                    </header>

                    <div className="card shadow-sm overflow-hidden">
                        <div className="table-responsive">
                            <table className="table align-middle roster-table">
                                <thead>
                                    <tr>
                                        <th>Player</th>
                                        <th>Pos</th>
                                        <th>Age</th>
                                        <th>Height</th>
                                        <th>Weight</th>
                                        <th>B/T</th>
                                        <th>Exp</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {group.players.map((player) => (
                                        <RosterPlayerRow key={player.id} player={player} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            ))}
        </div>
    )
}

function RosterPlayerRow({ player }: { player: RosterPlayerViewModel }) {
    const batsThrows = player.bats || player.throws ? `${player.bats ?? '-'} / ${player.throws ?? '-'}` : '-'

    return (
        <tr>
            <td className="roster-player">
                <div className="d-flex align-items-center gap-3">
                    <span className="roster-player-placeholder" aria-hidden="true">
                        {player.initials}
                    </span>

                    <div>
                        <div className="fw-semibold">
                            {player.jersey && (
                                <span className="text-secondary me-1">
                                    #{player.jersey}
                                </span>
                            )}

                            {player.displayName}
                        </div>

                        {player.birthPlace && (
                            <div className="text-secondary small">
                                {player.birthPlace}
                            </div>
                        )}
                    </div>
                </div>
            </td>

            <td>{player.positionAbbreviation ?? '—'}</td>
            <td>{player.age ?? '—'}</td>
            <td>{player.height ?? '—'}</td>
            <td>{player.weight ?? '—'}</td>
            <td>{batsThrows}</td>

            <td>
                {player.experienceYears !== undefined ? `${player.experienceYears} Yrs` : '-'}
            </td>
        </tr>
    )
}