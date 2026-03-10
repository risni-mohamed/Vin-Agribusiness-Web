// src/components/FertilizerWelcome.jsx
import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import "../../styles/FertilizerWelcome.css";

// ✅ Import all images and flyers properly
import welcomeImg from "../../assets/root1.jpg";
import peraImg from "../../assets/pera.jpg";
import peraFlyer from "../../assets/pera-flyer.jpg";
import bananaImg from "../../assets/banana.png";
import bananaFlyer from "../../assets/banana-flyer.jpg";
import papayaImg from "../../assets/papaya.jpg";
import papayaFlyer from "../../assets/papaya-flyer.jpg";
import chilliImg from "../../assets/chilli.jpg";
import chilliFlyer from "../../assets/chilli-flyer.jpg";
import fchilliImg from "../../assets/fchilli.jpeg";
import fchilliFlyer from "../../assets/fchilli-flyer.jpg";
import gourdImg from "../../assets/gourd.jpeg";
import gourdFlyer from "../../assets/gourd-flyer.jpg";

// React Icons
import { FaLeaf, FaAward, FaDownload } from "react-icons/fa";
import { GiFarmTractor } from "react-icons/gi";
import { MdOutlineTrendingUp } from "react-icons/md";

export default function FertilizerWelcome() {
  const [selectedCrop, setSelectedCrop] = useState(null);

  const handleDownload = async (url, name) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${name}-Flyer.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download failed:", err);
      window.open(url, "_blank");
    }
  };

  // ✅ Use imported variables
  const crops = [
    { name: "පේර", img: peraImg, flyer: peraFlyer },
    { name: "කෙසෙල්", img: bananaImg, flyer: bananaFlyer },
    { name: "පැපොල්", img: papayaImg, flyer: papayaFlyer },
    { name: "මිරිස්", img: chilliImg, flyer: chilliFlyer },
    { name: "මාළු මිරිස්", img: fchilliImg, flyer: fchilliFlyer },
    { name: "මැහි බෝග", img: gourdImg, flyer: gourdFlyer },
  ];

  return (
    <section className="vinfert-welcome" aria-labelledby="vinfert-heading">
      {/* Decorative Background Elements */}
      <div className="vinfert-bg-elements">
        <div className="vinfert-circle vinfert-circle-1"></div>
        <div className="vinfert-circle vinfert-circle-2"></div>
        <div className="vinfert-bg-gradient"></div>
      </div>

      <div className="vinfert-container">
        {/* Left side - text */}
        <div className="vinfert-text">
          <h1 id="vinfert-heading" className="fade-in-up delay-1">
            <GiFarmTractor className="vinfert-heading-icon" />
            Welcome to <span className="highlight">Vin Fertilizer</span>
          </h1>

          <p className="vinfert-lead-text fade-in-up delay-2">
            Empowering farmers with{" "}
            <strong>innovative fertilizer solutions</strong> tailored to local
            soils and climate conditions.
          </p>

          {/* Feature cards */}
          <div className="vinfert-feature-cards fade-in-up delay-3">
            <div className="vinfert-feature-card">
              <div className="vinfert-feature-icon">
                <MdOutlineTrendingUp />
              </div>
              <h3>Boost Yield</h3>
              <p>Increase crop productivity by up to 40%</p>
            </div>

            <div className="vinfert-feature-card">
              <div className="vinfert-feature-icon">
                <FaLeaf />
              </div>
              <h3>Eco Safe</h3>
              <p>Environmentally conscious formulations</p>
            </div>

            <div className="vinfert-feature-card">
              <div className="vinfert-feature-icon">
                <FaAward />
              </div>
              <h3>Premium Quality</h3>
              <p>Certified and tested for excellence</p>
            </div>
          </div>

          {/* Stats */}
          <div className="vinfert-stats fade-in-up delay-4">
            <div className="vinfert-stat">
              <span className="vinfert-stat-number">50K+</span>
              <span className="vinfert-stat-label">Farmers Trust</span>
            </div>
            <div className="vinfert-stat">
              <span className="vinfert-stat-number">16+</span>
              <span className="vinfert-stat-label">Years Experience</span>
            </div>
            <div className="vinfert-stat">
              <span className="vinfert-stat-number">25+</span>
              <span className="vinfert-stat-label">Products</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="vinfert-actions fade-in-up delay-5">
            <Link href="/about" className="vinfert-btn-primary">
              Our Story
            </Link>
            <Link href="/fertilizer/products" className="vinfert-btn-outline">
              View Products
            </Link>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="vinfert-image fade-in-right">
          <div className="vinfert-image-container">
            <img
              src={welcomeImg}
              alt="Vin Fertilizer Introduction"
              className="vinfert-static-img"
            />
          </div>
        </div>
      </div>

      {/* Crop Program Section */}
      <div className="vinfert-crop-section fade-in-up delay-6">
        <div className="vinfert-container">
          <h2 className="vinfert-crop-title">
            Our Crop<br /> Program
          </h2>

          <div className="vinfert-crop-grid">
            {crops.map((crop, index) => (
              <div
                key={index}
                className="vinfert-crop-item"
                onClick={() => setSelectedCrop(crop)}
              >
                <div className="vinfert-crop-circle">
                  <img src={crop.img} alt={crop.name} />
                </div>
                <p className="vinfert-crop-label">{crop.name.toUpperCase()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      {selectedCrop && (
        <div className="vinfert-modal" onClick={() => setSelectedCrop(null)}>
          <div
            className="vinfert-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="vinfert-close-btn"
              onClick={() => setSelectedCrop(null)}
            >
              ×
            </button>
            <img src={selectedCrop.flyer} alt={`${selectedCrop.name} flyer`} />
            <h3>{selectedCrop.name}</h3>
            <button
              onClick={() => handleDownload(selectedCrop.flyer, selectedCrop.name)}
              className="vinfert-download-btn"
            >
              <FaDownload className="vinfert-download-icon" /> Download Flyer
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

