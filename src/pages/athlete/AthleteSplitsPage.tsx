import type { AthleteDetailsViewModel } from "../../../shared/view-models/athlete-details.ts";
import { useOutletContext, useSearchParams } from "react-router-dom";
import { getAthletePerformanceMock } from "../../mock-data/athlete-performance.ts";

interface AthleteOutletContext {
    athlete: AthleteDetailsViewModel
}

export function AthleteSplitsPage() {
    const { athlete } = useOutletContext<AthleteOutletContext>()

    const [searchParams, setSearchParams] = useSearchParams()

    const performance = getAthletePerformanceMock(athlete)

    const selectedCategory = performance.splits.find((category) => category.id === searchParams.get('category')) ?? performance.splits[0]

    if (!selectedCategory) {
        return null
    }

    return (
        <section className="card shadow-sm athlete-splits-card">
            <div className="athlete-splits-category-nav" role="group" aria-label="Split Categories">
                {performance.splits.map((category) => (
                    <button key={category.id} type="button" className={category.id === selectedCategory.id ? 'btn btn-sm btn-primary' : 'btn btn-sm btn-outline-secondary'} onClick={() => setSearchParams(category === performance.splits[0] ? {} : {category: category.id})}>
                        {category.displayName}
                    </button>
                ))}
            </div>

            <div className="table-responsive">
                <table className="athlete-splits-table">
                    <thead>
                        <tr>
                            <th className="athlete-splits-name-column">
                                Split
                            </th>

                            {selectedCategory.columns.map((column) => (
                                <th key={column.key} title={column.description}>
                                    {column.label}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {selectedCategory.rows.map((row) => (
                            <tr key={row.name}>
                                <th className="athlete-splits-name">
                                    {row.name}
                                </th>

                                {selectedCategory.columns.map((column) => (
                                    <td key={column.key}>
                                        {row.values[column.key] ?? '-'}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}