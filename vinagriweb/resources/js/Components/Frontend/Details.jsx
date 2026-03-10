import React, { useEffect, useRef } from "react";
import {
  FaLeaf,
  FaTractor,
  FaSeedling,
  FaTint,
  FaFlask,
  FaChartLine
} from "react-icons/fa";
import "../../styles/Details.css";

export default function Services() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  const services = [
    {
      title: "Crop Consultation",
      description: "Expert advice on crop selection, planting techniques, and seasonal farming strategies tailored for Sri Lankan climate.",
      icon: <FaLeaf className="service-icon" />
    },
    {
      title: "Farm Equipment",
      description: "Modern agricultural machinery rental and maintenance services to enhance your farming efficiency.",
      icon: <FaTractor className="service-icon" />
    },
    {
      title: "Seed Supply",
      description: "High-quality seeds and seedlings sourced from trusted suppliers, perfect for Sri Lankan soil conditions.",
      icon: <FaSeedling className="service-icon" />
    },
    {
      title: "Irrigation Solutions",
      description: "Water management systems and irrigation planning to optimize crop yield and water conservation.",
      icon: <FaTint className="service-icon" />
    },
    {
      title: "Soil Testing",
      description: "Comprehensive soil analysis and fertilizer recommendations to improve soil health and productivity.",
      icon: <FaFlask className="service-icon" />
    },
    {
      title: "Market Guidance",
      description: "Market analysis and crop pricing guidance to help farmers make informed business decisions.",
      icon: <FaChartLine className="service-icon" />
    },
  ];

  // Scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    cardRefs.current.forEach(card => card && observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="services-section" ref={sectionRef}>
      <div className="services-container">
        <div className="services-header">
          <h2>Our Agricultural Services</h2>
          <p>Comprehensive solutions for modern farming in Sri Lanka</p>
          <div className="services-divider"></div>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-box"
              ref={el => cardRefs.current[index] = el}
            >
              <div className="service-icon-wrap">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="service-underline"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
