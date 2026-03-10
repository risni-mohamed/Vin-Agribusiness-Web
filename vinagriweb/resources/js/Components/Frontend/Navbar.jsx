import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import "../../styles/Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { url } = usePage();

  const isActiveLink = (path) => url === path || url.startsWith(path + '/');

  return (
    <header className="navbar-header">
      {/* Logo */}
      <div className="navbar-logo">
        <Link href="/">
          <img src="/assets/logo.png" alt="Company Logo" />
        </Link>
      </div>

      {/* Hamburger for mobile */}
      <div
        className={`hamburger ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Navigation Links */}
      <nav className={`navbar-nav ${isOpen ? "open" : ""}`}>
        <ul className="navbar-links">
          <li><Link href="/" className={`nav-link ${url === "/" ? "active" : ""}`}>Home</Link></li>
          <li><Link href="/fertilizer" className={`nav-link ${isActiveLink("/fertilizer") ? "active" : ""}`}>Our Products</Link></li>
          <li><Link href="/about" className={`nav-link ${isActiveLink("/about") ? "active" : ""}`}>About Us</Link></li>
          <li><Link href="/contact" className={`nav-link ${isActiveLink("/contact") ? "active" : ""}`}>Contact</Link></li>
          <li><Link href="/media" className={`nav-link ${isActiveLink("/media") ? "active" : ""}`}>Media</Link></li>
        </ul>
      </nav>
    </header>
  );
}

