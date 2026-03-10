import React, { useEffect, useState } from "react";
import axios from "axios";
import { router } from "@inertiajs/react";
import {
  FaSeedling, FaFlask, FaTint, FaLeaf, FaVial, FaAppleAlt,
  FaTree, FaMugHot, FaPagelines, FaSearch, FaArrowRight, FaFilter
} from "react-icons/fa";

import FrontendLayout from "@/Layouts/FrontendLayout";
import "../../styles/FertilizerProducts.css";

export default function FertilizerProducts() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openCategory, setOpenCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/fertilizers")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const categories = [
    { name: "Straight Fertilizers", icon: <FaSeedling />, color: "#16a34a" },
    { name: "Paddy Fertilizers", icon: <FaLeaf />, color: "#84cc16" },
    { name: "Vegetable Fertilizers", icon: <FaSeedling />, color: "#10b981" },
    { name: "Fruit Fertilizers", icon: <FaAppleAlt />, color: "#f97316" },
    { name: "Coconut Fertilizers", icon: <FaTree />, color: "#8b5cf6" },
    { name: "Tea/Rubber Fertilizers", icon: <FaMugHot />, color: "#14b8a6" },
    { name: "Granular Fertilizers", icon: <FaFlask />, color: "#3b82f6" },
    { name: "Liquid Fertilizers", icon: <FaTint />, color: "#6366f1" },
    { name: "Plant Growth Regulators", icon: <FaVial />, color: "#ef4444" },
    { name: "Other Crops", icon: <FaPagelines />, color: "#6b7280" },
  ];

  let displayedProducts = products;
  if (selectedCategory !== "All") {
    displayedProducts = displayedProducts.filter((p) => p.category === selectedCategory);
  }
  if (searchQuery.trim() !== "") {
    displayedProducts = displayedProducts.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const toggleDropdown = (index) => {
    setOpenCategory(openCategory === index ? null : index);
  };

  const getCategoryColor = (categoryName) => {
    const category = categories.find(cat => cat.name === categoryName);
    return category ? category.color : "#6b7280";
  };

  const navigateToProduct = (id) => {
    router.get(`/fertilizer/${id}`);
  };

  return (
    <FrontendLayout title="Fertilizer Products">
      <div className="fertilizer-products-page">

        {/* Search Bar */}
        <div className="search-section">
          <div className="search-container">
            <div className="search-bar-wrapper">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search fertilizers by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-bar"
              />
            </div>
            <div className="filter-indicator">
              <FaFilter className="filter-icon" />
              <span>Filters Applied: {selectedCategory !== "All" ? 1 : 0}</span>
            </div>
          </div>
        </div>

        <div className="page-layout">
          {/* Sidebar */}
          <aside className="sidebar">
            <div className="sidebar-header">
              <h3>Categories</h3>
              <span className="product-count">{products.length} products</span>
            </div>

            <ul className="category-list">
              <li>
                <button
                  className={`category-btn ${selectedCategory === "All" ? "active" : ""}`}
                  onClick={() => {
                    setSelectedCategory("All");
                    setOpenCategory(null);
                  }}
                >
                  <span className="category-icon all-icon">🌱</span>
                  <span className="category-text">All Fertilizers</span>
                  <span className="product-count-badge">{products.length}</span>
                </button>
              </li>
              {categories.map((cat, i) => {
                const catProducts = products.filter((p) => p.category === cat.name);
                return (
                  <li key={i} className="category-item">
                    <button
                      className={`category-btn ${selectedCategory === cat.name ? "active" : ""}`}
                      onClick={() => {
                        setSelectedCategory(cat.name);
                        toggleDropdown(i);
                      }}
                      style={{ borderLeftColor: cat.color }}
                    >
                      <span className="category-icon" style={{ color: cat.color }}>{cat.icon}</span>
                      <span className="category-text">{cat.name}</span>
                      <span className="product-count-badge">{catProducts.length}</span>
                      <FaArrowRight className={`dropdown-arrow ${openCategory === i ? "open" : ""}`} />
                    </button>

                    {/* Dropdown for product names */}
                    {openCategory === i && catProducts.length > 0 && (
                      <ul className="dropdown-list">
                        {catProducts.map((prod) => (
                          <li
                            key={prod.id}
                            className="dropdown-item"
                            onClick={() => navigateToProduct(prod.id)}
                          >
                            <span className="product-dot" style={{ backgroundColor: cat.color }}></span>
                            {prod.name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </aside>

          {/* Products Grid */}
          <main className="products-main">
            <div className="products-header">
              <div>
                <h2 className="section-title">
                  {selectedCategory === "All" ? "All Fertilizers" : selectedCategory}
                </h2>
                <p className="results-count">{displayedProducts.length} products found</p>
              </div>
            </div>

            {loading ? (
              <div className="loading-products">
                <div className="loading-spinner"></div>
                <p>Loading fertilizers...</p>
              </div>
            ) : displayedProducts.length > 0 ? (
              <div className="products-grid">
                {displayedProducts.map((p) => (
                  <div key={p.id} className="product-card" onClick={() => navigateToProduct(p.id)}>
                    <div className="product-image-container">
                      {p.image1 ? (
                        <img
                          src={`/storage/${p.image1}`}
                          alt={p.name}
                          className="product-image"
                        />
                      ) : (
                        <div className="no-product-image">
                          <FaSeedling className="placeholder-icon" />
                          <span>Product image coming soon</span>
                        </div>
                      )}
                      <div className="category-tag" style={{ backgroundColor: getCategoryColor(p.category) }}>
                        {p.category}
                      </div>
                    </div>
                    <div className="product-info">
                      <h4 className="product-name">{p.name}</h4>
                      <button className="read-more-btn">
                        View Details <FaArrowRight className="btn-arrow" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-products">
                <div className="no-products-icon">🌱</div>
                <h3>No fertilizers found</h3>
                <p>Try adjusting your search or filter criteria</p>
                <button
                  className="reset-filters-btn"
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                  }}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </FrontendLayout>
  );
}
