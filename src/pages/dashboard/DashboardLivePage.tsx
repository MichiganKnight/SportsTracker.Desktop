import { liveGamesMock } from "../../mock-data/games.ts";
import { BsBroadcast, BsTrophy } from "react-icons/bs";
import { GameCard } from "../../components/games/GameCard.tsx";

export function DashboardLivePage() {
    if (liveGamesMock.length === 0) {
        return (
            <section className="dashboard-live-empty card shadow-sm">
                <div className="card-body">
                    <BsTrophy className="dashboard-live-empty-icon" aria-hidden="true" />

                    <h3>No Live Events</h3>

                    <p>
                        Live Games and Tournaments Will Appear Here
                    </p>
                </div>
            </section>
        )
    }

    return (
        <section className="dashboard-feature-section mb-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <h3 className="h5 mb-1">
                        <span className="game-live-dot me-2" />

                        Live Now
                    </h3>

                    <div className="text-secondary small">
                        Games Currently in Progress
                    </div>
                </div>

                <div className="text-secondary small">
                    <BsBroadcast aria-hidden="true" />

                    <span>
                        {liveGamesMock.length} Live
                    </span>
                </div>
            </div>

            <div className="row g-3">
                {liveGamesMock.map((game) => (
                    <div className="col-12 col-lg-4" key={game.id}>
                        <GameCard game={game} />
                    </div>
                ))}
            </div>
        </section>
    )
}