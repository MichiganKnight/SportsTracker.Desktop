import { DashboardHeader } from "../../components/dashboard/DashboardHeader.tsx";
import { DashboardNavigation } from "../../components/dashboard/DashboardNavigation.tsx";
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