import React from "react";
import { router } from "@inertiajs/react";
import FrontendLayout from "@/Layouts/FrontendLayout";
import "../../styles/VinPlastics.css";

export default function VinPlastics() {
  const handleReturnHome = () => {
    router.get("/");
  };

  return (
    <FrontendLayout title="Vin Plastics">
      <section className="vinplastics-construction-page">
        <div className="vinplastics-construction-container">
          {/* Animated Background Elements */}
          <div className="floating-tools">
            <div className="tool tool1">🛢️</div>
            <div className="tool tool2">🔧</div>
            <div className="tool tool3">⚙️</div>
            <div className="tool tool4">🧰</div>
            <div className="tool tool5">🪣</div>
          </div>

          <div className="vinplastics-construction-content">
            {/* Main Icon with Animation */}
            <div className="vinplastics-icon-container">
              <div className="vinplastics-main-icon">🛢️</div>
              <div className="construction-tools">
                <span className="tool-icon tool1">🔨</span>
                <span className="tool-icon tool2">🛠️</span>
                <span className="tool-icon tool3">📐</span>
              </div>
            </div>

            {/* Content */}
            <h1 className="vinplastics-construction-title">
              Crafting Quality Plastic Solutions! & This Page is Under Construction
            </h1>

            {/* Progress Section */}
            <div className="vinplastics-progress-container">
              <div className="vinplastics-progress-bar">
                <div
                  className="vinplastics-progress-fill"
                  style={{ width: '45%' }}
                >
                  <div className="progress-glow"></div>
                </div>
              </div>
              <div className="progress-stats">
                <span className="progress-percentage">45%</span>
                <span className="progress-text">Development in Progress</span>
              </div>
            </div>


            {/* Call to Action */}
            <div className="cta-section">
              <p className="cta-text">
                We're molding the future of farming tools! Check back soon for our complete range
                of high-quality plastic products designed for modern agriculture.
              </p>
              <div className="cta-buttons">
                <button className="back-btn" onClick={handleReturnHome}>
                  Return Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </FrontendLayout>
  );
}
