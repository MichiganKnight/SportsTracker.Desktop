import { useEffect, useState } from 'react'
import {
    CalendarDays,
    LayoutDashboard,
    Radio,
    Search,
    Star,
} from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import { leagueConfigurations } from '../../shared/models/league'

const navigationItems = [
    {
        to: '/',
        label: 'Dashboard',
        icon: LayoutDashboard,
        end: true,
    },
    {
        to: '/live',
        label: 'Live',
        icon: Radio,
        end: false,
    },
    {
        to: '/games',
        label: 'Games',
        icon: CalendarDays,
        end: false,
    },
    {
        to: '/following',
        label: 'Following',
        icon: Star,
        end: false,
    },
]

export function AppShell() {
    const [desktopStatus, setDesktopStatus] = useState(() =>
        window.sportsTracker ? 'Connecting...' : 'Browser Preview',
    )

    useEffect(() => {
        const desktopApi = window.sportsTracker

        if (!desktopApi) {
            return
        }

        void desktopApi
            .getAppInfo()
            .then((info) => {
                setDesktopStatus(`Desktop ${info.version}`)
            })
            .catch(() => {
                setDesktopStatus('Desktop Unavailable')
            })
    }, [])

    return (
        <div className="app-shell">
            <aside className="sidebar">
                <div className="brand">
                    <div className="brand-mark">ST</div>

                    <div>
                        <strong>SportsTracker</strong>
                        <span>Desktop</span>
                    </div>
                </div>

                <nav
                    className="sidebar-navigation"
                    aria-label="Main Navigation"
                >
                    <p className="sidebar-heading">Overview</p>

                    {navigationItems.map((item) => {
                        const Icon = item.icon

                        return (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                end={item.end}
                                className={({ isActive }) =>
                                    `sidebar-link${isActive ? ' active' : ''}`
                                }
                            >
                                <Icon size={19} aria-hidden="true" />
                                <span>{item.label}</span>
                            </NavLink>
                        )
                    })}

                    <p className="sidebar-heading">Leagues</p>

                    {leagueConfigurations.map((league) => (
                        <NavLink
                            key={league.id}
                            to={`/leagues/${league.id}`}
                            className={({ isActive }) =>
                                `sidebar-link${isActive ? ' active' : ''}`
                            }
                        >
              <span className="league-mark" aria-hidden="true">
                {league.icon}
              </span>

                            <span>{league.displayName}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <span className="connection-dot" />
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
                        <Search
                            size={18}
                            aria-hidden="true"
                            className="search-icon"
                        />

                        <span>Search Teams and Athletes</span>
                        <kbd>Ctrl K</kbd>
                    </button>
                </header>

                <main className="page-content">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}