import type { SearchResultType, SearchResultViewModel } from "../../shared/view-models/search.ts";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { SearchResultCard } from "../components/search/SearchResultCard.tsx";
import { getSearchResultTypeLabel, searchSports } from "../services/search.ts";

const resultTypeOrder: SearchResultType[] = [
    'league',
    'team',
    'athlete',
    'game',
    'tournament',
]

export function SearchPage() {
    const [searchParams, setSearchParams] = useSearchParams()
    const query = searchParams.get('q')?.trim() ?? ''

    const results = useMemo(() => searchSports(query), [query])

    const groupedResults = resultTypeOrder.map((type) => ({
        type,
        results: results.filter((result) => result.type === type)
    })).filter((group) => group.results.length > 0)

    const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const nextQuery = String(formData.get('q') ?? '').trim()

        if (nextQuery) {
            setSearchParams({ q: nextQuery })
        } else {
            setSearchParams({})
        }
    }

    return (
        <div className="search-page">
            <header className="search-page-header mb-4">
                <h1>Search SportsTracker</h1>

                <p className="text-secondary">
                    Find leagues, teams, athletes, games, and tournaments.
                </p>

                <form className="search-page-form" onSubmit={submitSearch}>
                    <div className="input-group">
                        <input type="search" name="q" className="form-control" defaultValue={query} placeholder="Search SportsTracker" aria-label="Search SportsTracker" autoFocus/>

                        <button type="submit" className="btn btn-primary">
                            <BsSearch aria-hidden="true"/>
                            <span>Search</span>
                        </button>
                    </div>
                </form>
            </header>

            {query.length < 2 ? (
                <SearchMessage title="Start Searching" message="Enter at least two characters to find sports content"/>
            ) : groupedResults.length === 0 ? (
                <SearchMessage title="No Reuslts Found" message={`Nothing matched "${query}". Try a team, athlete, or event name`}/>
            ) : (
                <>
                    <div className="search-results-summary mb-4">
                        {results.length}{' '}
                        {results.length === 1 ? 'Result' : 'Results'}{' '}
                        for <strong>"{query}"</strong>
                    </div>

                    <div className="search-sections">
                        {groupedResults.map((group) => (
                            <SearchSection key={group.type} type={group.type} results={group.results}/>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

function SearchSection({ type, results }: { type: SearchResultType, results: SearchResultViewModel[] }) {
    return (
        <section className="search-section mb-5">
            <header className="search-section-header mb-3">
                <h2 className="h5 mb-0">
                    {getSearchResultTypeLabel(type)}
                </h2>

                <span className="search-section-count">
                    {results.length}
                </span>
            </header>

            <div className="search-results-grid">
                {results.map((result) => (
                    <SearchResultCard key={result.id} result={result}/>
                ))}
            </div>
        </section>
    )
}

function SearchMessage({ title, message }: { title: string, message: string }) {
    return (
        <div className="card">
            <div className="card-body text-center py-5">
                <BsSearch className="search-empty-icon mb-3" size={32} aria-hidden="true"/>

                <h2 className="h5">{title}</h2>

                <p className="text-secondary mb-0">
                    {message}
                </p>
            </div>
        </div>
    )
}