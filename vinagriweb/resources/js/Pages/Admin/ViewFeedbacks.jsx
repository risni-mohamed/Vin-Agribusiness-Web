import React, { useState, useEffect } from "react";
import axios from "axios";
import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { FaTrash, FaSpinner, FaCommentAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import "../../styles/Admin/ViewFeedbacks.css";

export default function ViewFeedbacks() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchFeedbacks = async () => {
        try {
            const res = await axios.get("/api/feedbacks");
            setFeedbacks(res.data);
        } catch (error) {
            console.error("Error fetching feedbacks:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this feedback?")) return;

        try {
            await axios.delete(`/api/feedbacks/${id}`);
            alert("Feedback deleted successfully");
            fetchFeedbacks();
        } catch (error) {
            console.error("Error deleting feedback:", error);
            alert("Failed to delete feedback");
        }
    };

    const handleToggleVisibility = async (id, currentStatus) => {
        try {
            await axios.put(`/api/feedbacks/${id}`, { is_visible: !currentStatus });
            fetchFeedbacks();
        } catch (error) {
            console.error("Error updating visibility:", error);
            alert("Failed to update visibility");
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const filteredFeedbacks = feedbacks.filter(
        (feedback) =>
            feedback.name.toLowerCase().includes(searchTerm) ||
            feedback.email.toLowerCase().includes(searchTerm) ||
            feedback.message.toLowerCase().includes(searchTerm)
    );

    return (
        <AdminLayout>
            <Head title="Manage Feedbacks" />
            <div className="feedback-admin-container">
                <div className="view-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div className="title-section">
                        <h2 className="feedback-admin-heading"><FaCommentAlt /> Feedback Management</h2>
                        <p>View and manage user feedback and testimonials.</p>
                    </div>

                    <div className="filters-section">
                        <input
                            type="text"
                            placeholder="Search feedbacks by name, email, or message..."
                            className="search-input"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                </div>

                <div className="table-container">
                    {loading ? (
                        <div className="loading-state">
                            <FaSpinner className="spinner-icon" />
                            <p>Loading feedbacks...</p>
                        </div>
                    ) : filteredFeedbacks.length > 0 ? (
                        <table className="feedbacks-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th style={{ width: '40%' }}>Message</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredFeedbacks.map((item) => (
                                    <tr key={item.id}>
                                        <td>
                                            {new Date(item.created_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </td>
                                        <td className="feedback-name">{item.name}</td>
                                        <td><a href={`mailto:${item.email}`} className="feedback-email">{item.email}</a></td>
                                        <td>
                                            <div className="feedback-message-box">
                                                {item.message}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="action-buttons">
                                                <button
                                                    onClick={() => handleToggleVisibility(item.id, item.is_visible)}
                                                    className="action-btn edit"
                                                    title={item.is_visible ? "Hide Feedback" : "Show Feedback"}
                                                    style={{ backgroundColor: item.is_visible ? '#10b981' : '#6b7280', color: 'white', marginRight: '5px' }}
                                                >
                                                    {item.is_visible ? <FaEye /> : <FaEyeSlash />}
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="action-btn delete"
                                                    title="Delete Feedback"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="no-data-state">
                            <p>No feedback found {searchTerm ? 'matching your search' : ''}.</p>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
