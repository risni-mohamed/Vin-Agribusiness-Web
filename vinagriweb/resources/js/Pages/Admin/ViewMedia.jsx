import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "@/Layouts/AdminLayout";
import "../../styles/Admin/ViewMedia.css";

export default function ViewMedia() {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editMedia, setEditMedia] = useState(null);
    const [previewFile, setPreviewFile] = useState(null);

    const fetchData = async () => {
        try {
            const res = await axios.get("/api/media");
            setList(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.error(err);
            setList([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this media?")) return;
        try {
            await axios.delete(`/api/media/${id}`);
            setList((prev) => prev.filter((item) => item.id !== id));
        } catch (err) {
            console.error(err);
            alert("Delete failed");
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", editMedia.title || "");
        formData.append("media_type", editMedia.media_type || "video");

        // Prevent appending literal "null" string
        if (editMedia.description !== null && editMedia.description !== undefined) {
            formData.append("description", editMedia.description);
        } else {
            formData.append("description", "");
        }

        if (editMedia.newFile) formData.append("file", editMedia.newFile);

        formData.append("_method", "PUT");
        try {
            await axios.post(
                `/api/media/${editMedia.id}`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            fetchData();
            setEditMedia(null);
            setPreviewFile(null);
            alert("Media updated successfully!");
        } catch (err) {
            console.error(err);
            alert("Update failed");
        }
    };

    const handleFileChange = (file) => {
        setEditMedia({ ...editMedia, newFile: file });
        const reader = new FileReader();
        reader.onload = (e) => setPreviewFile(e.target.result);
        reader.readAsDataURL(file);
    };

    if (loading) return (
        <AdminLayout title="View Media">
            <p>Loading media...</p>
        </AdminLayout>
    );

    return (
        <AdminLayout title="View Media">
            <div className="media-container">
                <h2 className="media-heading">Media List</h2>

                <div className="table-wrapper">
                    <table className="media-table">
                        <thead>
                            <tr>
                                <th>Preview</th>
                                <th>Title</th>
                                <th>Type</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((item, index) => {
                                const fileUrl = item.file ? `/storage/${item.file}` : null;

                                return (
                                    <tr key={item.id} className={index % 2 === 0 ? "even" : "odd"}>
                                        <td>
                                            {item.file ? (
                                                item.file.match(/\.(mp4|webm|mov)$/i) ? (
                                                    <video src={fileUrl} className="preview-media" />
                                                ) : (
                                                    <img src={fileUrl} alt={item.title} className="preview-media" />
                                                )
                                            ) : (
                                                <span className="no-file">No file</span>
                                            )}
                                        </td>
                                        <td>{item.title}</td>
                                        <td>
                                            <span className={`badge ${item.media_type}`}>
                                                {item.media_type}
                                            </span>
                                        </td>
                                        <td className="description-cell">{item.description}</td>
                                        <td className="actions-cell">
                                            <button
                                                className="btn edit"
                                                onClick={() => {
                                                    setEditMedia(item);
                                                    setPreviewFile(fileUrl);
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn delete"
                                                onClick={() => handleDelete(item.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {editMedia && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <button className="modal-close" onClick={() => { setEditMedia(null); setPreviewFile(null); }}>&times;</button>
                            <h3>Edit Media</h3>
                            <form onSubmit={handleEditSubmit} className="edit-form">
                                <div className="form-group">
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        value={editMedia.title}
                                        onChange={(e) =>
                                            setEditMedia({ ...editMedia, title: e.target.value })
                                        }
                                        placeholder="Title"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Media Type</label>
                                    <select
                                        value={editMedia.media_type}
                                        onChange={(e) =>
                                            setEditMedia({ ...editMedia, media_type: e.target.value })
                                        }
                                        required
                                    >
                                        <option value="">Select Type</option>
                                        <option value="video">Video</option>
                                        <option value="news">News</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea
                                        value={editMedia.description}
                                        onChange={(e) =>
                                            setEditMedia({ ...editMedia, description: e.target.value })
                                        }
                                        placeholder="Description"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Replace File</label>
                                    <input
                                        type="file"
                                        onChange={(e) => handleFileChange(e.target.files[0])}
                                    />
                                </div>

                                {previewFile &&
                                    (String(previewFile).match(/\.(mp4|webm|mov)$/i) ? (
                                        <video src={previewFile} className="preview-edit" controls />
                                    ) : (
                                        <img src={previewFile} alt="preview" className="preview-edit" />
                                    ))}

                                <div className="modal-actions">
                                    <button type="submit" className="btn save">Update</button>
                                    <button
                                        type="button"
                                        className="btn cancel"
                                        onClick={() => {
                                            setEditMedia(null);
                                            setPreviewFile(null);
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
