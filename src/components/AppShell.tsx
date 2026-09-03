import { useEffect, useState } from 'react';
import { CalendarDays, LayoutDashboard, Radio, Search, Star } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

const navigationItems = [
    {
        to: '/',
        label: 'Dashboard',
        icon: LayoutDashboard,
        end: true
    },
    {
        to: '/live',
        label: 'Live',
        icon: Radio
    },
    {
        to: '/games',
        label: 'Games',
        icon: CalendarDays
    },
    {
        to: '/following',
        label: 'Following',
        icon: Star
    }
]

const leagues = [
    { id: 'nfl', name: 'NFL' },
    { id: 'nba', name: 'NBA' },
    { id: 'mlb', name: 'MLB' },
    { id: 'nhl', name: 'NHL' },
    { id: 'college-football', name: 'College Football' },
    { id: 'college-basketball', name: 'College Basketball' },
    { id: 'pga', name: 'PGA Tour' },
]

export function AppShell() {
    const [desktopStatus, setDesktopStatus] = useState(() => window.sportsTracker ? 'Connecting...' : 'Browser Preview')

    useEffect(() => {
        if (!window.sportsTracker) {
            return;
        }

        void window.sportsTracker.getAppInfo().then((info) => {
            setDesktopStatus(`Desktop ${info.version}`)
        }).catch(() => {
            setDesktopStatus('Desktop Unavailable')
        })
    }, [])

    return (
        <div className="app-shell">
            <aside className="sidebar">
                <div className="brand">
                    <div className="brannd-mark">ST</div>

                    <div>
                        <strong>SportsTracker</strong>
                        <span>Desktop</span>
                    </div>
                </div>

                <nav className="sidebar-navigation" aria-label="Main Navigation">
                    <p className="sidebar-heading">Overview</p>

                    {navigationItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <NavLink key={item.to} to={item.to} end={item.end}
                                     className={({ isActive }) => isActive ? 'active' : ''}>

                                <Icon size={19} aria-hidden="true"/>
                                <span>{item.label}</span>
                            </NavLink>
                        )
                    })}

                    <p className="sidebar-heading">Leagues</p>

                    {leagues.map((league) => (
                        <NavLink key={league.id} to={`/leagues/${league.id}`}
                                 className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                            <span className="league-mark">
                                {league.name.substring(0, 2)}
                            </span>

                            <span>{league.name}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <span className="connection-dot"/>
                    <span>{desktopStatus}</span>
                </div>
            </aside>

            <div className="app-workspace">
                <header className="topbar">
                    <div>
                        <p className="topbar-eyebrow">SportsTracker</p>
                        <h1>Sports at a Glance</h1>
                    </div>

                    <button className="search-button" type="button">
                        <Search size={18} aria-hidden="true" className="search-icon"/>
                        <span>Search Teams and Athletes</span>
                        <kbd>Ctrl K</kbd>
                    </button>
                </header>

                <main className="page-content">
                    <Outlet/>
                </main>
            </div>
        </div>
    )
}