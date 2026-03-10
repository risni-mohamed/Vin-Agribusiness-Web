import React from "react";
import Sidebar from "@/Components/Admin/Sidebar";
import { Head } from "@inertiajs/react";

export default function AdminLayout({ children, title }) {
    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>
            <Head title={title ? `${title} | Admin Panel` : "Admin Panel"} />

            {/* Sidebar */}
            <Sidebar />

            {/* Main content area */}
            <div style={{ flex: 1, padding: "20px", backgroundColor: "#f4f7f6" }}>
                {children}
            </div>
        </div>
    );
}
