import type { TeamDetailsViewModel } from "../../../shared/view-models/team.ts";
import { NavLink } from "react-router-dom";

interface TeamNavigationProps {
    team: TeamDetailsViewModel
}

function getNavigationClass({ isActive }: { isActive: boolean }): string {
    return isActive ? 'btn btn-primary': 'btn btn-outline-secondary'
}

export function TeamNavigation({ team }: TeamNavigationProps) {
    const baseUrl = `/team/${team.league.toLowerCase()}/${team.id}`

    return (
        <div className="team-navigation mb-4">
            <div className="btn-group"role="group" aria-label={`${team.displayName} Navigation`}>
                <NavLink to={baseUrl} end className={getNavigationClass}>
                    Overview
                </NavLink>

                <NavLink to={`${baseUrl}/schedule`} className={getNavigationClass}>
                    Schedule
                </NavLink>

                <NavLink to={`${baseUrl}/roster`} className={getNavigationClass}>
                    Roster
                </NavLink>
            </div>
        </div>
    )
}