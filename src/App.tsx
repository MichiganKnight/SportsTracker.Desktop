import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { DashboardPage } from "./pages/DashboardPage";
import { PlaceholderPage } from "./pages/PlaceholderPage";
import './App.css'

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route element={<AppShell/>}>
                    <Route index element={<DashboardPage />} />

                    <Route
                        path="live"
                        element={
                            <PlaceholderPage
                                eyebrow="Scores"
                                title="Live Games"
                                description="Follow games and events currently in progress."
                            />
                        }
                    />

                    <Route
                        path="games"
                        element={
                            <PlaceholderPage
                                eyebrow="Schedule"
                                title="Games"
                                description="Browse games by league and date."
                            />
                        }
                    />

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
