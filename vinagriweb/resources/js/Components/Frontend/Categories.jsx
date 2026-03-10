import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { GiFertilizerBag, GiPlantSeed, GiClothes } from "react-icons/gi";
import "../../styles/Categories.css";

export default function Categories() {
  const [showOther, setShowOther] = useState(false);

  const cats = [
    {
      title: "Fertilizers",
      path: "/fertilizers",
      description: "Premium quality fertilizers for optimal growth",
      image: "/images/fertilizer.jpg",
    },
    {
      title: "Seeds",
      path: "/seeds",
      description: "High-yield seeds for better harvest",
      image: "/images/seeds.jpg",
    },
    {
      title: "Vin Plastics",
      path: "/vin-plastics",
      description: "Eco-friendly plastic solutions",
      image: "/images/plastics.jpg",
    },
    {
      title: "Vin Apparel",
      path: "/vin-apparel",
      description: "Quality agricultural workwear",
      image: "/images/apparel.jpg",
    },
  ];

  return (
    <section className="categories-section">
      <h2 className="categories-title">Our Business Products</h2>
      <p className="categories-subtitle">
        Explore our diverse range of agricultural businesses
      </p>

      <div className="categories-container">
        {/* Large Fertilizer Category */}
        <Link
          href={cats[0].path}
          className="category-large fancy-glow"
          style={{ backgroundImage: `url(${cats[0].image})` }}
        >
          <div className="category-overlay">
            <div className="overlay-icon">{cats[0].businessIcon}</div>
            <h3>{cats[0].title}</h3>
            <p>{cats[0].description}</p>
          </div>
        </Link>

        {/* Floating Circular Menu */}
        <div className="floating-menu">
          <div
            className={`circle-main ${showOther ? "active" : ""}`}
            onClick={() => setShowOther(!showOther)}
          >
            {showOther ? "Close" : "Other"} <br /> Categories
          </div>

          <div className={`floating-items ${showOther ? "show" : ""}`}>
            {cats.slice(1).map((cat, index) => (
              <Link
                key={index}
                href={cat.path}
                className={`floating-item item-${index + 1}`}
                style={{ backgroundImage: `url(${cat.image})` }}
              >
                <div className="floating-overlay">
                  <div className="floating-icon">{cat.businessIcon}</div>
                  <h4>{cat.title}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
