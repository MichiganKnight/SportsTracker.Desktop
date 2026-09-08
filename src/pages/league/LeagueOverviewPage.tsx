import { type LeagueInfo, Sport } from "../../../shared/models/league.ts";
import { useOutletContext } from "react-router-dom";
import { gamesMock } from "../../mock-data/games.ts";
import { GameSection } from "../../components/games/GameSection.tsx";
import { BsBroadcast, BsClock, BsFlagFill } from "react-icons/bs";
import { golfEventsMock } from "../../mock-data/golf.ts";
import { GolfEventCard } from "../../components/golf/GolfEventCard.tsx";

interface LeagueOutletContext {
    league: LeagueInfo
}

export function LeagueOverviewPage() {
    const { league } = useOutletContext<LeagueOutletContext>()

    const games = gamesMock.filter((game) => game.league === league.league)

    if (league.sport === Sport.Golf) {
        const tournaments = golfEventsMock.filter((event) => event.league === league.league)

        return (
            <div className="row g-3">
                {tournaments.map((event) => (
                    <div className="col-12 col-xl-6" key={event.id}>
                        <GolfEventCard event={event} />
                    </div>
                ))}
            </div>
        )
    }

    const liveGames = games.filter((game) => game.status === 'live')
    const upcomingGames = games.filter((game) => game.status === 'scheduled')
    const finalGames = games.filter((game) => game.status === 'final')

    return (
        <div className="league-game-sections">
            <GameSection title="Live Games" icon={<BsBroadcast/>} games={liveGames}/>
            <GameSection title="Upcoming Games" icon={<BsClock/>} games={upcomingGames}/>
            <GameSection title="Final Games" icon={<BsFlagFill/>} games={finalGames}/>
        </div>
    )
}