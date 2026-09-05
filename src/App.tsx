import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { PlaceholderPage } from "./pages/PlaceholderPage.tsx";
import { DashboardLayout } from "./pages/dashboard/DashboardLayout.tsx";
import { DashboardOverviewPage } from "./pages/dashboard/DashboardOverviewPage.tsx";
import { DashboardFollowingPage } from "./pages/dashboard/DashboardFollowingPage.tsx";

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<AppShell />}>
                    <Route index element={<Navigate to="/dashboard" replace />} />

                    <Route path="dashboard" element={<DashboardLayout />}>
                        <Route index element={<DashboardOverviewPage />} />

                        <Route path="following" element={<DashboardFollowingPage />} />

                        <Route path="live" element={<PlaceholderPage eyebrow="Dashboard" title="Live Now" description="View Events Currently in Progress" />} />

                        <Route path="leagues" element={<PlaceholderPage eyebrow="Dashboard" title="Leagues" description="Browse All Supported Leagues" />} />
                    </Route>

                    <Route path="games" element={<PlaceholderPage eyebrow="Schedule" title="Today's Games" description="Browse Games" />} />

                    <Route path="league/:leagueId" element={<PlaceholderPage eyebrow="League" title="League Overview" description="View League Games, Standings, Rankings, and Leaders" />} />

                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Route>
            </Routes>
        </HashRouter>
    )
}

export default App
