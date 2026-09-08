import type { League } from "../../../shared/models/league.ts";
import { NavLink } from "react-router-dom";

interface GameNavigationProps {
    league: League
    gameId: string
}

function getNavigationClass({ isActive }: { isActive: boolean }): string {
    return isActive ? 'btn btn-primary' : 'btn btn-outline-secondary'
}

export function GameNavigation({ league, gameId }: GameNavigationProps) {
    const baseUrl = `/game/${league.toLowerCase()}/${gameId}`

    return (
        <div className="game-navigation mb-4">
            <div className="btn-group">
                <NavLink to={baseUrl} end className={getNavigationClass}>
                    Summary
                </NavLink>

                <NavLink to={`${baseUrl}/box-score`} className={getNavigationClass}>
                    Box Score
                </NavLink>

                <NavLink to={`${baseUrl}/play-by-play`} className={getNavigationClass}>
                    Play-by-Play
                </NavLink>
            </div>
        </div>
    )
}