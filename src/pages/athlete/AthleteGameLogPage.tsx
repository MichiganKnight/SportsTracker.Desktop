import type { AthleteDetailsViewModel } from "../../../shared/view-models/athlete-details.ts";
import { useOutletContext } from "react-router-dom";
import { getAthletePerformanceMock } from "../../mock-data/athlete-performance.ts";

interface AthleteOutletContext {
    athlete: AthleteDetailsViewModel
}

export function AthleteGameLogPage() {
    const { athlete } = useOutletContext<AthleteOutletContext>()

    const { gameLog } = getAthletePerformanceMock(athlete)

    return (
        <div className="athlete-gamelog-page">
            <div className="athlete-gamelog-season-nav mb-4">
                <button type="button" className="btn btn-sm btn-primary">
                    {gameLog.season}
                </button>
            </div>

            <section className="card shadow-sm athlete-gamelog-card">
                <header className="card-header athlete-section-header">
                    {gameLog.season} Game Log
                </header>

                <div className="table-responsive athlete-gamelog-table-wrap">
                    <table className="table athlete-gamelog-table align-middle">
                        <thead>
                            <tr>
                                <th className="athlete-gamelog-date-column">
                                    Date
                                </th>

                                <th className="athlete-gamelog-opponent-column">
                                    Opponent
                                </th>

                                <th className="athlete-gamelog-result-column text-center">
                                    Result
                                </th>

                                {gameLog.columns.map((column) => (
                                    <th key={column.key} className="text-center" title={column.description}>
                                        {column.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {gameLog.games.map((game) => (
                                <tr key={game.id}>
                                    <td className="athlete-gamelog-date">
                                        {game.date}
                                    </td>

                                    <td>
                                        <div className="athlete-gamelog-opponent-link">
                                            <span className="text-secondary">
                                                {game.atVs}
                                            </span>

                                            <span className="fw-semibold">
                                                {game.opponentAbbreviation}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="text-center">
                                        <div className="athlete-gamelog-result">
                                            <span className={game.result === 'W' ? 'text-success fw-bold' : 'text-danger fw-bold'}>
                                                {game.result}
                                            </span>

                                            <span className="athlete-gamelog-score">
                                                {game.score}
                                            </span>
                                        </div>
                                    </td>

                                    {gameLog.columns.map((column) => (
                                        <td key={column.key} className="text-center athlete-gamelog-stat">
                                            {game.values[column.key] ?? '-'}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>

                        <tfoot>
                            <tr>
                                <th colSpan={3}>
                                    Season
                                </th>

                                {gameLog.columns.map((column) => (
                                    <td key={column.key} className="text-center">
                                        {gameLog.totals[column.key] ?? '-'}
                                    </td>
                                ))}
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </section>
        </div>
    )
}