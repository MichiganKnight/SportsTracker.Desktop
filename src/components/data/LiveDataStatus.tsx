import type { ScoreboardSource } from "../../hooks/useScoreboards.ts";

interface LiveDataStatusProps {
    source: ScoreboardSource
    isLoading: boolean
    error?: string
}

export function LiveDataStatus({ source, isLoading, error, }: LiveDataStatusProps) {
    return (
        <>
            <div className="live-data-status mb-3">
                <div className="d-flex align-items-center gap-2">
                    <span className={`connection-dot ${source === 'live' ? 'scoreboard-source-live' : ''}`}/>

                    <span className="small text-secondary">
                        {isLoading ? 'Loading Live ESPN Data...' : source === 'live' ? 'Live ESPN Data' : 'Mock Data'}
                    </span>

                    {isLoading && (
                        <span className="spinner-border spinner-border-sm" role="status" aria-label="Loading live ESPN data"/>
                    )}
                </div>
            </div>

            {error && (
                <div className="alert alert-warning" role="alert">
                    Live data could not be loaded. SportsTracker is displaying mock fallback data.

                    <div className="small mt-1">
                        {error}
                    </div>
                </div>
            )}
        </>
    )
}