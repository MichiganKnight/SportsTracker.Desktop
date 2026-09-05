import { followingMock } from "../../mock-data/following.ts";
import { BsPeopleFill, BsStar } from "react-icons/bs";
import { FavoriteTeamCard } from "../../components/dashboard/FavoriteCards.tsx";
import { FavoriteAthleteCard } from "../../components/dashboard/FavoriteCards.tsx";
import { GameCard } from "../../components/games/GameCard.tsx";

export function DashboardFollowingPage() {
    const { teams, athletes, games } = followingMock;

    const hasFavorites = teams.length > 0 || athletes.length > 0 || games.length > 0;

    if (!hasFavorites) {
        return (
            <section className="dashboard-favorites-empty mb-5">
                <div className="dashboard-favorites-empty-icon">
                    <BsStar />
                </div>

                <div>
                    <div className="fw-semibold">
                        Personalize Your Dashboard
                    </div>

                    <div className="text-secondary small">
                        Follow Teams to See Their Games and Updates Here
                    </div>
                </div>
            </section>
        )
    }

    return (
        <>
            {teams.length > 0 && (
                <section className="dashboard-feature-section mb-5">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                            <h3 className="h5 mb-1">
                                <BsPeopleFill className="text-primary me-1" />
                                Favorite Teams
                            </h3>

                            <div className="text-secondary small">
                                Teams You Follow
                            </div>
                        </div>
                    </div>

                    <div className="dashboard-favorite-team-list">
                        {teams.map((team) => (
                            <FavoriteTeamCard key={team.id} team={team} />
                        ))}
                    </div>
                </section>
            )}

            {athletes.length > 0 && (
                <section className="dashboard-feature-section mb-5">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                            <h3 className="h5 mb-1">
                                <BsPeopleFill className="text-primary me-1" />
                                Favorite Athletes
                            </h3>

                            <div className="text-secondary small">
                                Players You Follow
                            </div>
                        </div>
                    </div>

                    <div className="dashboard-favorite-athlete-list">
                        {athletes.map((athlete) => (
                            <FavoriteAthleteCard key={athlete.id} athlete={athlete} />
                        ))}
                    </div>
                </section>
            )}

            {games.length > 0 && (
                <section className="dashboard-feature-section mb-5">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                            <h3 className="h5 mb-1">
                                <BsStar className="text-primary me-1" />
                                Favorite Games
                            </h3>

                            <div className="text-secondary small">
                                Games You Follow
                            </div>
                        </div>
                    </div>

                    <div className="row g-3">
                        {games.map((game) => (
                            <div className="col-12 col-lg-4" key={game.id}>
                                <GameCard game={game} isFavorite />
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </>
    )
}