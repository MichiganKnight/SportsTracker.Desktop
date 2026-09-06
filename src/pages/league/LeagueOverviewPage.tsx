import { type LeagueInfo, Sport } from "../../../shared/models/league.ts";
import { useOutletContext } from "react-router-dom";
import { gamesMock } from "../../mock-data/games.ts";
import { GameSection } from "../../components/games/GameSection.tsx";
import { BsBroadcast, BsClock, BsFlagFill } from "react-icons/bs";

interface LeagueOutletContext {
    league: LeagueInfo
}

export function LeagueOverviewPage() {
    const { league } = useOutletContext<LeagueOutletContext>()

    const games = gamesMock.filter((game) => game.league === league.league)

    if (league.sport === Sport.Golf) {
        return (
            <div className="card shadow-sm league-empty-state">
                <div className="card-body text-center py-5">
                    <h2 className="h5 mb-2">
                        No Tournaments Available
                    </h2>

                    <p className="text-secondary mb-0">
                        Tournament Cards Will Appear Here
                    </p>
                </div>
            </div>
        )
    }

    const liveGames = games.filter((game) => game.status === 'live')
    const upcomingGames = games.filter((game) => game.status === 'scheduled')
    const finalGames = games.filter((game) => game.status === 'final')

    return (
        <div className="league-game-sections">
            <GameSection title="Live Games" icon={<BsBroadcast />} games={liveGames} />
            <GameSection title="Upcoming Games" icon={<BsClock />} games={upcomingGames} />
            <GameSection title="Final Games" icon={<BsFlagFill />} games={finalGames} />
        </div>
    )
}