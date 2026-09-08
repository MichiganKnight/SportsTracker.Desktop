import { useOutletContext } from "react-router-dom";
import type { GameDetailsViewModel } from "../../../shared/view-models/game-details.ts";

export function GameSummaryPage() {
    const { details } = useOutletContext<{ details: GameDetailsViewModel }>()

    return (
        <div className="row g-4">
            <div className="col-xl-8">
                <section className="card shadow-sm mb-4">
                    <header className="card-header">
                        Line Score
                    </header>

                    <div className="table-responsive">
                        <table className="table game-linescore">
                            <thead>
                                <tr>
                                    <th>Team</th>

                                    {details.lineScoreHeadings.map((heading) => (
                                        <th key={heading} className="text-center">
                                            {heading}
                                        </th>
                                    ))}

                                    <th className="text-center">
                                        Total
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {details.lineScores.map((team) => (
                                    <tr key={team.teamAbbreviation}>
                                        <th>{team.teamAbbreviation}</th>

                                        {team.periods.map((score, index) => (
                                            <td key={index} className="text-center">
                                                {score}
                                            </td>
                                        ))}

                                        <td className="text-center fw-bold">
                                            {team.total}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="card shadow-sm">
                    <header className="card-header">
                        Game Summary
                    </header>

                    <div className="card-body">
                        <h2 className="game-summary-headline">
                            {details.headline}
                        </h2>

                        <p className="game-summary-text text-secondary mb-0">
                            {details.summary}
                        </p>
                    </div>
                </section>
            </div>

            <div className="col-xl-4">
                <section className="card shadow-sm mb-4">
                    <header className="card-header">
                        Game Information
                    </header>

                    <div className="card-body">
                        {details.information.map((item) => (
                            <div className="game-detail-info-row" key={item.label}>
                                <span className="text-secondary">
                                    {item.label}
                                </span>

                                <strong>{item.value}</strong>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="card shadow-sm">
                    <header className="card-header">
                        Featured Athletes
                    </header>

                    <div className="card-body">
                        {details.featuredAthletes.map((athlete) => (
                            <div className="game-featured-athlete" key={athlete.id}>
                                <span className="game-featured-athlete-placeholder">
                                        {athlete.teamAbbreviation.substring(0, 2)}
                                    </span>

                                <div>
                                    <div className="fw-semibold">
                                        {athlete.name}
                                    </div>

                                    <div className="text-secondary small">
                                        {athlete.description}
                                    </div>
                                </div>

                                <strong className="ms-auto">
                                    {athlete.value}
                                </strong>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}