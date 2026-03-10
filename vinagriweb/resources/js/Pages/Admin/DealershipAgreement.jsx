import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function DealershipAgreement() {
    return (
        <AdminLayout title="Dealership Agreement">
            <div className="dealership-page" style={{ textAlign: "center" }}>
                <h1>Dealership Agreement Form</h1>
                <p>Review and manage dealership applications below.</p>

                <iframe
                    src="https://docs.google.com/spreadsheets/d/1O9DL_XPiQgh5OiXDCwBxOevn9AxS1Zx3t4BVGXKZAYI/edit?usp=sharing"
                    width="100%"
                    height="800"
                    style={{ border: "none", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
                    title="Dealership Agreement Google Form"
                ></iframe>
            </div>
        </AdminLayout>
    );
}
