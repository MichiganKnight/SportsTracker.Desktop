import type { AthleteDetailsViewModel } from "../../../shared/view-models/athlete-details.ts";
import { LeagueConfiguration, Sport } from "../../../shared/models/league.ts";
import { NavLink } from "react-router-dom";

interface AthleteNavigationProps {
    athlete: AthleteDetailsViewModel
}

function getNavigationClass({ isActive }: { isActive: boolean }): string {
    return isActive ? 'btn btn-primary' : 'btn btn-outline-secondary'
}

export function AthleteNavigation({ athlete }: AthleteNavigationProps) {
    const configuration = LeagueConfiguration.get(athlete.league)

    const baseUrl = `/athlete/${athlete.league.toLowerCase()}/${athlete.id}`

    const isGolf = configuration.sport === Sport.Golf

    return (
        <div className="athlete-navigation mb-4">
            <div className="btn-group" role="group" aria-label={`${athlete.displayName} Navigation`}>
                <NavLink to={baseUrl} end className={getNavigationClass}>
                    Overview
                </NavLink>

                {!isGolf && (
                    <>
                        <NavLink to={`${baseUrl}/stats`} className={getNavigationClass}>
                            Stats
                        </NavLink>

                        <NavLink to={`${baseUrl}/game-log`} className={getNavigationClass}>
                            Game Log
                        </NavLink>

                        <NavLink to={`${baseUrl}/splits`} className={getNavigationClass}>
                            Splits
                        </NavLink>
                    </>
                )}
            </div>
        </div>
    )
}