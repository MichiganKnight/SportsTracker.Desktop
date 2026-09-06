import type { LeagueInfo } from "../../../shared/models/league.ts";
import { LeagueNavigation } from "./LeagueNavigation.tsx";

interface LeagueHeaderProps {
    league: LeagueInfo
}

export function LeagueHeader({ league }: LeagueHeaderProps) {
    return (
        <header className="league-header-page">
            <div className="league-page-title">
                <div className="league-page-icon" aria-hidden="true">
                    {league.icon}
                </div>

                <div>
                    <h1 className="mb-1">
                        {league.displayName}
                    </h1>

                    <div className="text-secondary small">
                        Presentation Preview - Static Data
                    </div>
                </div>
            </div>

            <LeagueNavigation league={league} />
        </header>
    )
}