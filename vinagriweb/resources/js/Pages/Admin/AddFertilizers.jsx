import React, { useState } from "react";
import axios from "axios";
import AdminLayout from "@/Layouts/AdminLayout";
import { FiPackage, FiType, FiTag, FiDollarSign, FiLayers, FiImage, FiUpload } from "react-icons/fi";
import "../../styles/Admin/AddProduct.css";

export default function AddProduct() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "Straight Fertilizers",
        price: "",
        quantity: "",
        unit: "kg",
    });

    const [images, setImages] = useState({ image1: null, image2: null, image3: null });
    const [previews, setPreviews] = useState({ image1: null, image2: null, image3: null });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const name = e.target.name;
        setImages({ ...images, [name]: file });

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviews({ ...previews, [name]: e.target.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const form = new FormData();
            Object.keys(formData).forEach((key) => form.append(key, formData[key]));
            Object.keys(images).forEach((key) => {
                if (images[key]) form.append(key, images[key]);
            });

            await axios.post("/api/fertilizers", form, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert("Product added successfully!");

            setFormData({
                name: "",
                description: "",
                category: "Straight Fertilizers",
                price: "",
                quantity: "",
                unit: "kg",
            });
            setImages({ image1: null, image2: null, image3: null });
            setPreviews({ image1: null, image2: null, image3: null });
        } catch (err) {
            alert("Error: " + err.message);
        }
    };

    return (
        <AdminLayout title="Add Fertilizer">
            <div className="add-product-container">
                <h1>Add Fertilizer Product</h1>

                <form onSubmit={handleSubmit} className="add-product-form">
                    <div className="form-group">
                        <label>Product Name</label>
                        <div className="input-with-icon">
                            <FiPackage className="field-icon" />
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter Fertilizer Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <div className="input-with-icon">
                            <FiType className="field-icon" style={{ top: '1rem' }} />
                            <textarea
                                name="description"
                                placeholder="Enter Fertilizer Description..."
                                value={formData.description}
                                onChange={handleChange}
                                style={{ paddingLeft: '2.75rem' }}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Category</label>
                        <div className="input-with-icon">
                            <FiTag className="field-icon" />
                            <select name="category" value={formData.category} onChange={handleChange}>
                                <option>Straight Fertilizers</option>
                                <option>Paddy Fertilizers</option>
                                <option>Vegetable Fertilizers</option>
                                <option>Fruit Fertilizers</option>
                                <option>Coconut Fertilizers</option>
                                <option>Tea/Rubber Fertilizers</option>
                                <option>Granular Fertilizers</option>
                                <option>Liquid Fertilizers</option>
                                <option>Plant Growth Regulators</option>
                                <option>Other Crops</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Price (Rs.)</label>
                        <div className="input-with-icon">
                            <input
                                type="number"
                                name="price"
                                placeholder="Rs. 0.00"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Quantity & Unit</label>
                        <div className="quantity-row">
                            <div className="input-with-icon">
                                <FiLayers className="field-icon" />
                                <input
                                    type="number"
                                    name="quantity"
                                    placeholder="Qty"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <select name="unit" value={formData.unit} onChange={handleChange}>
                                <option value="ml">ml</option>
                                <option value="l">l</option>
                                <option value="g">g</option>
                                <option value="kg">kg</option>
                            </select>
                        </div>
                    </div>

                    <div className="image-upload-section">
                        <label><FiImage style={{ verticalAlign: 'middle', marginRight: '8px' }} /> Product Images</label>
                        <div className="image-grid">
                            {[1, 2, 3].map(num => (
                                <div key={num} className="file-input-group">
                                    <input
                                        type="file"
                                        name={`image${num}`}
                                        id={`image${num}`}
                                        onChange={handleImageChange}
                                        hidden
                                    />
                                    <label htmlFor={`image${num}`} className="file-label" style={{
                                        cursor: 'pointer',
                                        height: '140px',
                                        borderRadius: '16px',
                                        border: '2px dashed #d1d5db',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        overflow: 'hidden',
                                        transition: 'all 0.3s ease',
                                        background: '#fff',
                                        position: 'relative'
                                    }}>
                                        {previews[`image${num}`] ? (
                                            <div className="preview-wrapper" style={{ width: '100%', height: '100%' }}>
                                                <img
                                                    src={previews[`image${num}`]}
                                                    alt={`Preview ${num}`}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                                <div className="preview-overlay">
                                                    <FiUpload color="white" />
                                                    <span>Change</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <FiUpload color="#9ca3af" size={24} />
                                                <span style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: '8px' }}>Select Image</span>
                                            </>
                                        )}
                                    </label>
                                    <span style={{ fontSize: '0.75rem', fontWeight: '500', textAlign: 'center', color: '#6b7280', marginTop: '8px' }}>
                                        Image Slot {num}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button type="submit" className="submit-btn">Add Product</button>
                </form>
            </div>
        </AdminLayout>
    );
}
