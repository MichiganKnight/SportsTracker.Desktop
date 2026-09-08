import { type LeagueInfo, Sport, } from '../../../shared/models/league.ts'
import { useOutletContext } from 'react-router-dom'
import { BsBroadcast, BsClock, BsFlagFill, } from 'react-icons/bs'
import { GameSection } from '../../components/games/GameSection.tsx'
import { GolfEventCard } from '../../components/golf/GolfEventCard.tsx'
import { LiveDataStatus } from '../../components/data/LiveDataStatus.tsx'
import { useLeagueScoreboard } from '../../hooks/useScoreboards.ts'
import { golfEventsMock } from '../../mock-data/golf.ts'

interface LeagueOutletContext {
    league: LeagueInfo
}

export function LeagueOverviewPage() {
    const { league } = useOutletContext<LeagueOutletContext>()

    if (league.sport === Sport.Golf) {
        return <GolfLeagueOverview league={league}/>
    }

    return <TeamSportLeagueOverview league={league}/>
}

function TeamSportLeagueOverview({ league, }: { league: LeagueInfo }) {
    const { scoreboard, source, isLoading, error, } = useLeagueScoreboard(league.league)

    const games = scoreboard?.games ?? []

    const liveGames = games.filter((game) => game.status === 'live',)
    const upcomingGames = games.filter((game) => game.status === 'scheduled',)
    const finalGames = games.filter((game) => game.status === 'final',)

    return (
        <>
            <LiveDataStatus source={source} isLoading={isLoading} error={error}/>

            <div className="league-game-sections">
                <GameSection title="Live Games" icon={<BsBroadcast/>} games={liveGames}/>
                <GameSection title="Upcoming Games" icon={<BsClock/>} games={upcomingGames}/>
                <GameSection title="Final Games" icon={<BsFlagFill/>} games={finalGames}/>
            </div>
        </>
    )
}

function GolfLeagueOverview({ league, }: { league: LeagueInfo }) {
    const tournaments = golfEventsMock.filter((event) => event.league === league.league,)

    return (
        <div className="row g-3">
            {tournaments.map((event) => (
                <div className="col-12 col-xl-6" key={event.id}>
                    <GolfEventCard event={event}/>
                </div>
            ))}
        </div>
    )
}