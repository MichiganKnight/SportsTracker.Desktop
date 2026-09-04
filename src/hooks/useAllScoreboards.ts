import { useEffect, useState } from 'react'
import type { Scoreboard } from '../../shared/models/scoreboard'

const refreshIntervalMilliseconds = 15_000

interface AllScoreboardsState {
    requestKey: string
    scoreboards: Scoreboard[]
    error: string | null
}

export function useAllScoreboards(requestedDate?: string) {
    const desktopApi = window.sportsTracker
    const requestKey = requestedDate ?? 'current'

    const [state, setState] = useState<AllScoreboardsState>(() => ({
        requestKey,
        scoreboards: [],
        error: null,
    }))

    useEffect(() => {
        if (!desktopApi) {
            return
        }

        let requestIsActive = true

        const requestScoreboards = () => {
            void desktopApi.scoreboards
                .getAll(requestedDate)
                .then((results) => {
                    if (!requestIsActive) {
                        return
                    }

                    setState({
                        requestKey,
                        scoreboards: results,
                        error: null,
                    })
                })
                .catch((reason: unknown) => {
                    if (!requestIsActive) {
                        return
                    }

                    setState({
                        requestKey,
                        scoreboards: [],
                        error:
                            reason instanceof Error
                                ? reason.message
                                : 'Unable to load ESPN scoreboards.',
                    })
                })
        }

        requestScoreboards()

        const shouldRefresh =
            requestedDate === undefined ||
            requestedDate === getCurrentLocalDate()

        const refreshTimer = shouldRefresh
            ? window.setInterval(
                requestScoreboards,
                refreshIntervalMilliseconds,
            )
            : undefined

        return () => {
            requestIsActive = false

            if (refreshTimer !== undefined) {
                window.clearInterval(refreshTimer)
            }
        }
    }, [desktopApi, requestKey, requestedDate])

    if (!desktopApi) {
        return {
            scoreboards: [],
            error: 'Scoreboards require the Electron application.',
            isLoading: false,
        }
    }

    const stateMatchesRequest = state.requestKey === requestKey

    return {
        scoreboards: stateMatchesRequest ? state.scoreboards : [],
        error: stateMatchesRequest ? state.error : null,
        isLoading:
            !stateMatchesRequest ||
            (state.scoreboards.length === 0 && state.error === null),
    }
}

function getCurrentLocalDate(): string {
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
}