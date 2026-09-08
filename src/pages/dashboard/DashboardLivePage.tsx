import { BsBroadcast, BsTrophy } from "react-icons/bs";
import { GameCard } from "../../components/games/GameCard.tsx";
import { useScoreboards } from "../../hooks/useScoreboards.ts";
import { golfEventsMock } from "../../mock-data/golf.ts";
import { LiveDataStatus } from "../../components/data/LiveDataStatus.tsx";
import { GolfEventCard } from "../../components/golf/GolfEventCard.tsx";

export function DashboardLivePage() {
    const { scoreboards, source, isLoading, error } = useScoreboards()

    const liveGames = scoreboards.flatMap((scoreboard) => scoreboard.games).filter((game) => game.status === 'live')

    const liveTournaments = golfEventsMock.filter((event) => event.status === 'live')

    const liveEventCount = liveGames.length + liveTournaments.length

    return (
        <>
            <LiveDataStatus source={source} isLoading={isLoading} error={error} />

            {liveEventCount === 0 ? (
                <section className="dashboard-live-empty card shadow-sm">
                    <div className="card-body">
                        <BsTrophy className="dashboard-live-empty-icon" aria-hidden="true"/>

                        <h3>No Live Events</h3>

                        <p>
                            Live Events and Tournaments Will Appear Here
                        </p>
                    </div>
                </section>
            ): (
                <section className="dashboard-feature-section mb-5">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                            <h3 className="h5 mb-1">
                                <span className="game-live-dot me-2"/>

                                Live Now
                            </h3>

                            <div className="text-secondary small">
                                Games Currently in Progress
                            </div>
                        </div>

                        <div className="text-secondary small">
                            <BsBroadcast aria-hidden="true"/>

                            <span>
                                {liveEventCount} Live
                            </span>
                        </div>
                    </div>

                    <div className="row g-3">
                        {liveGames.map((game) => (
                            <div className="col-12 col-lg-4" key={`${game.league}-${game.id}`}>
                                <GameCard game={game}/>
                            </div>
                        ))}

                        {liveTournaments.map((event) => (
                            <div className="col-12 col-lg-4" key={event.id}>
                                <GolfEventCard event={event}/>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </>
    )
}