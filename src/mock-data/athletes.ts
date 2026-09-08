import { type League, LeagueConfiguration, Sport } from "../../shared/models/league.ts";
import type { AthleteDetailsViewModel, AthleteQuickStatViewModel } from "../../shared/view-models/athlete-details.ts";
import { findRosterPlayerMock } from "./teams.ts";

export function getAthleteMock(league: League, athleteId: string): AthleteDetailsViewModel | undefined {
    const match = findRosterPlayerMock(league, athleteId)

    if (!match) {
        return undefined
    }

    const { team, player } = match
    const configuration = LeagueConfiguration.get(league)

    return {
        id: player.id,
        league,
        displayName: player.displayName,
        initials: player.initials,
        status: 'Active',
        isActive: true,
        jersey: player.jersey,
        position: player.positionAbbreviation,
        teamId: team.id,
        teamName: team.displayName,
        teamAbbreviation: team.abbreviation,
        quickStatsTitle: '2026 Season Stats',
        quickStats: getQuickStats(configuration.sport, player.positionAbbreviation),
        bio: [
            {
                label: 'Age',
                value: player.age?.toString() ?? '—',
            },
            {
                label: 'Birthplace',
                value: player.birthPlace ?? '—',
            },
            {
                label: 'Height',
                value: player.height ?? '—',
            },
            {
                label: 'Weight',
                value: player.weight ?? '—',
            },
            {
                label: 'Experience',
                value: player.experienceYears !== undefined ? `${player.experienceYears} Years` : '-'
            },
            {
                label: 'Position',
                value: player.positionAbbreviation ?? '-'
            }
        ],
        overviewTitle: `${player.displayName} Overview`,
        overviewDescription: `${player.displayName} is Currently Listed as an Active ${player.positionAbbreviation ?? 'Player'} for the ${team.displayName}. Details News, Analysis, Awards, and Performance Information will Appear Here When Live Data is Connected`
    }
}

function getQuickStats(sport: Sport, position?: string): AthleteQuickStatViewModel[] {
    switch (sport) {
        case Sport.Football:
            if (position === 'QB') {
                return [
                    {
                        label: 'Passing Yards',
                        value: '3,541',
                        rank: '8th',
                    },
                    {
                        label: 'Touchdowns',
                        value: '26',
                        rank: '10th',
                    },
                    {
                        label: 'Completion',
                        value: '64.8%',
                    },
                    {
                        label: 'Rating',
                        value: '92.6',
                    },
                ]
            }

            return [
                {
                    label: 'Tackles',
                    value: '87',
                    rank: '14th',
                },
                {
                    label: 'Sacks',
                    value: '8.5',
                },
                {
                    label: 'Forced Fumbles',
                    value: '3',
                },
                {
                    label: 'Games',
                    value: '15',
                },
            ]

        case Sport.Baseball:
            return [
                {
                    label: 'Average',
                    value: '.284',
                    rank: '18th',
                },
                {
                    label: 'Home Runs',
                    value: '24',
                },
                {
                    label: 'RBI',
                    value: '79',
                },
                {
                    label: 'OPS',
                    value: '.831',
                },
            ]

        case Sport.Hockey:
            return [
                {
                    label: 'Goals',
                    value: '31',
                    rank: '12th',
                },
                {
                    label: 'Assists',
                    value: '48',
                },
                {
                    label: 'Points',
                    value: '79',
                },
                {
                    label: 'Plus/Minus',
                    value: '+11',
                },
            ]

        case Sport.Basketball:
            return [
                {
                    label: 'Points',
                    value: '24.8',
                },
                {
                    label: 'Rebounds',
                    value: '7.2',
                },
                {
                    label: 'Assists',
                    value: '6.4',
                },
                {
                    label: 'Field Goal',
                    value: '48.1%',
                },
            ]

        case Sport.Golf:
            return [
                {
                    label: 'World Rank',
                    value: '1',
                },
                {
                    label: 'Scoring Avg',
                    value: '68.63',
                },
                {
                    label: 'Wins',
                    value: '7',
                },
                {
                    label: 'Top 10',
                    value: '16',
                },
            ]
    }
}