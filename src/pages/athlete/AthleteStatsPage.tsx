import type { AthleteDetailsViewModel } from "../../../shared/view-models/athlete-details.ts";
import { useOutletContext, useSearchParams } from "react-router-dom";
import { getAthletePerformanceMock } from "../../mock-data/athlete-performance.ts";

interface AthleteOutletContext {
    athlete: AthleteDetailsViewModel
}

export function AthleteStatsPage() {
    const { athlete } = useOutletContext<AthleteOutletContext>()

    const [searchParams, setSearchParams] = useSearchParams()

    const performance = getAthletePerformanceMock(athlete)

    const requestedCategory = searchParams.get('category')

    const selectedCategory = performance.stats.find((category) => category.id === requestedCategory) ?? performance.stats[0]

    if (!selectedCategory) {
        return null
    }

    return (
        <div className="athlete-stats-page">
            <div className="athlete-stats-category-nav mb-4">
                <div className="btn-group" role="group" aria-label="Statistics Categories">
                    {performance.stats.map((category) => (
                        <button key={category.id} type="button" className={category.id === selectedCategory.id ? 'btn btn-sm btn-primary' : 'btn btn-sm btn-outline-secondary'} onClick={() => setSearchParams(category === performance.stats[0] ? {} : { category: category.id })}>
                            {category.displayName}
                        </button>
                    ))}
                </div>
            </div>

            <section className="card athlete-stats-category shadow-sm">
                <header className="card-header athlete-section-header">
                    {selectedCategory.displayName}
                </header>

                <div className="table-responsive athlete-stats-table-wrap">
                    <table className="table athlete-stats-table align-middle">
                        <thead>
                            <tr>
                                <th>Season</th>
                                <th>Team</th>

                                {selectedCategory.columns.map((column) => (
                                    <th key={column.key} className="text-center" title={column.description}>
                                        {column.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {selectedCategory.rows.map((row) => (
                                <tr key={row.season}>
                                    <th className="athlete-stats-season">
                                        {row.season}
                                    </th>

                                    <td>
                                        <span className="athlete-stats-team">
                                            {row.teamAbbreviation}
                                        </span>
                                    </td>

                                    {selectedCategory.columns.map((column) => (
                                        <td key={column.key} className="text-center">
                                            {row.values[column.key] ?? '-'}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>

                        <tfoot>
                            <tr>
                                <th>Career</th>
                                <th>{athlete.teamAbbreviation}</th>

                                {selectedCategory.columns.map((column) => (
                                    <td key={column.key} className="text-center">
                                        {selectedCategory.totals[column.key] ?? '-'}
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