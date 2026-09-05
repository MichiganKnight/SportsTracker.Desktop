import { useEffect, useState } from "react";

export function Footer() {
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
        <footer className="border-top border-secondary py-2 px-3">
            <div className="d-flex justify-content-between align-items-center text-secondary w-100">
                <div className="d-flex align-items-center gap-2">
                    <span className="connection-dot"></span>
                    <span>{desktopStatus}</span>
                </div>

                <div>
                    Last Refresh: <span data-last-refresh>--</span>
                </div>
            </div>
        </footer>
    )
}