import { useEffect, useState } from 'react'
import {
    CalendarDays,
    LayoutDashboard,
    Moon,
    Radio,
    Search,
    Star,
    Sun
} from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import { leagueConfigurations } from '../../shared/models/league'

type Theme = 'dark' | 'light'

const themeStorageKey = 'sportsTracker.theme'

function getInitialTheme(): Theme {
    const savedTheme = localStorage.getItem(themeStorageKey)

    if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme
    }

    return window.matchMedia('(prefers-color-scheme: light)').matches
        ? 'light'
        : 'dark'
}

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

    const [theme, setTheme] = useState<Theme>(getInitialTheme)

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

    useEffect(() => {
        const root = document.documentElement

        root.dataset.theme = theme
        root.dataset.bsTheme = theme

        localStorage.setItem(themeStorageKey, theme)
    }, [theme])

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

                    <div className="topbar-actions">
                        <button className="search-button" type="button">
                            <Search
                                size={18}
                                aria-hidden="true"
                                className="search-icon"
                            />

                            <span>Search Teams and Athletes</span>
                            <kbd>Ctrl K</kbd>
                        </button>

                        <button
                            className="theme-toggle"
                            type="button"
                            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
                            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
                            onClick={() =>
                                setTheme((currentTheme) =>
                                    currentTheme === 'dark' ? 'light' : 'dark',
                                )
                            }
                        >
                            {theme === 'dark' ? (
                                <Sun size={18} aria-hidden="true" />
                            ) : (
                                <Moon size={18} aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </header>

                <main className="page-content">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}