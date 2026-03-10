import React from "react";
import { Link } from "@inertiajs/react";
import "../../styles/Footer.css";
import {
  FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube,
  FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaArrowRight
} from "react-icons/fa";

const SOCIAL_LINKS = [
  { icon: FaFacebookF, href: "https://www.facebook.com/VinAgribusinessPvtLtd", label: "Facebook" },
  { icon: FaYoutube, href: "https://www.youtube.com/channel/UCErmqbF2A453eNWfEYMj22Q", label: "YouTube" }
];

const SERVICES = [
  "Advanced Crop Consultation",
  "High-Yield Agricultural Inputs",
  "Premium Seed Supply",
  "Smart Irrigation Solutions",
  "Soil Health Analysis"
];

const QUICK_LINKS = [
  { name: "Home", path: "/" },
  { name: "Our Products", path: "/fertilizers" },
  { name: "About Us", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Media", path: "/media" }
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-container">
        <div className="footer-content">

          {/* Company Info */}
          <div className="footer-section company-info">
            <div className="logo-section">
              <Link href="/">
                <img
                  src="/assets/logo.png"
                  alt="Vin Agri Business Logo"
                  className="logo-icon"
                  loading="lazy"
                />
              </Link>
            </div>
            <p className="company-description">
              Your trusted partner for comprehensive agricultural solutions in
              Sri Lanka. Growing together towards a sustainable future through
              innovation and quality.
            </p>
            <div className="social-links">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="social-link"
                  aria-label={`Visit our ${label} page`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Services Links */}
          <div className="footer-section">
            <h4 className="section-title">Our Services</h4>
            <ul className="footer-links">
              {SERVICES.map(service => (
                <li key={service}>
                  <Link href="/fertilizers">
                    <FaArrowRight className="link-icon" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="section-title">Quick Links</h4>
            <ul className="footer-links">
              {QUICK_LINKS.map(({ name, path }) => (
                <li key={name}>
                  {path.startsWith('http') || path.startsWith('#') ? (
                    <a href={path}>
                      <FaArrowRight className="link-icon" />
                      {name}
                    </a>
                  ) : (
                    <Link href={path}>
                      <FaArrowRight className="link-icon" />
                      {name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4 className="section-title">Contact Info</h4>
            <div className="contact-item">
              <FaMapMarkerAlt className="contact-icon" aria-hidden="true" />
              <span>2nd Stage, Industrial Park,<br />Heraliyawala,<br />Kurunegala, Sri Lanka</span>
            </div>
            <div className="contact-item">
              <FaPhoneAlt className="contact-icon" aria-hidden="true" />
              <a href="tel:+94372228554">+94 37 222 8554</a>
            </div>
            <div className="contact-item">
              <FaEnvelope className="contact-icon" aria-hidden="true" />
              <a href="mailto:info@vinagribusiness.com">info@vinagribusiness.com</a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>&copy; {currentYear} VIN AGRI BUSINESS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

