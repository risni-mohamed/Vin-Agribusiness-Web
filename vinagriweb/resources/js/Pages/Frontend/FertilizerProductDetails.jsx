import React, { useEffect, useState } from "react";
import axios from "axios";
import { router } from "@inertiajs/react";
import FrontendLayout from "@/Layouts/FrontendLayout";
import "../../styles/FertilizerDetails.css";

export default function FertilizerProductDetails({ id }) {
  // If id is not passed as prop (e.g. if we are still using client-side routing logic), 
  // we might need to get it from the URL. But Inertia usually passes it.
  // For backward compatibility with the existing axios logic:
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If id is not available as prop, we can try to extract it from window.location or props
    const productId = id || window.location.pathname.split('/').pop();

    setLoading(true);
    axios
      .get(`/api/fertilizers/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setActiveImage(res.data.image1);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const navigateBack = () => {
    router.get("/fertilizer/products");
  };

  if (loading) {
    return (
      <FrontendLayout title="Loading...">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading product details...</p>
        </div>
      </FrontendLayout>
    );
  }

  if (!product) {
    return (
      <FrontendLayout title="Product Not Found">
        <div className="error-container">
          <h2>Product Not Found</h2>
          <p>Sorry, we couldn't find the product you're looking for.</p>
          <button className="back-btn" onClick={navigateBack}>
            ⬅ Back to Products
          </button>
        </div>
      </FrontendLayout>
    );
  }

  return (
    <FrontendLayout title={product.name}>
      <div className="fertilizer-details-page">

        <div className="details-header">
          <button className="back-btn" onClick={navigateBack}>
            <span className="back-arrow">←</span> Back to Products
          </button>
          <h1 className="page-title">Product Details</h1>
        </div>

        <div className="details-container">
          {/* Image Gallery */}
          <div className="image-section">
            <div className="main-image-container">
              <img
                src={`/storage/${activeImage}`}
                alt={product.name}
                className="main-image"
                onError={(e) => {
                  e.target.src = '/placeholder-image.jpg';
                }}
              />
            </div>

            <div className="thumbnail-gallery">
              {[product.image1, product.image2, product.image3]
                .filter(Boolean)
                .map((img, idx) => (
                  <div
                    key={idx}
                    className={`thumbnail-frame ${activeImage === img ? "active" : ""}`}
                    onClick={() => setActiveImage(img)}
                  >
                    <img
                      src={`/storage/${img}`}
                      alt={`Thumbnail ${idx + 1}`}
                      className="thumbnail"
                      onError={(e) => {
                        e.target.src = '/placeholder-thumbnail.jpg';
                      }}
                    />
                  </div>
                ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="product-info">
            <div className="product-header">
              <h2 className="product-name">{product.name}</h2>
              <span className="product-category-tag">{product.category}</span>
            </div>

            <div className="price-section">
              <span className="price-label">Price</span>
              <span className="product-price">Rs. {product.price}</span>
              <span className="price-unit">per {product.unit}</span>
            </div>

            <div className="quantity-section">
              <span className="quantity-label">Available Quantity</span>
              <span className="product-quantity">{product.quantity} {product.unit}</span>
            </div>

            <div className="description-section">
              <h3 className="description-title">Description</h3>
              <p className="product-description">{product.description}</p>
            </div>

            <div className="action-buttons">
              <button className="add-to-cart-btn">Add to Cart</button>
              <button className="buy-now-btn">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </FrontendLayout>
  );
}
