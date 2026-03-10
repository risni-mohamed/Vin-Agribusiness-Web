import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "@/Layouts/AdminLayout";
import "../../styles/Admin/ViewFertilizer.css";

export default function ViewFertilizers() {
    const [products, setProducts] = useState([]);
    const [editProduct, setEditProduct] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        axios
            .get("/api/fertilizers")
            .then((res) => setProducts(res.data))
            .catch((err) => console.error(err));
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        try {
            await axios.delete(`/api/fertilizers/${id}`);
            fetchProducts();
        } catch (err) {
            alert("Error deleting product");
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const form = new FormData();
            Object.keys(editProduct).forEach((key) => {
                // Ignore nulls, created_at, updated_at
                if (editProduct[key] !== null && key !== 'created_at' && key !== 'updated_at') {
                    // Only append image keys if they are actual File objects (not strings)
                    if (key.startsWith('image') && typeof editProduct[key] === 'string') {
                        return; // skip existing string paths
                    }
                    form.append(key, editProduct[key]);
                }
            });

            form.append("_method", "PUT");
            await axios.post(
                `/api/fertilizers/${editProduct.id}`,
                form,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            setEditProduct(null);
            fetchProducts();
            alert("Product updated successfully!");
        } catch (err) {
            alert("Error updating product");
        }
    };

    return (
        <AdminLayout title="View Fertilizers">
            <div className="fertilizer-container">
                <h2 className="fertilizer-heading">Manage Fertilizers</h2>

                <div className="fertilizer-table-wrapper">
                    <table className="fertilizer-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Category</th>
                                <th>Price (Rs.)</th>
                                <th>Quantity</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((p, i) => (
                                <tr key={p.id} className={i % 2 === 0 ? "even" : "odd"}>
                                    <td>
                                        {p.image1 ? (
                                            <img
                                                src={`/storage/${p.image1}`}
                                                alt={p.name}
                                                className="fertilizer-preview"
                                            />
                                        ) : (
                                            <span className="no-file">No Image</span>
                                        )}
                                    </td>
                                    <td>{p.name}</td>
                                    <td className="description-cell">{p.description}</td>
                                    <td>
                                        <span
                                            className={`badge ${p.category === "Straight Fertilizers"
                                                ? "straight"
                                                : p.category === "Granular Fertilizers"
                                                    ? "granular"
                                                    : p.category === "Liquid Fertilizers"
                                                        ? "liquid"
                                                        : p.category === "Mixtures"
                                                            ? "mixtures"
                                                            : "growth"
                                                }`}
                                        >
                                            {p.category}
                                        </span>
                                    </td>
                                    <td>Rs. {p.price}</td>
                                    <td>
                                        {p.quantity} {p.unit}
                                    </td>
                                    <td className="actions-cell">
                                        <button className="btn edit" onClick={() => setEditProduct(p)}>
                                            Edit
                                        </button>
                                        <button
                                            className="btn delete"
                                            onClick={() => handleDelete(p.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {editProduct && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <button
                                className="modal-close"
                                onClick={() => setEditProduct(null)}
                            >
                                &times;
                            </button>

                            <h2>Edit Fertilizer</h2>
                            <form onSubmit={handleEditSubmit} className="edit-form">
                                <div className="form-group">
                                    <label>Fertilizer Name</label>
                                    <input
                                        type="text"
                                        value={editProduct.name}
                                        onChange={(e) =>
                                            setEditProduct({ ...editProduct, name: e.target.value })
                                        }
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea
                                        value={editProduct.description}
                                        onChange={(e) =>
                                            setEditProduct({
                                                ...editProduct,
                                                description: e.target.value,
                                            })
                                        }
                                        rows="3"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Category</label>
                                    <select
                                        value={editProduct.category}
                                        onChange={(e) =>
                                            setEditProduct({ ...editProduct, category: e.target.value })
                                        }
                                        required
                                    >
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

                                <div className="form-group">
                                    <label>Price</label>
                                    <input
                                        type="number"
                                        value={editProduct.price}
                                        onChange={(e) =>
                                            setEditProduct({ ...editProduct, price: e.target.value })
                                        }
                                        required
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Quantity</label>
                                        <input
                                            type="number"
                                            value={editProduct.quantity}
                                            onChange={(e) =>
                                                setEditProduct({ ...editProduct, quantity: e.target.value })
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Unit</label>
                                        <select
                                            value={editProduct.unit}
                                            onChange={(e) =>
                                                setEditProduct({ ...editProduct, unit: e.target.value })
                                            }
                                        >
                                            <option value="ml">ml</option>
                                            <option value="l">l</option>
                                            <option value="g">g</option>
                                            <option value="kg">kg</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Replace Images</label>
                                    <input
                                        type="file"
                                        name="image1"
                                        onChange={(e) =>
                                            setEditProduct({ ...editProduct, image1: e.target.files[0] })
                                        }
                                    />
                                </div>

                                <div className="modal-actions">
                                    <button type="submit" className="btn save">
                                        Save Changes
                                    </button>
                                    <button
                                        type="button"
                                        className="btn cancel"
                                        onClick={() => setEditProduct(null)}
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
