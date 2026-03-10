import React, { useState, useEffect } from "react";
import "../styles/Loader.css";

export default function Loader({ loading }) {
  const [visible, setVisible] = useState(loading);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (loading) {
      setVisible(true);
      // Delay content appearance for better UX
      const contentTimer = setTimeout(() => setShowContent(true), 300);
      return () => clearTimeout(contentTimer);
    } else {
      setShowContent(false);
      const timer = setTimeout(() => setVisible(false), 800); // Longer fade out
      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (!visible) return null;

  return (
    <div className={`loader-overlay ${loading ? "fade-in" : "fade-out"}`}>
      <div className={`loader-content ${showContent ? "content-visible" : ""}`}>
        <div className="loader-spinner"></div>
        <div className="loader-text">
          <h3 className="welcome-text">Welcome to Vin Agri Business</h3>
        </div>
      </div>
    </div>
  );
}