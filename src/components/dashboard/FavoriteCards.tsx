import type { FavoriteAthleteViewModel, FavoriteTeamViewModel } from "../../../shared/view-models/following.ts";
import { BsPersonFill, BsStarFill } from "react-icons/bs";

export function FavoriteTeamCard({ team }: { team: FavoriteTeamViewModel }) {
    return (
        <article className="dashboard-favorite-team">
            <div className="dashboard-favorite-team-link">
                <div className="dashboard-favorite-team-mark" aria-hidden="true">
                    {team.abbreviation.substring(0, 2)}
                </div>

                <div className="dashboard-favorite-team-info">
                    <div className="dashboard-favorite-team-name">
                        {team.name}
                    </div>

                    <div className="dashboard-favorite-team-league">
                        {team.league}
                    </div>
                </div>
            </div>

            <button className="dashboard-favorite-team-remove" type="button" aria-label={`Unfollow ${team.name}`} title={`Unfollow ${team.name}`}>
                <BsStarFill />
            </button>
        </article>
    )
}

export function FavoriteAthleteCard({ athlete }: { athlete: FavoriteAthleteViewModel }) {
    return (
        <article className="dashboard-favorite-athlete">
            <div className="dashboard-favorite-athlete-link">
                <div className="dashboard-favorite-athlete-image-wrap">
                    {athlete.initials ? (
                        <span className="dashboard-favorite-athlete-initials">
                            {athlete.initials}
                        </span>
                    ) : (
                        <BsPersonFill className="dashboard-favorite-athlete-placeholder" />
                    )}
                </div>

                <div className="dashboard-favorite-athlete-info">
                    <div className="dashboard-favorite-athlete-name">
                        {athlete.name}
                    </div>

                    <div className="dashboard-favorite-athlete-details">
                        {athlete.position} - {athlete.teamName}
                    </div>
                </div>
            </div>

            <button className="dashboard-favorite-athlete-remove" type="button" aria-label={`Unfollow ${athlete.name}`} title={`Unfollow ${athlete.name}`}>
                <BsStarFill />
            </button>
        </article>
    )
}