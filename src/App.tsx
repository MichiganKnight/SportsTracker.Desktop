import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { DashboardPage } from "./pages/DashboardPage";
import { PlaceholderPage } from "./pages/PlaceholderPage";
import { LeaguePage } from './pages/LeaguePage'
import { LivePage } from './pages/LivePage'
import { GamesPage } from './pages/GamesPage'
import './App.css'

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route element={<AppShell/>}>
                    <Route index element={<DashboardPage />} />

                    <Route
                        path="leagues/:leagueId"
                        element={<LeaguePage />}
                    />

                    <Route path="live" element={<LivePage />} />

                    <Route path="games" element={<GamesPage />} />

                    <Route
                        path="following"
                        element={
                            <PlaceholderPage
                                eyebrow="Favorites"
                                title="Following"
                                description="View your favorite teams and athletes."
                            />
                        }
                    />

                    <Route
                        path="leagues/:leagueId"
                        element={
                            <PlaceholderPage
                                eyebrow="League"
                                title="League Overview"
                                description="Scores, standings, rankings, and league leaders."
                            />
                        }
                    />

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
        </HashRouter>
    )
}

export default App
