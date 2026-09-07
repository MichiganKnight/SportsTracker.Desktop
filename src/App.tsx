import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { PlaceholderPage } from "./pages/PlaceholderPage.tsx";
import { DashboardLayout } from "./components/dashboard/DashboardLayout.tsx";
import { DashboardOverviewPage } from "./pages/dashboard/DashboardOverviewPage.tsx";
import { DashboardFollowingPage } from "./pages/dashboard/DashboardFollowingPage.tsx";
import { DashboardLivePage } from "./pages/dashboard/DashboardLivePage.tsx";
import { DashboardLeaguesPage } from "./pages/dashboard/DashboardLeaguesPage.tsx";
import { GamesPage } from "./pages/GamesPage.tsx";
import { LeagueLayout } from "./components/league/LeagueLayout.tsx";
import { LeagueOverviewPage } from "./pages/league/LeagueOverviewPage.tsx";
import { StandingsPage } from "./pages/league/StandingsPage.tsx";
import { RankingsPage } from "./pages/league/RankingsPage.tsx";

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<AppShell />}>
                    <Route index element={<Navigate to="/dashboard" replace />} />

                    <Route path="dashboard" element={<DashboardLayout />}>
                        <Route index element={<DashboardOverviewPage />} />

                        <Route path="following" element={<DashboardFollowingPage />} />

                        <Route path="live" element={<DashboardLivePage />} />

                        <Route path="leagues" element={<DashboardLeaguesPage />} />
                    </Route>

                    <Route path="games" element={<GamesPage />} />

                    <Route path="league/:leagueId" element={<LeagueLayout />}>
                        <Route index element={<LeagueOverviewPage />} />

                        <Route path="standings" element={<StandingsPage />} />

                        <Route path="rankings" element={<RankingsPage />} />

                        <Route path="leaders" element={<PlaceholderPage eyebrow="League" title="Leaders" description="View Leading Leaders Across Major Statistical Categories" />} />
                    </Route>

                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Route>
            </Routes>
        </HashRouter>
    )
}

export default App
