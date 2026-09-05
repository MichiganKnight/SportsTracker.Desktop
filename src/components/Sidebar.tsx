import {BsHouseDoor, BsCalendarEvent} from "react-icons/bs";
import type { League } from "../../shared/models/league.ts";
import { NavLink } from "react-router-dom";

export interface SidebarLeagueItem {
    league: League
    name: string
    icon?: string
    logo?: string
    darkLogo?: string
}

export interface SidebarProps {
    leagues: SidebarLeagueItem[];
}

function getNavigationClass({ isActive }: { isActive: boolean }): string {
    return [
        'list-group-item',
        'list-group-item-action',
        isActive ? 'active' : ''
    ].filter(Boolean).join(' ')
}

export function Sidebar({ leagues }: SidebarProps) {
    return (
        <div className="list-group list-group-flush">
            <div className="sidebar-header">
                GENERAL
            </div>

            <NavLink to="/dashboard" end className={getNavigationClass}>
                <span className="sidebar-icon">
                    <BsHouseDoor />
                </span>
                Dashboard
            </NavLink>

            <NavLink to="/games" className={getNavigationClass}>
                <span className="sidebar-icon">
                    <BsCalendarEvent />
                </span>
                Today's Games
            </NavLink>

            <div className="sidebar-header mt-4">
                LEAGUES
            </div>

            {leagues.map((league) => (
                <NavLink key={league.league} to={`/league/${league.league.toLowerCase()}`} className={getNavigationClass}>
                    <span className="me-2">
                        {league.logo && (
                            <img src={league.logo} alt={league.name} className="league-logo league-logo-light" />
                        )}

                        {league.darkLogo && (
                            <img src={league.darkLogo} alt={league.name} className="league-logo league-logo-dark" />
                        )}
                    </span>

                    {league.name}
                </NavLink>
            ))}
        </div>
    )
}