import React, { useEffect, useRef, useState } from "react";
import { Link } from "@inertiajs/react";
import ceebaLogo from "../../assets/ceebaLogo.png";
import fertLogo from "../../assets/fertlogo.png";
import drLeafLogo from "../../assets/logoDrLeaf.png";
import ferthero from "../../assets/ferthero.mp4";
import "../../styles/Fertilizer.css";

export default function FertilizerHero() {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  const slides = [
    {
      title: "Vin & Ceeba Fertilizers — Powering a Prosperous Harvest",
      text: "Bringing together two trusted brands to nourish your soil and ensure a sustainable agricultural future.",
    },
    {
      title: "Stronger Crops, Healthier Fields",
      text: "From paddy to plantations, our fertilizers are designed to support every Sri Lankan farmer’s growth.",
    },
    {
      title: "Growing Together With Innovation",
      text: "Blending technology and tradition to achieve maximum yield and quality for every harvest.",
    },
  ];

  useEffect(() => {
    intervalRef.current = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      6000
    );
    return () => clearInterval(intervalRef.current);
  }, [slides.length]);

  return (
    <section className="fert-hero-main">
      {/* Background Video */}
      <video
        className="fert-hero-video"
        autoPlay
        muted
        loop
        playsInline
        key={ferthero}
      >
        <source src={ferthero} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Top Curve with Logos */}
      <div className="fert-hero-top-curve">
        <div className="logo-container">
          <img src={fertLogo} alt="Vin Fertilizer" className="hero-logo" />
          <img src={ceebaLogo} alt="Ceeba" className="hero-logo ceeba-logo" />
          <img src={drLeafLogo} alt="Dr. Leaf" className="hero-logo drleaf-logo" />
        </div>
      </div>

      {/* Content */}
      <div className="fert-hero-content left-align">
        <h1 className="animated-text">{slides[index].title}</h1>
        <p className="fade-text">{slides[index].text}</p>

        <div className="hero-buttons right-align">
          <Link href="/fertilizers/products" className="btn-primary">
            Explore Our Fertilizers
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
          <a
            href="https://forms.gle/8YPj5yXsfS1dxN7L7"
            className="btn-secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dealership Agreement Form
          </a>
        </div>
      </div>
    </section>
  );
}

