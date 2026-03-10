import React, { useState, useEffect } from "react";
import { ReactTyped } from "react-typed";
import "../../styles/Hero.css";

// ✅ Import video directly (this ensures Vite handles it)
import heroVideo from "../../assets/heronew.mp4";

const slides = [
  {
    title: "Growing Excellence in Agriculture",
    subtitle: "Empowering Sri Lankan Farmers",
    description:
      "VIN AGRI BUSINESS - Your trusted partner for comprehensive agricultural solutions in Sri Lanka. From crop management to harvest optimization, we cultivate success for farmers across the island.",
  },
  {
    title: "Modern Farming Solutions",
    subtitle: "Technology Meets Tradition",
    description:
      "Bringing cutting-edge agricultural technology to traditional farming practices. Our innovative solutions help maximize yield while preserving the environment.",
  },
  {
    title: "Sustainable Agriculture",
    subtitle: "For Future Generations",
    description:
      "Committed to sustainable farming practices that protect our land for future generations while ensuring profitable harvests today.",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero">
      {/* ✅ Correct video import */}
      <video src={heroVideo} autoPlay muted loop playsInline />

      {/* overlay */}
      <div className="hero-overlay"></div>

      {/* content */}
      <div className="hero-content">
        <h1 className="hero-title beautiful-typography">
          <ReactTyped
            strings={[slides[index].title]}
            typeSpeed={80}
            backSpeed={50}
            backDelay={5000}
            showCursor={true}
          />
        </h1>
        <h2 className="hero-subtitle highlight beautiful-subtitle">
          {slides[index].subtitle}
        </h2>
        <p className="hero-description beautiful-description">
          {slides[index].description}
        </p>
      </div>

      {/* wave */}
      <div className="hero-wave">
        <svg
          viewBox="0 0 1440 100"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="animatedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f5931d">
                <animate
                  attributeName="stop-color"
                  values="#f5931d;#f5931d;#f5931d"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="100%" stopColor="#03a9f4">
                <animate
                  attributeName="stop-color"
                  values="#03a9f4;#00e676;#03a9f4"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}
