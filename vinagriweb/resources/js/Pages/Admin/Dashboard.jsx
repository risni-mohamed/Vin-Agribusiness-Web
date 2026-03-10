import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import ApplicationLogo from "@/Components/ApplicationLogo";
import "../../styles/Admin/DashboardHome.css";

export default function DashboardHome() {
    return (
        <AdminLayout title="Dashboard">
            <div className="dashboard-home-content">
                <div className="welcome-card">
                    {/* <ApplicationLogo className="dashboard-logo" /> */}
                    <h1 className="company-name">Vin Agribusiness</h1>
                    <h2 className="welcome-text">Welcome to the Admin panel</h2>
                    <p className="description">Manage your fertilizers, media, and dealership agreements from one central location.</p>
                </div>
            </div>
        </AdminLayout>
    );
}
