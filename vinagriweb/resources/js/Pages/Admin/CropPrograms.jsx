import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "@/Layouts/AdminLayout";
import { FiPlus, FiEdit2, FiTrash2, FiUpload, FiX, FiCheck } from "react-icons/fi";
import { GiPlantSeed } from "react-icons/gi";
import "../../styles/Admin/CropPrograms.css";

export default function CropPrograms() {
    const [crops, setCrops] = useState([]);
    const [loading, setLoading] = useState(true);

    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [editingCrop, setEditingCrop] = useState(null); // null = add mode

    // Form state
    const [formData, setFormData] = useState({ name: "", sort_order: 0 });
    const [imageFile, setImageFile] = useState(null);
    const [flyerFile, setFlyerFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [flyerPreview, setFlyerPreview] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [deleteConfirmId, setDeleteConfirmId] = useState(null);

    // ── Fetch ──────────────────────────────────────────────────────────────
    const fetchCrops = async () => {
        try {
            const res = await axios.get("/api/crop-programs");
            setCrops(res.data);
        } catch (err) {
            console.error("Failed to load crop programs:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchCrops(); }, []);

    // ── Open modal ─────────────────────────────────────────────────────────
    const openAdd = () => {
        setEditingCrop(null);
        setFormData({ name: "", sort_order: crops.length });
        setImageFile(null); setFlyerFile(null);
        setImagePreview(null); setFlyerPreview(null);
        setShowModal(true);
    };

    const openEdit = (crop) => {
        setEditingCrop(crop);
        setFormData({ name: crop.name, sort_order: crop.sort_order });
        setImageFile(null); setFlyerFile(null);
        setImagePreview(crop.image || null);
        setFlyerPreview(crop.flyer || null);
        setShowModal(true);
    };

    const closeModal = () => { setShowModal(false); setEditingCrop(null); };

    // ── File pick ──────────────────────────────────────────────────────────
    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        if (type === "image") { setImageFile(file); setImagePreview(url); }
        else                  { setFlyerFile(file);  setFlyerPreview(url);  }
    };

    // ── Submit ─────────────────────────────────────────────────────────────
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const form = new FormData();
            form.append("name", formData.name);
            form.append("sort_order", formData.sort_order);
            if (imageFile) form.append("image", imageFile);
            if (flyerFile)  form.append("flyer",  flyerFile);

            if (editingCrop) {
                form.append("_method", "PUT");
                await axios.post(`/api/crop-programs/${editingCrop.id}`, form, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                await axios.post("/api/crop-programs", form, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }

            await fetchCrops();
            closeModal();
        } catch (err) {
            alert("Error: " + (err.response?.data?.message || err.message));
        } finally {
            setSubmitting(false);
        }
    };

    // ── Delete ─────────────────────────────────────────────────────────────
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/crop-programs/${id}`);
            setCrops(crops.filter(c => c.id !== id));
            setDeleteConfirmId(null);
        } catch (err) {
            alert("Delete failed: " + err.message);
        }
    };

    // ── Render ─────────────────────────────────────────────────────────────
    return (
        <AdminLayout title="Crop Programs">
            <div className="cp-container">
                {/* Header */}
                <div className="cp-header">
                    <div className="cp-header-left">
                        <GiPlantSeed className="cp-header-icon" />
                        <div>
                            <h1>Crop Programs</h1>
                            <p>Manage the crop program entries shown on the Fertilizer page.</p>
                        </div>
                    </div>
                    <button className="cp-add-btn" onClick={openAdd}>
                        <FiPlus /> Add Crop
                    </button>
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="cp-loading">Loading…</div>
                ) : crops.length === 0 ? (
                    <div className="cp-empty">
                        <GiPlantSeed size={48} className="cp-empty-icon" />
                        <p>No crop programs yet. Click <strong>Add Crop</strong> to get started.</p>
                    </div>
                ) : (
                    <div className="cp-grid">
                        {crops.map(crop => (
                            <div key={crop.id} className="cp-card">
                                {/* Thumbnail */}
                                <div className="cp-card-thumb">
                                    {crop.image
                                        ? <img src={crop.image} alt={crop.name} />
                                        : <GiPlantSeed size={40} className="cp-thumb-placeholder" />
                                    }
                                </div>

                                {/* Info */}
                                <div className="cp-card-body">
                                    <h3>{crop.name}</h3>
                                    <p className="cp-card-meta">Order: {crop.sort_order}</p>
                                    {crop.flyer && (
                                        <a href={crop.flyer} target="_blank" rel="noreferrer" className="cp-flyer-link">
                                            View Flyer
                                        </a>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="cp-card-actions">
                                    <button className="cp-btn-edit" onClick={() => openEdit(crop)}>
                                        <FiEdit2 />
                                    </button>
                                    {deleteConfirmId === crop.id ? (
                                        <span className="cp-confirm-row">
                                            <button className="cp-btn-confirm" onClick={() => handleDelete(crop.id)}><FiCheck /></button>
                                            <button className="cp-btn-cancel"  onClick={() => setDeleteConfirmId(null)}><FiX /></button>
                                        </span>
                                    ) : (
                                        <button className="cp-btn-delete" onClick={() => setDeleteConfirmId(crop.id)}>
                                            <FiTrash2 />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ── Modal ── */}
            {showModal && (
                <div className="cp-modal-overlay" onClick={closeModal}>
                    <div className="cp-modal" onClick={e => e.stopPropagation()}>
                        <div className="cp-modal-header">
                            <h2>{editingCrop ? "Edit Crop" : "Add Crop"}</h2>
                            <button className="cp-modal-close" onClick={closeModal}><FiX /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="cp-form">
                            <div className="cp-form-group">
                                <label>Crop Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="e.g. Banana, Papaya…"
                                    required
                                />
                            </div>

                            <div className="cp-form-group">
                                <label>Sort Order</label>
                                <input
                                    type="number"
                                    value={formData.sort_order}
                                    onChange={e => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                                    min="0"
                                />
                            </div>

                            {/* Image upload */}
                            <div className="cp-form-group">
                                <label>Crop Image</label>
                                <label className="cp-upload-box" htmlFor="cp-image">
                                    {imagePreview
                                        ? <img src={imagePreview} alt="preview" className="cp-upload-preview" />
                                        : <><FiUpload size={24} /><span>Click to upload image</span></>
                                    }
                                </label>
                                <input id="cp-image" type="file" accept="image/*" hidden onChange={e => handleFileChange(e, "image")} />
                            </div>

                            {/* Flyer upload */}
                            <div className="cp-form-group">
                                <label>Flyer (image or PDF)</label>
                                <label className="cp-upload-box" htmlFor="cp-flyer">
                                    {flyerPreview && flyerPreview.match(/\.(jpg|jpeg|png|webp)(\?|$)/i)
                                        ? <img src={flyerPreview} alt="flyer preview" className="cp-upload-preview" />
                                        : flyerPreview
                                            ? <span className="cp-flyer-set">✔ Flyer set — click to replace</span>
                                            : <><FiUpload size={24} /><span>Click to upload flyer</span></>
                                    }
                                </label>
                                <input id="cp-flyer" type="file" accept="image/*,.pdf" hidden onChange={e => handleFileChange(e, "flyer")} />
                            </div>

                            <button type="submit" className="cp-submit-btn" disabled={submitting}>
                                {submitting ? "Saving…" : (editingCrop ? "Save Changes" : "Add Crop")}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
