import { DashboardHeader } from "./DashboardHeader.tsx";
import { DashboardNavigation } from "./DashboardNavigation.tsx";
import { Outlet } from "react-router-dom";

export function DashboardLayout() {
    return (
        <div className="container-fluid dashboard-page">
            <DashboardHeader />

            <DashboardNavigation />

            <Outlet />
        </div>
    )
}