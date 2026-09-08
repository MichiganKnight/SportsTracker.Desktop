import { useOutletContext } from "react-router-dom";
import type { GameDetailsViewModel } from "../../../shared/view-models/game-details.ts";

export function GameBoxScorePage() {
    const { details } = useOutletContext<{ details: GameDetailsViewModel }>()

    return (
        <div className="boxscore-page">
            {details.boxScoreTeams.map((team) => (
                <section className="card shadow-sm mb-4 overflow-hidden" key={team.teamId}>
                    <header className="card-header boxscore-team-header">
                        <div className="d-flex align-items-center gap-3">
                            <span className="boxscore-team-placeholder">
                                {team.abbreviation.substring(0, 2)}
                            </span>

                            <div>
                                <h2 className="h5 mb-0">
                                    {team.teamName}
                                </h2>

                                <span className="text-secondary small">
                                    {team.abbreviation}
                                </span>
                            </div>
                        </div>
                    </header>

                    <div className="table-responsive">
                        <table className="table boxscore-table">
                            <thead>
                                <tr>
                                    <th className="boxscore-player-column">
                                        Player
                                    </th>

                                    {team.columns.map((column) => (
                                        <th key={column.key} className="text-center">
                                            {column.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {team.players.map((player) => (
                                    <tr key={player.id}>
                                        <td className="boxscore-player-column">
                                            <div className="boxscore-player-info">
                                                <div className="boxscore-player-name">
                                                    {player.name}
                                                </div>

                                                <div className="boxscore-player-position text-secondary">
                                                    {player.position}
                                                </div>
                                            </div>
                                        </td>

                                        {team.columns.map((column) => (
                                            <td key={column.key} className="text-center">
                                                {player.values[column.key]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>

                            <tfoot>
                                <tr className="boxscore-totals-row">
                                    <td className="fw-bold">Totals</td>

                                    {team.columns.map((column) => (
                                        <td key={column.key} className="text-center fw-bold">
                                            {team.totals[column.key]}
                                        </td>
                                    ))}
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </section>
            ))}
        </div>
    )
}