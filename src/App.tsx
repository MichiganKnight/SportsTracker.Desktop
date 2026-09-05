import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { DashboardPage } from "./pages/DashboardPage";
import { dashboardOverviewMock } from "./mock-data/dashboard.ts";
import { PlaceholderPage } from "./pages/PlaceholderPage.tsx";

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<AppShell />}>
                    <Route index element={<Navigate to="/dashboard" replace />} />

                    <Route path="dashboard" element={<DashboardPage {...dashboardOverviewMock} />} />

                    <Route path="dashboard/following" element={<PlaceholderPage eyebrow="Dashboard" title="Following" description="Folllow Favorite Teams and Leagues" />} />

                    <Route path="dashboard/live" element={<PlaceholderPage eyebrow="Dashboard" title="Live Now" description="View Events Currently in Progress" />} />

                    <Route path="dashboard/leagues" element={<PlaceholderPage eyebrow="Dashboard" title="Leagues" description="Browse All Supported Leagues" />} />

                    <Route path="games" element={<PlaceholderPage eyebrow="Schedule" title="Today's Games" description="Browse Games" />} />

                    <Route path="league/:leagueId" element={<PlaceholderPage eyebrow="League" title="League Overview" description="View League Games, Standings, Rankings, and Leaders" />} />

                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Route>
            </Routes>
        </HashRouter>
    )
}

export default App
