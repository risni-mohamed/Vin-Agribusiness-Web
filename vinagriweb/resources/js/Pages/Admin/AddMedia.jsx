import React, { useState } from 'react';
import { FiType, FiTag, FiFileText, FiUpload, FiVideo, FiFilm } from 'react-icons/fi';
import axios from 'axios';
import AdminLayout from '@/Layouts/AdminLayout';
import '../../styles/Admin/AddMedia.css';

export default function AddMedia() {
    const [title, setTitle] = useState('');
    const [mediaType, setMediaType] = useState('video');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        if (selectedFile) {
            const url = URL.createObjectURL(selectedFile);
            setPreview(url);
        } else {
            setPreview(null);
        }
    };

    const submit = async (e) => {
        e.preventDefault();
        if (!title) return alert('Title required');
        const fd = new FormData();
        fd.append('title', title);
        fd.append('media_type', mediaType);
        fd.append('description', description);
        if (file) fd.append('file', file);

        try {
            setLoading(true);
            const url = '/api/media';
            await axios.post(url, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
            alert('Media added successfully!');
            setTitle(''); setMediaType('video'); setDescription(''); setFile(null); setPreview(null);
        } catch (err) {
            console.error(err);
            alert('Upload failed');
        } finally { setLoading(false); }
    };

    return (
        <AdminLayout title="Add Media">
            <div className="add-media-container">
                <h2>Add New Media</h2>

                <form onSubmit={submit} className="media-form">
                    <div className="form-group">
                        <label>Media Title</label>
                        <div className="input-with-icon">
                            <FiType className="field-icon" />
                            <input
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                placeholder="Enter title"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Media Type</label>
                        <div className="input-with-icon">
                            <FiTag className="field-icon" />
                            <select value={mediaType} onChange={e => setMediaType(e.target.value)}>
                                <option value="video">Video</option>
                                <option value="news">News</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <div className="input-with-icon">
                            <FiFileText className="field-icon" style={{ top: '1rem' }} />
                            <textarea
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                placeholder="Enter description..."
                                style={{ paddingLeft: '2.75rem' }}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Media File</label>
                        <div className="file-upload-section">
                            {!preview && (mediaType === 'video' ? <FiVideo className="upload-icon" /> : <FiFilm className="upload-icon" />)}

                            {preview && (
                                <div className="media-preview-container">
                                    {file?.type.startsWith('video/') ? (
                                        <video src={preview} controls className="media-preview-video" />
                                    ) : (
                                        <img src={preview} alt="Preview" className="media-preview-img" />
                                    )}
                                </div>
                            )}

                            <p>{file ? 'File selected' : 'Click or drop to upload video/image'}</p>
                            <input
                                type="file"
                                accept="image/*,video/*"
                                onChange={handleFileChange}
                            />
                            {file && <div className="selected-file-name">{file.name}</div>}
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="submit-btn">
                        {loading ? 'Processing...' : 'Upload Media Content'}
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
}
