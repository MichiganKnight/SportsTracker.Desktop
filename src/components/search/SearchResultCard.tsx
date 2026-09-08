import type { SearchResultType, SearchResultViewModel } from "../../../shared/view-models/search.ts";
import { Link } from "react-router-dom";
import { BsCalendarEvent, BsDiagram3Fill, BsFlagFill, BsPeopleFill, BsPersonFill } from "react-icons/bs";

interface SearchResultCardProps {
    result: SearchResultViewModel
}

export function SearchResultCard({ result }: SearchResultCardProps) {
    return (
        <Link            to={result.route}            className="card search-result-card text-decoration-none"        >
            <div className="card-body search-result-body">
                <div className="search-result-image-wrap">
                    <span className="search-result-image-placeholder">
                        {result.imageText || (
                            <ResultTypeIcon type={result.type} />
                        )}
                    </span>
                </div>

                <div className="search-result-content">
                    <div className="search-result-title">
                        {result.title}
                    </div>

                    <div className="search-result-meta">
                        <ResultTypeIcon type={result.type} />

                        <span>{result.subtitle}</span>
                    </div>

                    {result.description && (
                        <div className="search-result-description">
                            {result.description}
                        </div>
                    )}

                    {result.date && (
                        <div className="search-result-date">
                            {formatResultDate(result.date)}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    )
}

function ResultTypeIcon({ type }: { type: SearchResultType }) {
    const icons: Record<SearchResultType, React.ReactNode> = {
        league: <BsDiagram3Fill aria-hidden="true" />,
        team: <BsPeopleFill aria-hidden="true" />,
        athlete: <BsPersonFill aria-hidden="true" />,
        game: <BsCalendarEvent aria-hidden="true" />,
        tournament: <BsFlagFill aria-hidden="true" />,
    }

    return icons[type]
}

function formatResultDate(value: string): string {
    return new Intl.DateTimeFormat(undefined, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    }).format(new Date(value))
}