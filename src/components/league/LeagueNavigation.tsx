import { League, type LeagueInfo, Sport } from "../../../shared/models/league.ts";
import { NavLink } from "react-router-dom";
import { BsBarChart, BsCalendarEvent, BsListOl, BsTrophy } from "react-icons/bs";

interface LeagueNavigationProps {
    league: LeagueInfo
}

function getNavigationClass({ isActive }: { isActive: boolean }): string {
    return [
        'btn',
        isActive ? 'btn-primary' : 'btn-outline-secondary'
    ].join(' ')
}

export function LeagueNavigation({ league }: LeagueNavigationProps) {
    const leagueId = league.league.toLowerCase()
    const isGolf = league.sport === Sport.Golf

    return (
        <div className="btn-group league-navigation" role="group" aria-label={`${league.displayName} Navigation`}>
            <NavLink to={`/league/${leagueId}`} end className={getNavigationClass}>
                <BsCalendarEvent aria-hidden="true" />

                Games
            </NavLink>

            {!isGolf && (
                <NavLink to={`/league/${leagueId}/standings`} className={getNavigationClass}>
                    <BsListOl aria-hidden="true" />

                    Standings
                </NavLink>
            )}

            {league.league === League.CFB && (
                <NavLink to={`/league/${leagueId}/rankings`} className={getNavigationClass}>
                    <BsTrophy aria-hidden="true" />

                    Rankings
                </NavLink>
            )}

            <NavLink to={`/league/${leagueId}/leaders`} className={getNavigationClass}>
                <BsBarChart aria-hidden="true" />

                Leaders
            </NavLink>
        </div>
    )
}