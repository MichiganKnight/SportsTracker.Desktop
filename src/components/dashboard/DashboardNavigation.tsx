import { NavLink } from "react-router-dom";

export function DashboardNavigation() {
    const baseBtnClass = 'btn';

    const getButtonClass = ({ isActive }: { isActive: boolean }) => `${baseBtnClass} ${isActive ? 'btn-primary' : 'btn-outline-secondary'}`;

    return (
        <div className="mb-4">
            <div className="btn-group" role="group" aria-label="Dashboard Navigation">
                <NavLink to="/dashboard" end className={getButtonClass}>
                    Overview
                </NavLink>

                <NavLink to="/dashboard/following" className={getButtonClass}>
                    Following
                </NavLink>

                <NavLink to="/dashboard/live" className={getButtonClass}>
                    Live
                </NavLink>

                <NavLink to="/dashboard/leagues" className={getButtonClass}>
                    Leagues
                </NavLink>
            </div>
        </div>
    )
}