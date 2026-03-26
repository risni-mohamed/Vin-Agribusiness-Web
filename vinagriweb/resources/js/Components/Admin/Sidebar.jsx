import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    FaPlus,
    FaBoxOpen,
    FaSignOutAlt,
    FaLeaf,
    FaChevronDown,
    FaPhotoVideo,
    FaCommentAlt
} from "react-icons/fa";
import { GiPlantSeed } from "react-icons/gi";
import "../../styles/Admin/Sidebar.css";

export default function Sidebar() {
    const { url } = usePage();

    const isActive = (path) => url.startsWith(path);
    const isExact = (path) => url === path;

    const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(isActive("/admin/add-product"));
    const [isViewDropdownOpen, setIsViewDropdownOpen] = useState(isActive("/admin/view-products"));
    const [isMediaDropdownOpen, setIsMediaDropdownOpen] = useState(isActive("/admin/add-media") || isActive("/admin/view-media"));

    const toggleProductDropdown = () => setIsProductDropdownOpen(!isProductDropdownOpen);
    const toggleViewDropdown = () => setIsViewDropdownOpen(!isViewDropdownOpen);
    const toggleMediaDropdown = () => setIsMediaDropdownOpen(!isMediaDropdownOpen);

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <FaLeaf className="sidebar-logo" />
                <h2>Vin Agribusiness</h2>
            </div>

            <nav className="sidebar-nav">
                {/* Add Product Dropdown */}
                <div className="dropdown">
                    <button className={`nav-item dropdown-toggle ${isActive("/admin/add-product") ? "active" : ""}`} onClick={toggleProductDropdown}>
                        <FaPlus className="nav-icon" /> Add Product
                        <FaChevronDown className={`chevron-icon ${isProductDropdownOpen ? "rotate" : ""}`} />
                    </button>
                    {isProductDropdownOpen && (
                        <div className="dropdown-menu">
                            <Link href="/admin/add-product/fertilizers" className={`dropdown-item ${isExact("/admin/add-product/fertilizers") ? "active" : ""}`}>Fertilizers</Link>
                            {/* <Link href="/admin/add-product/seeds" className="dropdown-item">Seeds</Link>
                            <Link href="/admin/add-product/vin-plastics" className="dropdown-item">Vin Plastics</Link>
                            <Link href="/admin/add-product/vin-apparel" className="dropdown-item">Vin Apparel</Link> */}
                        </div>
                    )}
                </div>

                {/* View Products Dropdown */}
                <div className="dropdown">
                    <button className={`nav-item dropdown-toggle ${isActive("/admin/view-products") ? "active" : ""}`} onClick={toggleViewDropdown}>
                        <FaBoxOpen className="nav-icon" /> View Products
                        <FaChevronDown className={`chevron-icon ${isViewDropdownOpen ? "rotate" : ""}`} />
                    </button>
                    {isViewDropdownOpen && (
                        <div className="dropdown-menu">
                            <Link href="/admin/view-products/fertilizers" className={`dropdown-item ${isExact("/admin/view-products/fertilizers") ? "active" : ""}`}>Fertilizers</Link>
                            {/* <Link href="/admin/view-products/seeds" className="dropdown-item">Seeds</Link>
                            <Link href="/admin/view-products/vin-plastics" className="dropdown-item">Vin Plastics</Link>
                            <Link href="/admin/view-products/vin-apparel" className="dropdown-item">Vin Apparel</Link> */}
                        </div>
                    )}
                </div>

                {/* Media Dropdown */}
                <div className="dropdown">
                    <button className={`nav-item dropdown-toggle ${isActive("/admin/add-media") || isActive("/admin/view-media") ? "active" : ""}`} onClick={toggleMediaDropdown}>
                        <FaPhotoVideo className="nav-icon" /> Media
                        <FaChevronDown className={`chevron-icon ${isMediaDropdownOpen ? "rotate" : ""}`} />
                    </button>
                    {isMediaDropdownOpen && (
                        <div className="dropdown-menu">
                            <Link href="/admin/add-media" className={`dropdown-item ${isExact("/admin/add-media") ? "active" : ""}`}>Add Media</Link>
                            <Link href="/admin/view-media" className={`dropdown-item ${isExact("/admin/view-media") ? "active" : ""}`}>View Media</Link>
                        </div>
                    )}
                </div>

                {/* Feedbacks */}
                <Link href="/admin/view-feedbacks" className={`nav-item ${isActive("/admin/view-feedbacks") ? "active" : ""}`}>
                    <FaCommentAlt className="nav-icon" /> Feedbacks
                </Link>

                {/* Crop Programs */}
                <Link href="/admin/crop-programs" className={`nav-item ${isActive("/admin/crop-programs") ? "active" : ""}`}>
                    <GiPlantSeed className="nav-icon" /> Crop Programs
                </Link>

                {/* Dealership Agreement Form Button */}
                <Link href="/admin/dealership-agreement" className={`nav-item ${isActive("/admin/dealership-agreement") ? "active" : ""}`}>
                    <FaLeaf className="nav-icon" /> Dealership Agreement Form
                </Link>

                {/* Logout */}
                <Link href="/admin/logout" className="nav-item logout">
                    <FaSignOutAlt className="nav-icon" /> Logout
                </Link>
            </nav>
        </aside>
    );
}
