import { useSearchParams } from "react-router-dom";
import { formatDateValue, formatFullDate, parseDateValue } from "../utils/date.ts";
import { gamesMock } from "../mock-data/games.ts";
import { LeagueConfiguration } from "../../shared/models/league.ts";
import { DateNavigation } from "../components/games/DateNavigation.tsx";
import { GamesLeagueSection } from "../components/games/GamesLeagueSection.tsx";

export function GamesPage() {
    const [searchParams, setSearchParams] = useSearchParams()

    const today = formatDateValue(new Date())
    const requestedDate = searchParams.get('date')

    const selectedDate = requestedDate && parseDateValue(requestedDate) ? requestedDate : today

    const selectedGames = gamesMock.filter((game) => formatDateValue(new Date(game.startTime)) === selectedDate)

    const leagueSections = LeagueConfiguration.getAll()
        .map((leagueId) => {
            const league = LeagueConfiguration.get(leagueId)

            return {
                league,
                games: selectedGames.filter((game) => game.league === leagueId)
            }
        }).filter((section) => section.games.length > 0)

    const changeDate = (date: string) => {
        if (date === today) {
            setSearchParams({})

            return
        }

        setSearchParams({ date })
    }

    const isToday = selectedDate === today

    return (
        <div className="games-page" data-games-date={selectedDate} data-is-today={isToday}>
            <header className="games-page-heading mb-4">
                <h1 className="text-secondary">
                    {isToday ? "Today's Games" : `Games - ${formatFullDate(selectedDate)}`}
                </h1>

                <div className="text-secondary">
                    {formatFullDate(selectedDate)}
                </div>
            </header>

            <DateNavigation selectedDate={selectedDate} today={today} onDateChange={changeDate} />

            {leagueSections.length === 0 ? (
                <div className="card games-empty-state">
                    <div className="card-body text-center py-5">
                        <h2 className="h5 mb-2">
                            No Games Scheduled
                        </h2>

                        <p className="text-secondary mb-0">
                            No Supported Events Found for{' '}{formatFullDate(selectedDate)}
                        </p>
                    </div>
                </div>
            ) : (
                <div className="games-leagues">
                    {leagueSections.map(({ league, games }) => (
                        <GamesLeagueSection key={league.league} league={league} games={games} />
                    ))}
                </div>
            )}
        </div>
    )
}