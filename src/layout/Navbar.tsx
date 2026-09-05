import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";

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

export function Navbar() {
    const [theme, setTheme] = useState<Theme>(getInitialTheme)

    useEffect(() => {
        const root = document.documentElement

        root.dataset.theme = theme
        root.dataset.bsTheme = theme

        localStorage.setItem(themeStorageKey, theme)
    }, [theme])

    return (
        <nav className="navbar navbar-expand-lg navbar-sports shadow-sm">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    SportsTracker
                </a>

                <div className="navbar-controls ms-auto">
                    <button className="theme-toggle" type="button" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} onClick={() => setTheme((currentTheme) => currentTheme === 'dark' ? 'light' : 'dark',)}>
                        {theme === 'dark' ? (<Sun size={18} aria-hidden="true"/>) : (<Moon size={18} aria-hidden="true"/>)}
                    </button>

                    <div className="navbar-search-container">
                        <form className="navbar-search" method="get" data-navbar-search>
                            <div className="input-group">
                                <input className="form-control form-search-sports" type="search" placeholder="Search Teams and Athletes" aria-label="Search Teams and Athletes" aria-placeholder="Search Teams and Athletes" />

                                <button className="btn btn-outline-secondary" type="submit" id="search-sports">
                                    <BsSearch size={18} aria-hidden="true" />
                                </button>
                            </div>

                            <div className="navbar-search-results d-none" data-navbar-search-results></div>
                        </form>
                    </div>
                </div>
            </div>
        </nav>
    )
}