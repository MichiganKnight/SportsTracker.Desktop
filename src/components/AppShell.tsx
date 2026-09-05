import { Navbar } from "../layout/Navbar"
import { Sidebar } from './Sidebar'
import { Footer } from "./Footer"
import { LeagueConfiguration } from "../../shared/models/league.ts";
import { Outlet } from "react-router-dom";

const sidebarLeagues = LeagueConfiguration.getAll().map((league) => {
    const configuration = LeagueConfiguration.get(league)

    return {
        league,
        name: configuration.displayName,
        icon: configuration.icon,
        logo: configuration.logo,
        darkLogo: configuration.darkLogo,
    }
})

export function AppShell() {
    return (
        <div className="app-shell">
            <Navbar/>

            <div className="container-fluid">
                <div className="row app-content-row">
                    <aside className="col-md-2 sidebar">
                        <Sidebar leagues={sidebarLeagues} />
                    </aside>

                    <main className="col-md-10 py-3">
                        <Outlet />
                    </main>
                </div>
            </div>

            <Footer />
        </div>
    )
}