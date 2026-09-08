import type { LiveScoreboardViewModel } from "../../shared/view-models/live-scoreboard.ts";
import { useEffect, useState } from "react";
import { gamesMock } from "../mock-data/games.ts";
import { formatDateValue } from "../utils/date.ts";
import { type League, LeagueConfiguration, Sport } from "../../shared/models/league.ts";

export type ScoreboardSource = 'live' | 'mock'

interface ScoreboardsState {
    scoreboards: LiveScoreboardViewModel[]
    source: ScoreboardSource
    isLoading: boolean
    error?: string
}

interface LeagueScoreboardState {
    scoreboard?: LiveScoreboardViewModel
    source: ScoreboardSource
    isLoading: boolean
    error?: string
}

export function useScoreboards(requestedDate?: string): ScoreboardsState {
    const [state, setState] = useState<ScoreboardsState>(() => ({
        scoreboards: createMockScoreboards(requestedDate),
        source: 'mock',
        isLoading: Boolean(window.sportsTracker)
    }))

    useEffect(() => {
        let isActive = true

        const fallbackScoreboards = createMockScoreboards(requestedDate)

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setState({
            scoreboards: fallbackScoreboards,
            source: 'mock',
            isLoading: Boolean(window.sportsTracker)
        })

        if (!window.sportsTracker) {
            return () => {
                isActive = false
            }
        }

        void window.sportsTracker.scoreboards.getAll(requestedDate).then((scoreboards) => {
            if (!isActive) {
                return
            }

            setState({
                scoreboards,
                source: 'live',
                isLoading: false
            })
        }).catch((error: unknown) => {
            if (!isActive) {
                return
            }

            console.error('Unable to Load Scoreboards:', error)

            setState({
                scoreboards: fallbackScoreboards,
                source: 'mock',
                isLoading: false,
                error: error instanceof Error ? error.message : 'Unable to Load Live Scores'
            })
        })

        return () => {
            isActive = false
        }
    }, [requestedDate]);

    return state
}

export function useLeagueScoreboard(league: League): LeagueScoreboardState {
    const [state, setState] = useState<LeagueScoreboardState>(() => ({
        scoreboard: createMockLeagueScoreboard(league),
        source: 'mock',
        isLoading: Boolean(window.sportsTracker),
    }))

    useEffect(() => {
        let isActive = true

        const fallbackScoreboard = createMockLeagueScoreboard(league)

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setState({
            scoreboard: fallbackScoreboard,
            source: 'mock',
            isLoading: Boolean(window.sportsTracker),
        })

        if (!window.sportsTracker) {
            return () => {
                isActive = false
            }
        }

        void window.sportsTracker.scoreboards
            .get(league)
            .then((scoreboard) => {
                if (!isActive) {
                    return
                }

                setState({
                    scoreboard,
                    source: 'live',
                    isLoading: false,
                })
            })
            .catch((error: unknown) => {
                if (!isActive) {
                    return
                }

                console.error(`${league} scoreboard failed:`, error,)

                setState({
                    scoreboard: fallbackScoreboard,
                    source: 'mock',
                    isLoading: false,
                    error: error instanceof Error ? error.message : `Unable to load the ${league} scoreboard.`,
                })
            })

        return () => {
            isActive = false
        }
    }, [league])

    return state
}

function createMockScoreboards(requestedDate?: string): LiveScoreboardViewModel[] {
    const selectedGames = requestedDate ? gamesMock.filter((game) => formatDateValue(new Date(game.startTime)) === requestedDate) : gamesMock

    return LeagueConfiguration.getAll().filter((league) => LeagueConfiguration.get(league).sport !== Sport.Golf).map((league) => {
        const configuration = LeagueConfiguration.get(league)

        return {
            league,
            leagueName:
            configuration.displayName,
            leagueLogoUrl:
            configuration.logo,
            games: selectedGames.filter((game) => game.league === league,),
            updatedAt: new Date().toISOString(),
        }
    })
}

function createMockLeagueScoreboard(league: League,): LiveScoreboardViewModel {
    const configuration = LeagueConfiguration.get(league)

    return {
        league,
        leagueName: configuration.displayName,
        leagueLogoUrl: configuration.logo,
        games: gamesMock.filter((game) => game.league === league,),
        updatedAt: new Date().toISOString(),
    }
}