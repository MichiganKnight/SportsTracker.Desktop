import { Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { searchSports } from "../services/search.ts";

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

    const [query, setQuery] = useState('')
    const [isSearchOpen, setIsSearchOpen] = useState(false)

    const searchContainerRef = useRef<HTMLDivElement>(null)
    const searchInputRef = useRef<HTMLInputElement>(null)

    const navigate = useNavigate()

    const trimmedQuery = query.trim()

    const searchResults = trimmedQuery.length >= 2 ? searchSports(trimmedQuery, 5) : []

    useEffect(() => {
        const root = document.documentElement

        root.dataset.theme = theme
        root.dataset.bsTheme = theme

        localStorage.setItem(themeStorageKey, theme)
    }, [theme])

    useEffect(() => {
        const handlePointerDown = (event: PointerEvent,) => {
            const target = event.target

            if (target instanceof Node && !searchContainerRef.current?.contains(target)) {
                setIsSearchOpen(false)
            }
        }

        const handleKeyDown = (event: KeyboardEvent,) => {
            if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
                event.preventDefault()
                searchInputRef.current?.focus()
                setIsSearchOpen(true)
            }

            if (event.key === 'Escape') {
                setIsSearchOpen(false)
                searchInputRef.current?.blur()
            }
        }

        document.addEventListener('pointerdown', handlePointerDown,)
        document.addEventListener('keydown', handleKeyDown,)

        return () => {
            document.removeEventListener('pointerdown', handlePointerDown,)
            document.removeEventListener('keydown', handleKeyDown,)
        }
    }, [])

    const submitSearch = (event: React.FormEvent<HTMLFormElement>,) => {
        event.preventDefault()

        if (trimmedQuery.length < 2) {
            searchInputRef.current?.focus()

            return
        }

        setIsSearchOpen(false)
        navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`)
    }

    const selectResult = () => {
        setIsSearchOpen(false)
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-sports shadow-sm">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/dashboard">
                    SportsTracker
                </Link>

                <div className="navbar-controls ms-auto">
                    <button className="theme-toggle" type="button" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} onClick={() => setTheme((currentTheme) => currentTheme === 'dark' ? 'light' : 'dark',)}>
                        {theme === 'dark' ? (<Sun size={18} aria-hidden="true"/>) : (<Moon size={18} aria-hidden="true"/>)}
                    </button>

                    <div className="navbar-search-container" ref={searchContainerRef}>
                        <form className="navbar-search" onSubmit={submitSearch}>
                            <div className="input-group">
                                <input ref={searchInputRef} className="form-control form-search-sports" type="search" placeholder="Search Teams and Athletes" aria-label="Search SportsTracker" onFocus={() => {
                                    if (trimmedQuery.length >= 2) {
                                        setIsSearchOpen(true)
                                    }
                                }} onChange={(event) => {
                                    setQuery(event.target.value)
                                    setIsSearchOpen(true)
                                }}/>

                                <button className="btn btn-outline-secondary" type="submit" id="search-sports" aria-label="Search">
                                    <BsSearch size={18} aria-hidden="true"/>
                                </button>
                            </div>

                            {isSearchOpen && trimmedQuery.length >= 2 && (
                                <div className="navbar-search-results">
                                    {searchResults.length > 0 ? (
                                        <>
                                            {searchResults.map((result) => (
                                                <Link key={result.id} to={result.route} className="navbar-search-result" onClick={selectResult}>
                                                    <div className="navbar-search-result-image-wrap">
                                                        {result.imageText}
                                                    </div>

                                                    <div className="navbar-search-result-content">
                                                        <div className="navbar-search-result-name">
                                                            {result.title}
                                                        </div>

                                                        <div className="navbar-search-result-meta">
                                                            {result.subtitle}
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}

                                            <Link to={`/search/q=${encodeURIComponent(trimmedQuery)}`} className="navbar-search-view-all" onClick={selectResult}>
                                                View All Results
                                            </Link>
                                        </>
                                    ) : (
                                        <div className="navbar-search-empty">
                                            No Results for "{trimmedQuery}"
                                        </div>
                                    )}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </nav>
    )
}