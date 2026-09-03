import { useEffect, useState } from 'react'
import type { Scoreboard } from '../../shared/models/scoreboard'

const refreshIntervalMilliseconds = 15_000

export function useAllScoreboards() {
    const desktopApi = window.sportsTracker

    const [scoreboards, setScoreboards] = useState<Scoreboard[]>([])
    const [error, setError] = useState<string | null>(null)
    const [hasLoaded, setHasLoaded] = useState(false)

    useEffect(() => {
        if (!desktopApi) {
            return
        }

        let requestIsActive = true

        const requestScoreboards = () => {
            void desktopApi.scoreboards
                .getAll()
                .then((results) => {
                    if (!requestIsActive) {
                        return
                    }

                    setScoreboards(results)
                    setError(null)
                    setHasLoaded(true)
                })
                .catch((reason: unknown) => {
                    if (!requestIsActive) {
                        return
                    }

                    setError(
                        reason instanceof Error
                            ? reason.message
                            : 'Unable to load ESPN scoreboards.',
                    )

                    setHasLoaded(true)
                })
        }

        requestScoreboards()

        const refreshTimer = window.setInterval(
            requestScoreboards,
            refreshIntervalMilliseconds,
        )

        return () => {
            requestIsActive = false
            window.clearInterval(refreshTimer)
        }
    }, [desktopApi])

    if (!desktopApi) {
        return {
            scoreboards: [],
            error: 'Scoreboards require the Electron application.',
            isLoading: false,
        }
    }

    return {
        scoreboards,
        error,
        isLoading: !hasLoaded,
    }
}