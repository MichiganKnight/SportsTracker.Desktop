import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { PlaceholderPage } from "./pages/PlaceholderPage.tsx";
import { DashboardLayout } from "./pages/dashboard/DashboardLayout.tsx";
import { DashboardOverviewPage } from "./pages/dashboard/DashboardOverviewPage.tsx";
import { DashboardFollowingPage } from "./pages/dashboard/DashboardFollowingPage.tsx";
import { DashboardLivePage } from "./pages/dashboard/DashboardLivePage.tsx";
import { DashboardLeaguesPage } from "./pages/dashboard/DashboardLeaguesPage.tsx";
import { GamesPage } from "./pages/GamesPage.tsx";

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

                    <Route path="league/:leagueId" element={<PlaceholderPage eyebrow="League" title="League Overview" description="View League Games, Standings, Rankings, and Leaders" />} />
                    <Route path="league/:leagueId/standings" element={<PlaceholderPage eyebrow="League" title="Standings" description="View Conference, Division, and Overall League Standings" />} />

                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Route>
            </Routes>
        </HashRouter>
    )
}

export default App
