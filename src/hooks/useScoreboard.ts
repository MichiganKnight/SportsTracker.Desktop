import { useEffect, useState } from 'react'
import type { LeagueId } from '../../shared/models/league'
import type { Scoreboard } from '../../shared/models/scoreboard'

interface ScoreboardState {
    leagueId: LeagueId
    scoreboard: Scoreboard | null
    error: string | null
}

export function useScoreboard(leagueId: LeagueId) {
    const desktopApi = window.sportsTracker

    const [state, setState] = useState<ScoreboardState>(() => ({
        leagueId,
        scoreboard: null,
        error: null,
    }))

    useEffect(() => {
        if (!desktopApi) {
            return
        }

        let requestIsActive = true

        void desktopApi.scoreboards
            .get(leagueId)
            .then((scoreboard) => {
                if (!requestIsActive) {
                    return
                }

                setState({
                    leagueId,
                    scoreboard,
                    error: null,
                })
            })
            .catch((reason: unknown) => {
                if (!requestIsActive) {
                    return
                }

                setState({
                    leagueId,
                    scoreboard: null,
                    error:
                        reason instanceof Error
                            ? reason.message
                            : `Unable to load the ${leagueId} scoreboard.`,
                })
            })

        return () => {
            requestIsActive = false
        }
    }, [desktopApi, leagueId])

    if (!desktopApi) {
        return {
            scoreboard: null,
            error: 'Scoreboards require the Electron desktop application.',
            isLoading: false,
        }
    }

    const stateMatchesLeague = state.leagueId === leagueId

    return {
        scoreboard: stateMatchesLeague ? state.scoreboard : null,
        error: stateMatchesLeague ? state.error : null,
        isLoading:
            !stateMatchesLeague ||
            (state.scoreboard === null && state.error === null),
    }
}